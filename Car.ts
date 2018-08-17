enum direction {
    //%block=GoForward
    GoForward = 1,
    //%block=GoBackward
    GoBackward = 0,
    //%block=TurnLeft
    TurnLeft = 2,
    //%block=TurnRight
    TurnRight = 3
}

enum dirTrack {
    //% block=Right
    right = 1,
    //% block=Left
    left = 2
}

enum dir {
    //% block=GoForward
    forward = 1,
    //% block=GoBackward
    backward = 2
}

enum pinsofCar {
    //% block=S1
    pinNum0 = 0,
    //% block=S2
    pinNum1 = 1,
    //% block=S3
    pinNum2 = 2,
    //% block=S4
    pinNum3 = 3
}

//% weight=10 color=#FF9900 icon="\uf1b9" block="Car chassis""
namespace carBase {

    export class Car {
        pinRightMotor1IN: AnalogPin;
        pinRightMotor2IN: AnalogPin;
        pinLeftMotor1IN: AnalogPin;
        pinLeftMotor2IN: AnalogPin;

        public setDirSpeedRM(dir: boolean, speed: number) {
            if(dir) {
                pins.analogWritePin(this.pinRightMotor1IN, speed);
                pins.analogWritePin(this.pinRightMotor2IN, 0);
            }
            else {
                pins.analogWritePin(this.pinRightMotor1IN, 0);
                pins.analogWritePin(this.pinRightMotor2IN, speed);
            }
        }

        public setDirSpeedLM(dir: boolean, speed: number) {
            if(dir) {
                pins.analogWritePin(this.pinLeftMotor1IN, speed);
                pins.analogWritePin(this.pinLeftMotor2IN, 0);
            }
            else {
                pins.analogWritePin(this.pinLeftMotor1IN, 0);
                pins.analogWritePin(this.pinLeftMotor2IN, speed);
            }
        }
    }

    /**
     * Car track sensor
     * @param pinTrack the pin of right wheel, eg: pinsofCar.pinNum1
     */
    //% blockId=orangeBox_car_track block="|%direction|trackSensor on|%pinTrack| in car is tracked"
    export function carTrack(direction: dirTrack, pinTrack: pinsofCar): boolean {
        let pinTrackRight: DigitalPin;
        let pinTrackLeft: DigitalPin;
        let n: number = 0;
        let r: boolean = false;

        if(pinTrack == 0) {
            pinTrackRight = DigitalPin.P0;
            pinTrackLeft = DigitalPin.P13;
        }
        else if(pinTrack == 1) {
            pinTrackRight = DigitalPin.P1;
            pinTrackLeft = DigitalPin.P14;
        }
        else if(pinTrack == 2) {
            pinTrackRight = DigitalPin.P2;
            pinTrackLeft = DigitalPin.P15;
        }
        else if(pinTrack == 3) {
            pinTrackRight = DigitalPin.P16;
            pinTrackLeft = DigitalPin.P8;
        }
        pins.setPull(pinTrackRight, PinPullMode.PullNone);
        pins.setPull(pinTrackLeft, PinPullMode.PullNone);

        //右边的循迹传感器
        if(direction == 1) {
            n = pins.digitalReadPin(pinTrackRight);
        }
        //左边的循迹传感器
        else if(direction == 2) {
            n = pins.digitalReadPin(pinTrackLeft);
        }

        if(n == 0) {
            r = false;
        }
        else if(n == 1) {
            r = true;
        }
        return r;
    }

    
    /**
     * Car turning
     * @param pinR the pin of right wheel, eg: pinsofCar.pinNum1
     * @param pinL the pin of right wheel, eg: pinsofCar.pinNum2
     */
    //% inlineInputMode=inline
    //% blockId=orangebox_car_turning block="The car's right tire on|%pinR|, |%dirR|speed|%speedR|(0-1023), left tire on|%pinL|, |%dirL|speed|%speedL|(0-1023)"
    export function carTurning(pinR: pinsofCar, dirR: dir, speedR: number, pinL: pinsofCar, dirL: dir, speedL: number) {
        let pinRM1: AnalogPin;
        let pinRM2: AnalogPin;
        let pinLM1: AnalogPin;
        let pinLM2: AnalogPin;
        
        if(pinR == 0) {
            pinRM1 = AnalogPin.P0;
            pinRM2 = AnalogPin.P13;
        }
        else if(pinR == 1) {
            pinRM1 = AnalogPin.P1;
            pinRM2 = AnalogPin.P14;
        }
        else if(pinR == 2) {
            pinRM1 = AnalogPin.P2;
            pinRM2 = AnalogPin.P15;
        }
        else if(pinR == 3) {
            pinRM1 = AnalogPin.P16;
            pinRM2 = AnalogPin.P8;
        }

        if(pinL == 0) {
            pinLM1 = AnalogPin.P0;
            pinLM2 = AnalogPin.P13;
        }
        else if(pinL == 1) {
            pinLM1 = AnalogPin.P1;
            pinLM2 = AnalogPin.P14;
        }
        else if(pinL == 2) {
            pinLM1 = AnalogPin.P2;
            pinLM2 = AnalogPin.P15;
        }
        else if(pinL == 3) {
            pinLM1 = AnalogPin.P16;
            pinLM2 = AnalogPin.P8;
        }

        pins.analogWritePin(pinRM1, 0);
        pins.analogWritePin(pinRM2, 0);
        pins.analogWritePin(pinLM1, 0);
        pins.analogWritePin(pinLM2, 0);

        if(dirR == 1) {
            pins.analogWritePin(pinRM1, speedR);
            pins.analogWritePin(pinRM2, 0);
        }
        else if(dirR == 2) {
            pins.analogWritePin(pinRM1, 0);
            pins.analogWritePin(pinRM2, speedR);
        }
        if(dirL == 1) {
            pins.analogWritePin(pinLM1, speedL);
            pins.analogWritePin(pinLM2, 0);
        }
        else if(dirL == 2) {
            pins.analogWritePin(pinLM1, 0);
            pins.analogWritePin(pinLM2, speedL);
        }
    }


