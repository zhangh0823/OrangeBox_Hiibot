/**
 * Well known colors for a NeoPixel strip
 */
enum ColorSensorPixelColors1 {
    //% block=red
    Red1 = 0xFF0000,
    //% block=orange
    Orange1 = 0xFFA500,
    //% block=yellow
    Yellow1 = 0xFFFF00,
    //% block=green
    Green1 = 0x00FF00,
    //% block=blue
    Blue1 = 0x0000FF,
    //% block=indigo
    Indigo1 = 0x4b0082,
    //% block=violet
    Violet1 = 0x8a2be2,
    //% block=purple
    Purple1 = 0xFF00FF,
    //% block=white
    White1 = 0xFFFFFF,
    //% block=black
    Black1 = 0x000000
}

/**
 * Different modes for RGB or RGB+W NeoPixel strips
 */
enum NeoPixelMode1 {
    //% block="RGB (GRB format)"
    RGB1 = 0,
    //% block="RGB+W"
    RGBW1 = 1,
    //% block="RGB (RGB format)"
    RGB_RGB1 = 2
}

enum pinColor {
    //% block=S1
    pinNum0 = 0,
    //% block=S2
    pinNum1 = 1,
    //% block=S3
    pinNum2 = 2
}

enum colorList {
    //% block=Red
    red = 1,
    //% block=Green
    green = 2,
    //% block=Blue
    blue = 3
}

/**
 * Functions to operate NeoPixel strips.
 */
namespace sensor {
    export class Strip {
        buf: Buffer;
        pin: DigitalPin;
        // TODO: encode as bytes instead of 32bit
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: NeoPixelMode;
        _matrixWidth: number; // number of leds in a matrix - if any

        showColor1(rgb: ColorSensorPixelColors1) {
            this.setAllRGB(rgb);
            this.show();
        } 

