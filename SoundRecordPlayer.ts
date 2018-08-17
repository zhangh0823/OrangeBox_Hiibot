enum pin {
    //% block=S1
    pinNum0 = 0,
    //% block=S2
    pinNum1 = 1,
    //% block=S3
    pinNum2 = 2,
    //% block=S4
    pinNum3 = 3
}

enum choose {
    //% block=Play
    play = 1,
    //% block=Record
    record = 2
}

//% weight=10 color=#FF6666 icon="\uf013" block="Actuator of Orangebox"
//% groups='["SoundRecordPlayer", "SteeringGear"]'
namespace output {
    let timePlay_mills = 0;
    let timeStartRecord_mills = 0;
    let voiceTimeLength_millis = 13000;
    let n: number;
   
    /* export class SoundRecordPlayer {
        pinPlay: DigitalPin;
        pinRecord: DigitalPin;
        //% weight = 90
        //% blockId=bluebox_SoundRecordPlay_CheckPlayOver block="|%soundRecordPlayer|是否播放完毕"
        public checkPlayOver(): boolean {
            let b: boolean = false
            
            if (timePlay_mills = 1) {
                b = true;
                return b;
            }
            return b;
        } 

        //% weight = 90
        //% blockId=bluebox_SoundRecordPlay_CheckRecordOver block="|%soundRecordPlayer| record over"
        public checkRecordOver(): boolean {
            let timePlayed = pins.pulseIn(this.pinRecord, PulseValue.High, 13000);
            if(timePlayed >= voiceTimeLength_millis) {
                return true;
            }
            else {
                return false;
            }
        } 
    } */

    /**
     * Stop
     * @param pinPlayAndRecord the pin of Player, eg: pin.pinNum1
     */
    //% weight = 90
    //% group="SoundRecordPlayer"
    //% blockId=bluebox_SoundRecordPlay_create block="Player on|%pin|stop"
    export function stop(pinPlayAndRecord: pin) {
        let pinPlay: DigitalPin;
        let pinRecord: DigitalPin;
        if(pinPlayAndRecord == 0) {
            pinPlay = DigitalPin.P0;
            pinRecord = DigitalPin.P13;
        }
        else if(pinPlayAndRecord == 1) {
            pinPlay = DigitalPin.P1;
            pinRecord = DigitalPin.P14;
        }
        else if(pinPlayAndRecord == 2) {
            pinPlay = DigitalPin.P2;
            pinRecord = DigitalPin.P15;
        }
        else if(pinPlayAndRecord == 3) {
            pinPlay = DigitalPin.P16;
            pinRecord = DigitalPin.P8;
        }
        pins.digitalWritePin(pinPlay, 0);
        pins.digitalWritePin(pinRecord, 0);
    } 

    /**
     * Play or record(no wait)
     * @param pinPlayAndRecord the pin of Player, eg: pin.pinNum1
     */
    //% weight = 90
    //% group="SoundRecordPlayer"
    //% blockId=bluebox_SoundRecordPlay_play_nowait block="Player on|%pin|%choose|(no wait)"
    export function noWait(pinPlayAndRecord: pin, choose: choose) {
        let pinPlay: DigitalPin;
        let pinRecord: DigitalPin;
        if(pinPlayAndRecord == 0) {
            pinPlay = DigitalPin.P0;
            pinRecord = DigitalPin.P13;
        }
        else if(pinPlayAndRecord == 1) {
            pinPlay = DigitalPin.P1;
            pinRecord = DigitalPin.P14;
        }
        else if(pinPlayAndRecord == 2) {
            pinPlay = DigitalPin.P2;
            pinRecord = DigitalPin.P15;
        }
        else if(pinPlayAndRecord == 3) {
            pinPlay = DigitalPin.P16;
            pinRecord = DigitalPin.P8;
        }

        if(choose == 1) {
            pins.digitalWritePin(pinPlay, 1);
            pins.digitalWritePin(pinRecord, 0);
        }
        else if(choose == 2) {
            pins.digitalWritePin(pinPlay, 0);
            pins.digitalWritePin(pinRecord, 1);
        }
    }

    /**
     * Play or record(wait)
     * @param pinPlayAndRecord the pin of Player, eg: pin.pinNum1
     */
    //% weight = 90
    //% group="SoundRecordPlayer"
    //% blockId=bluebox_SoundRecordPlay_play_wait block="Player on|%pin|%choose|(wait)"
    export function wait(pinPlayAndRecord: pin, choose: choose) {
        let pinPlay: DigitalPin;
        let pinRecord: DigitalPin;
        if(pinPlayAndRecord == 0) {
            pinPlay = DigitalPin.P0;
            pinRecord = DigitalPin.P13;
        }
        else if(pinPlayAndRecord == 1) {
            pinPlay = DigitalPin.P1;
            pinRecord = DigitalPin.P14;
        }
        else if(pinPlayAndRecord == 2) {
            pinPlay = DigitalPin.P2;
            pinRecord = DigitalPin.P15;
        }
        else if(pinPlayAndRecord == 3) {
            pinPlay = DigitalPin.P16;
            pinRecord = DigitalPin.P8;
        }

        if(choose == 1) {
            pins.digitalWritePin(pinPlay, 1);
            pins.digitalWritePin(pinRecord, 0);
            
            while(1) {
                for(let i = 0; i < 130; i++) {
                    control.waitMicros(100000);
                    n = 100000 * i;
                }
                break;
            }
            pins.digitalWritePin(pinPlay, 0);
        }
        else if(choose == 2) {
            pins.digitalWritePin(pinPlay, 0);
            pins.digitalWritePin(pinRecord, 1);

            while(1) {
                for(let i = 0; i < 130; i++) {
                    control.waitMicros(100000);
                    n = 100000 * i;
                }
                break;
            }
            pins.digitalWritePin(pinRecord, 0);
        }
    }
}