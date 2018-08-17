namespace sensor{
    
    /**
     * Read angle from AngleSensor
     * @param pinLight the pin of LightSensor, eg: pinAngle.pinNum1
     */
    //% group="LightSensor"
    //% weight = 90
    //% blockId=bluebox_digitalLightSensor block="Read the light intensity on|%pinLight|(0-255)"
    export function readLight(pinLight: pinAngle): number {
        let time = 10;
        let sum: number = 0;
        let pinOut: AnalogPin
        
        if(pinLight == 0) {
            pinOut = AnalogPin.P0;
        }
        else if(pinLight == 1) {
            pinOut = AnalogPin.P1;
        }
        else if(pinLight == 2) {
            pinOut = AnalogPin.P2;
        }
        
        for(let i = 0; i < time; i++) {
            let n: number = pins.analogReadPin(pinOut);
            sum = sum + n;
            control.waitMicros(1000);
        }

        let lightValue = sum / time;
        let lightData: number;
        if (lightValue > 600) {
            lightData = 255
        }
        else if (lightValue <= 600 ) {
            lightData = lightValue * 255 / 600 ;
        }
        return lightData;
        
    }
}