        showRainbow(startHue: number = 1, endHue: number = 360) {
            if (this._length <= 0) return;

            const saturation = 100;
            const luminance = 50;
            const steps = this._length;
            const direction = HueInterpolationDirection.Clockwise;

            //hue
            const h1 = startHue;
            const h2 = endHue;
            const hDistCW = ((h2 + 360) - h1) % 360;
            const hStepCW = Math.idiv((hDistCW * 100), steps);
            const hDistCCW = ((h1 + 360) - h2) % 360;
            const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
            let hStep: number;
            if (direction === HueInterpolationDirection.Clockwise) {
                hStep = hStepCW;
            } else if (direction === HueInterpolationDirection.CounterClockwise) {
                hStep = hStepCCW;
            } else {
                hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
            }
            const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

            //sat
            const s1 = saturation;
            const s2 = saturation;
            const sDist = s2 - s1;
            const sStep = Math.idiv(sDist, steps);
            const s1_100 = s1 * 100;

            //lum
            const l1 = luminance;
            const l2 = luminance;
            const lDist = l2 - l1;
            const lStep = Math.idiv(lDist, steps);
            const l1_100 = l1 * 100

            //interpolate
            if (steps === 1) {
                this.setPixelColor(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
            } else {
                this.setPixelColor(0, hsl(startHue, saturation, luminance));
                for (let i = 1; i < steps - 1; i++) {
                    const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                    const s = Math.idiv((s1_100 + i * sStep), 100);
                    const l = Math.idiv((l1_100 + i * lStep), 100);
                    this.setPixelColor(i, hsl(h, s, l));
                }
                this.setPixelColor(steps - 1, hsl(endHue, saturation, luminance));
            }
            this.show();
        } 

        
        showBarGraph(value: number, high: number): void {
            if (high <= 0) {
                this.clear();
                this.setPixelColor(0, ColorSensorPixelColors.Yellow);
                this.show();
                return;
            }

            value = Math.abs(value);
            const n = this._length;
            const n1 = n - 1;
            let v = Math.idiv((value * n), high);
            if (v == 0) {
                this.setPixelColor(0, 0x666600);
                for (let i = 1; i < n; ++i)
                    this.setPixelColor(i, 0);
            } else {
                for (let i = 0; i < n; ++i) {
                    if (i <= v) {
                        const b = Math.idiv(i * 255, n1);
                        this.setPixelColor(i, neopixel_orange.rgb(b, 0, 255 - b));
                    }
                    else this.setPixelColor(i, 0);
                }
            }
            this.show();
        } 

        
        setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset, rgb);
        }

        
        setMatrixWidth(width: number) {
            this._matrixWidth = Math.min(this._length, width);
        }

        
        setMatrixColor(x: number, y: number, rgb: number) {
            if (this._matrixWidth <= 0) return; // not a matrix, ignore
            const cols = Math.idiv(this._length, this._matrixWidth);
            if (x < 0 || x >= this._matrixWidth || y < 0 || y >= cols) return;
            let i = x + y * this._matrixWidth;
            this.setPixelColor(i, rgb);
        }
        
        
        setPixelWhiteLED(pixeloffset: number, white: number): void {
            if (this._mode === NeoPixelMode.RGBW) {
                this.setPixelW(pixeloffset, white);
            }
        }

        
        show() {
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        
        clear(): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
        }

        
        length() {
            return this._length;
        }

        
        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }

        
        easeBrightness(): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            const br = this.brightness;
            const buf = this.buf;
            const end = this.start + this._length;
            const mid = Math.idiv(this._length, 2);
            for (let i = this.start; i < end; ++i) {
                const k = i - this.start;
                const ledoffset = i * stride;
                const br = k > mid
                    ? Math.idiv(255 * (this._length - 1 - k) * (this._length - 1 - k), (mid * mid))
                    : Math.idiv(255 * k * k, (mid * mid));
                serial.writeLine(k + ":" + br);
                const r = (buf[ledoffset + 0] * br) >> 8; buf[ledoffset + 0] = r;
                const g = (buf[ledoffset + 1] * br) >> 8; buf[ledoffset + 1] = g;
                const b = (buf[ledoffset + 2] * br) >> 8; buf[ledoffset + 2] = b;
                if (stride == 4) {
                    const w = (buf[ledoffset + 3] * br) >> 8; buf[ledoffset + 3] = w;
                }
            }
        }

        range(start: number, length: number): Strip {
            let strip = new Strip();
            strip.buf = this.buf;
            strip.pin = this.pin;
            strip.brightness = this.brightness;
            strip.start = this.start + Math.clamp(0, this._length - 1, start);
            strip._length = Math.clamp(0, this._length - (strip.start - this.start), length);
            strip._matrixWidth = 0;
            strip._mode = this._mode;
            return strip;
        }

        
        shift(offset: number = 1): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
        }

        
        rotate(offset: number = 1): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
        }

        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
            // don't yield to avoid races on initialization
        }

        power(): number {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            const end = this.start + this._length;
            let p = 0;
            for (let i = this.start; i < end; ++i) {
                const ledoffset = i * stride;
                for (let j = 0; j < stride; ++j) {
                    p += this.buf[i + j];
                }
            }
            return Math.idiv(this.length(), 2) /* 0.5mA per neopixel */
                + Math.idiv(p * 433, 10000); /* rought approximation */
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === NeoPixelMode.RGB_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }
        private setAllW(white: number) {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            let end = this.start + this._length;
            for (let i = this.start; i < end; ++i) {
                let ledoffset = i * 4;
                buf[ledoffset + 3] = white;
            }
        }
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }
        private setPixelW(pixeloffset: number, white: number): void {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            pixeloffset = (pixeloffset + this.start) * 4;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            buf[pixeloffset + 3] = white;
        }
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }

    
    export function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
        
        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;
        return packRGB(r, g, b);
    }

    export enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }

    /**
     * Read color with RGB
     * @param pinColor the pin of ColorSensor, eg: pinColor.pinNum1
     */
    //% blockId="orangebox_ColorSensor_detectRGB" block="Read colorSensor at pin |%pinColor|(RGB)"
    //% weight=90 blockGap=8
    //% group="ColorSensor"
    export function detectColorRGB(pinColor: pinColor):number {
        let strip = new Strip();
        let pinRead: AnalogPin;
        let pin: DigitalPin;
        let waitTime = 10000;
        let re: number = 0;
        if(pinColor == 0) {
            pinRead = AnalogPin.P0;
            pin = DigitalPin.P13;
        }
        else if(pinColor == 1) {
            pinRead = AnalogPin.P1;
            pin = DigitalPin.P14;
        }
        else if(pinColor == 2) {
            pinRead = AnalogPin.P2;
            pin = DigitalPin.P15;
        } 

        let stride = 3;
        strip.buf = pins.createBuffer(1 * stride);
        strip.start = 0;
        strip._length = 1;
        strip._mode = 0;
        strip._matrixWidth = 0;
        strip.setBrightness(255);
        strip.setPin(pin);

        strip.showColor1(ColorSensorPixelColors1.Black1);

        strip.showColor1(ColorSensorPixelColors1.Red1);
        control.waitMicros(waitTime);
        let r: number = pins.analogReadPin(pinRead);
        r = r * 100 / 402;
        control.waitMicros(waitTime);

        strip.showColor1(ColorSensorPixelColors1.Green1);
        control.waitMicros(waitTime);
        let g: number = pins.analogReadPin(pinRead);
        g = g * 100 / 402;
        control.waitMicros(waitTime);

        strip.showColor1(ColorSensorPixelColors1.Blue1);
        control.waitMicros(waitTime);
        let b: number = pins.analogReadPin(pinRead);
        b = b * 100 / 402;
        control.waitMicros(waitTime);

        strip.showColor1(ColorSensorPixelColors1.Black1);
        r = r << 16;
        g = g << 8;
        re = r + g + b;

        return re;
        /* if(color == 1) {
            strip.showColor1(ColorSensorPixelColors1.Black1);

            strip.showColor1(ColorSensorPixelColors1.Red1);
            control.waitMicros(waitTime);
            let r: number = pins.analogReadPin(pinRead);
            r = r * 100 / 402;
            control.waitMicros(waitTime);

            strip.showColor1(ColorSensorPixelColors1.Green1);
            control.waitMicros(waitTime);
            let g: number = pins.analogReadPin(pinRead);
            g = g * 100 / 402;
            control.waitMicros(waitTime);

            strip.showColor1(ColorSensorPixelColors1.Blue1);
            control.waitMicros(waitTime);
            let b: number = pins.analogReadPin(pinRead);
            b = b * 100 / 402;
            control.waitMicros(waitTime);

            strip.showColor1(ColorSensorPixelColors1.Black1);
            r = r << 16;
            g = g << 8;
            re = r + g + b;
        }
        else if(color == 2) {
            strip.showColor1(ColorSensorPixelColors1.Red1);
            control.waitMicros(waitTime);
            let r: number = pins.analogReadPin(pinRead);
            r = r * 17 / 40;
            control.waitMicros(waitTime);
            re = r;
        }
        else if(color == 3) {
            strip.showColor1(ColorSensorPixelColors1.Green1);
            control.waitMicros(waitTime);
            let g: number = pins.analogReadPin(pinRead);
            g = g * 17 / 40;
            control.waitMicros(waitTime);
            re = g;
        }
        else if(color == 4) {
            strip.showColor1(ColorSensorPixelColors1.Blue1);
            control.waitMicros(waitTime);
            let b: number = pins.analogReadPin(pinRead);
            b = b * 17 / 40;
            control.waitMicros(waitTime);
            re = b;
        } */
    } 

    /**
     * Read color with HSV
     * @param pinColor the pin of ColorSensor, eg: pinColor.pinNum1
     */
    //% weight=90 blockGap=8
    //% group="ColorSensor"
    //% blockId=orangebox_ColorSensor_detectH block="Read colorSensor at pin|%pinColor|(H)"
    export function detectColorH(pinColor: pinColor): number {
        let strip = new Strip();
        let pinRead: AnalogPin;
        let pin: DigitalPin;
        let waitTime = 10000;

        if(pinColor == 0) {
            pinRead = AnalogPin.P0;
            pin = DigitalPin.P13;
        }
        else if(pinColor == 1) {
            pinRead = AnalogPin.P1;
            pin = DigitalPin.P14;
        }
        else if(pinColor == 2) {
            pinRead = AnalogPin.P2;
            pin = DigitalPin.P15;
        } 

        let stride = 3;
        strip.buf = pins.createBuffer(1 * stride);
        strip.start = 0;
        strip._length = 1;
        strip._mode = 0;
        strip._matrixWidth = 0;
        strip.setBrightness(255);
        strip.setPin(pin);

        strip.showColor1(ColorSensorPixelColors1.Black1);

        strip.showColor1(ColorSensorPixelColors1.Red1);
        control.waitMicros(waitTime);
        let r: number = pins.analogReadPin(pinRead);
        r = r * 100 / 402;
        control.waitMicros(waitTime);

        strip.showColor1(ColorSensorPixelColors1.Green1);
        control.waitMicros(waitTime);
        let g: number = pins.analogReadPin(pinRead);
        g = g * 100 / 402;
        control.waitMicros(waitTime);

        strip.showColor1(ColorSensorPixelColors1.Blue1);
        control.waitMicros(waitTime);
        let b: number = pins.analogReadPin(pinRead);
        b = b * 100 / 402;
        control.waitMicros(waitTime);

        strip.showColor1(ColorSensorPixelColors1.Black1);

        let gb = g - b;
        let br = b - r;
        let rg = r - g;
        let max: number = 0;
        let min: number = 0;
        let h: number = 0;

        if(r >= g && r >= b) {
            max = r;
        }
        else if(g >= r && g >= b) {
            max = g;
        }
        else if(b >= r && b >= g) {
            max = b;
        }

        if(r <= g && r <= b) {
            min = r;
        }
        else if(g <= b && g <= r) {
            min = g;
        }
        else if(b <= r && b <= g) {
            min = b;
        }


        if(max == min) {
            h = 0;
        }
        else if(max == r && g >= b) {
            h = (gb/(max - min)) * 60;
        }
        else if(max == r && g < b) {
            h = (gb/(max - min)) * 60 + 360;
        }
        else if(max == g) {
            h = (br/(max - min)) * 60 + 120;
        }
        else if(max == b) {
            h = (rg/(max - min)) * 60 + 240;
        }
        if(h > 360) {
            h = h - 360;
        }

        return h;
    }

    /* //% weight=90 blockGap=8
    //% group="ColorSensor"
    //% blockId=orangebox_ColorSensor_read block="|%colorNum|read|%colorlist"
    export function readColor(colorNum: number, colorlist: colorList): number {
        let r: number = 0;
        if(colorlist == 1) {
            r = (colorNum & 0xFF0000) >> 16;
        }
        else if(colorlist == 2) {
            r = (colorNum & 0x00FF00) >> 8;
        }
        else if(colorlist == 3) {
            r = (colorNum & 0x0000FF);
        }

        return r;
    } */
}
