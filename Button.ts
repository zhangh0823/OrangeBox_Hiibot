enum state {
    //% block=touch
    touch = 1,
    //% block=onTouch
    noTouch = 0
}

//% weight=10 color=#9F79EE icon="\uf108" block="橙盒传感器"
namespace sensor {
    /**
     *  OrangeBox Button
     */ 
    export class Button {
        pinOut: DigitalPin;
    }

    /**
     * Read button state
     */
    //% blockId=bluebox_button block="读取引脚|%pinOut|上按钮的状态"
    export function readButtonState(pinOut: DigitalPin): number{
        let n: number = pins.digitalReadPin(pinOut);

        return n;
        
    }

    /**
     * Determine the state of button
     */
    //% weight=90
    //% blockId=bluebox_button_determine block="如果引脚|%pinOut|上的按钮|%event|，则"
    export function ifDown(pinOut: DigitalPin, event: state): number {
        let id: number = pinOut;
        return id;
        //control.onEvent(id, event, handler);
    } 

    /**
     * Determine the state of button(up) 
     */
    /* //% weight=90
    //% blockId=bluebox_button_determine_up block="如果引脚|%pinOut|上的按钮没有被按下，则"
    export function ifUp(pinOut: DigitalPin, handler:() => void) {
        while(1) {
            let n: number = pins.digitalReadPin(pinOut);
            if (n = 1) {
                handler();
            }
            if (n = 0) {
                break;
            }
        }
    } */
}