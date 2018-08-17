enum pinTouch {
    //% block="S1"
    pinNum0 = 0,
    //% block="S2"
    pinNum1 = 1,
    //% block="S3"
    pinNum2 = 2,
    //% block="S4"
    pinNum3 = 3
}
namespace sensor {
    /**
     *  OrangeBox TouchSensor
     */ 
    export class TouchSensor {
        pinOut: DigitalPin;
    }

    /**
     * Read TouchSensor state
     * @param pinTouch the pin of TouchSensor, eg: pinTouch.pinNum1
     */
    //% group="TouchSensor"
    //% blockId=bluebox_touchSensor block="TouchSensor on|%pinTouch|is touched"
    export function readTouchSensorState(pinTouch: pinTouch): boolean{
        let pinO: DigitalPin;
        if(pinTouch == 0) {
            pinO = DigitalPin.P0;
        }
        else if(pinTouch == 1) {
            pinO = DigitalPin.P1;
        }
        else if(pinTouch == 2) {
            pinO = DigitalPin.P2;
        }
        else if(pinTouch == 3) {
            pinO = DigitalPin.P3;
        }
        let n: number = pins.digitalReadPin(pinO);
        let r: boolean = false;
        if(n == 0) {
            r = false;
        }
        else if(n == 1) {
            r = true;
        }
        return r;
    }

    
}