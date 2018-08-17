//% weight=10 color=#9F79EE icon="\uf108" block="空气振动传感器"
namespace AirShake {
    /**
     *  BlueBox AirShakeSensor
     */ 
    export class AirShakeSensor {
        pinOut1: AnalogPin;
    }

    /**
     * Read shake from AirShakeSensor
     */
    //% weight = 90
    //% blockId=bluebox_airShakeSensor block="读取|%pinOut1|引脚上的空气振动值"
    export function readValue(pinOut1: AnalogPin): number {
        let airShakeSensor = new AirShakeSensor();
        airShakeSensor.pinOut1 = pinOut1;

        let n: number = pins.analogReadPin(airShakeSensor.pinOut1);
        return n;
    }

    /**
     * Determine the value of air shake
     */
    /* //% weight = 90
    //% blockId=bluebox_airShakeSensor_determine block="如果引脚|%pinOut1|上的空气振动值大于|%threshold|,则"
    export function judgeValue(pinOut1: AnalogPin, threshold: number, handler:() => void) {
        for(; ;) {
            let n: number = pins.analogReadPin(pinOut1);
            if(n > threshold) {
                handler();
            }
            control.waitMicros(500);
        }
    } */
    
}