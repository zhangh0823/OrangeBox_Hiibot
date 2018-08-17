enum pinSteering {
    //% block=S1
    pinNum0 = 0,
    //% block=S2
    pinNum1 = 1,
    //% block=S3
    pinNum2 = 2,
    //% block=S4
    pinNum3 = 3
}

namespace output {
    /**
     * Steering Gear rotate
     * @param pinSteering the pin of Steering Gear, eg: pinSteering.pinNum1
     */
    //%group="SteeringGear"
    //% blockId=orangebox_SteeringGear_rotate block="Steering Gear on pin |%pinSteering|to|%value"
    export function serveWritePin(pinSteering: pinSteering, value: number) {
        let pinS: AnalogPin;
        if(pinSteering == 0) {
            pinS = AnalogPin.P0;
        }
        else if(pinSteering == 1) {
            pinS = AnalogPin.P1;
        }
        else if(pinSteering == 2) {
            pinS = AnalogPin.P2;
        }
        else if(pinSteering == 3) {
            pinS = AnalogPin.P16;
        }
        pins.servoWritePin(pinS, 0);
        pins.servoWritePin(pinS, value);
    }

    
    /* //% blockId=orangebox_Steering_rotate_setTime block="Steering Gear on pin|%pinSteering|during|%time|(s)to|%value"
    export function serveWritePinSetTime(pinSteering: pinSteering, value: number, time: number) {
        let pinS: AnalogPin;
        if(pinSteering == 0) {
            pinS = AnalogPin.P0;
        }
        else if(pinSteering == 1) {
            pinS = AnalogPin.P1;
        }
        else if(pinSteering == 2) {
            pinS = AnalogPin.P2;
        }
        else if(pinSteering == 3) {
            pinS = AnalogPin.P16;
        }
        let everySecondRotate = time * 1000000 / value;
        pins.servoWritePin(pinS, 0);
        for(let i = 0; i < value; i++) {
            pins.servoWritePin(pinS, i + 1);
            control.waitMicros(everySecondRotate);
        }
    } */

    /**
     * Steering Gear set pulse
     * @param pinSteering the pin of Steering Gear, eg: pinSteering.pinNum1
     */
    //%group="SteeringGear"
    //%blockId=orangebox_Steering_setPulse block="Steering Gear on pin |%pinSteering|set|%time|(micros)"
    export function servoSetPulse(pinSteering: pinSteering, time: number) {
        let pinS: AnalogPin;
        if(pinSteering == 0) {
            pinS = AnalogPin.P0;
        }
        else if(pinSteering == 1) {
            pinS = AnalogPin.P1;
        }
        else if(pinSteering == 2) {
            pinS = AnalogPin.P2;
        }
        else if(pinSteering == 3) {
            pinS = AnalogPin.P16;
        }
        pins.servoSetPulse(pinS, time);
    }
}