    /**
     * Car stop
     * @param pinR the pin of right wheel, eg: pinsofCar.pinNum1
     * @param pinL the pin of right wheel, eg: pinsofCar.pinNum2
     */
    //% blockId=orangebox_car_stop block="The car's right tire is on|%pinR|, the left tire is on|%pinL| stop"
    export function carStop(pinR: pinsofCar, pinL: pinsofCar) {
        let pinRM1: AnalogPin;
        let pinRM2: AnalogPin;
        let pinLM1: AnalogPin;
        let pinLM2: AnalogPin;
        if(pinR == 0) {
            pinRM1 = AnalogPin.P0;
            pinRM2 = AnalogPin.P13;
        }
        else if(pinR == 1) {
            pinRM1 = AnalogPin.P1;
            pinRM2 = AnalogPin.P14;
        }
        else if(pinR == 2) {
            pinRM1 = AnalogPin.P2;
            pinRM2 = AnalogPin.P15;
        }
        else if(pinR == 3) {
            pinRM1 = AnalogPin.P16;
            pinRM2 = AnalogPin.P8;
        }

        if(pinL == 0) {
            pinLM1 = AnalogPin.P0;
            pinLM2 = AnalogPin.P13;
        }
        else if(pinL == 1) {
            pinLM1 = AnalogPin.P1;
            pinLM2 = AnalogPin.P14;
        }
        else if(pinL == 2) {
            pinLM1 = AnalogPin.P2;
            pinLM2 = AnalogPin.P15;
        }
        else if(pinL == 3) {
            pinLM1 = AnalogPin.P16;
            pinLM2 = AnalogPin.P8;
        }
        pins.analogWritePin(pinRM1, 0);
        pins.analogWritePin(pinRM2, 0);
        pins.analogWritePin(pinLM1, 0);
        pins.analogWritePin(pinLM2, 0);
    }

    /**
    * Set car's direction
    * @param pinR the pin of right wheel, eg: pinsofCar.pinNum1
    * @param pinL the pin of right wheel, eg: pinsofCar.pinNum2
    */
    //% blockId=orangebox_car_turn block="The car's right tire is on|%pinR|, the left tire is on|%pinL|%direction|with|%speed|(0-1023)"
    //% inlineInputMode=inline
    export function carTurn(pinR: pinsofCar, pinL: pinsofCar, direction: direction, speed: number) {  
        let car = new Car();
        if(pinR == 0) {
            car.pinRightMotor1IN = AnalogPin.P0;
            car.pinRightMotor2IN = AnalogPin.P13;
        }
        
        else if(pinR == 1) {
            car.pinRightMotor1IN = AnalogPin.P1;
            car.pinRightMotor2IN = AnalogPin.P14;
        }
        else if(pinR == 2) {
            car.pinRightMotor1IN = AnalogPin.P2;
            car.pinRightMotor2IN = AnalogPin.P15;
        }
        else if(pinR == 3) {
            car.pinRightMotor1IN = AnalogPin.P16;
            car.pinRightMotor2IN = AnalogPin.P8;
        }

        if(pinL == 0) {
            car.pinLeftMotor1IN = AnalogPin.P0;
            car.pinLeftMotor2IN = AnalogPin.P13;
        }
        else if(pinL == 1) {
            car.pinLeftMotor1IN = AnalogPin.P1;
            car.pinLeftMotor2IN = AnalogPin.P14;
        }
        else if(pinL == 2) {
            car.pinLeftMotor1IN = AnalogPin.P2;
            car.pinLeftMotor2IN = AnalogPin.P15;
        }
        else if(pinL == 3) {
            car.pinLeftMotor1IN = AnalogPin.P16;
            car.pinLeftMotor2IN = AnalogPin.P8;
        }

        pins.analogWritePin(car.pinRightMotor1IN, 0);
        pins.analogWritePin(car.pinRightMotor2IN, 0);
        pins.analogWritePin(car.pinLeftMotor1IN, 0);
        pins.analogWritePin(car.pinLeftMotor2IN, 0);
        
        //后退
        if(direction == 0) {
            car.setDirSpeedRM(false, speed);
            car.setDirSpeedLM(false, speed);
        }
        //前进
        else if(direction == 1) {
            car.setDirSpeedRM(true, speed);
            car.setDirSpeedLM(true, speed);
        }
        //右转
        else if(direction == 3) {
            car.setDirSpeedLM(true, speed);
            car.setDirSpeedRM(false, speed);
        }
        //左转
        else if(direction == 2) {
            car.setDirSpeedLM(false, speed);
            car.setDirSpeedRM(true, speed);
        }
    }
}