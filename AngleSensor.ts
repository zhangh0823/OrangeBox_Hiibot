enum pinAngle {
    //% block="S1"
    pinNum0 = 0,
    //% block="S2"
    pinNum1 = 1,
    //% block="S3"
    pinNum2 = 2,
}
//% weight=10 color=#FF0033 icon="\uf25a" block="Sensor of Orangebox"
//% groups='["AngleSensor", "HumidityTemperatureSensor", "LightSensor", "TouchSensor", "UltrasonicRangeSensor", "ColorSensor"]'
namespace sensor {
    /**
     * Read angle from AngleSensor
     * @param pinAngle the pin of AngleSensor, eg: pinAngle.pinNum1
     */
    //% group="AngleSensor"
    //% parts="angle"
    //% weight = 90
    //% blockId=bluebox_angleSensor block="Read the angle on|%pinAngle|(0-270)"
    export function readAngle(pinAngle: pinAngle): number{
        let pinOut: AnalogPin;
        if(pinAngle == 0) {
            pinOut = AnalogPin.P0;
        }
        else if(pinAngle == 1) {
            pinOut = AnalogPin.P1;
        }
        else if(pinAngle == 2) {
            pinOut = AnalogPin.P2;
        }
        
        let n: number = pins.analogReadPin(pinOut);
        let r: number;
        r = (n * 100 / 286) - 1;
        
		if( r < 0 )
			r = 0;
		if (r > 270)
			r = 270;
        return r;
    }
}