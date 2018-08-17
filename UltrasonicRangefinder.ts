enum chooseDistance {
    //% block="cm"
    cm = 1,
    //% block="inch"
    inch = 2
}

namespace sensor {
    let distanceBackupCM0: number = 0;
    let distanceBackupCM1: number = 0;
    let distanceBackupCM2: number = 0;
    let distanceBackupCM3: number = 0;
    let distanceBackupInch0: number = 0;
    let distanceBackupInch1: number = 0;
    let distanceBackupInch2: number = 0;
    let distanceBackupInch3: number = 0;
     /**
     * Read TouchSensor state
     * @param pinDistance the pin of DistanceSensor, eg: pin.pinNum1
     */
    //% weight=90
    //% group="UltrasonicRangeSensor"
    //% blockId=orangebox_ultrasonicRangefinder_measure_distance block="Measure distance on|%pin|with|%choose"
    export function measureDistance(pinDistance: pin, choose: chooseDistance):number {
        let pinEcho: DigitalPin;
        let pinTrig: DigitalPin;
        let r: number = 0;

        if(pinDistance == 0) {
            pinEcho = DigitalPin.P0;
            pinTrig = DigitalPin.P13;
            //cm
            if(choose == 1) {
                let duration = 0;
                let rangeInCentimeters = 0;
            
                pins.digitalWritePin(pinEcho, 0);
                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000); // Max duration 100 ms

                rangeInCentimeters = duration * 10 / 372;
            
                if(rangeInCentimeters > 0 && rangeInCentimeters <= 400) {
                    distanceBackupCM0 = rangeInCentimeters; 
                }
                else {
                    rangeInCentimeters = distanceBackupCM0;
                }
                r = rangeInCentimeters;
            }
            //inch
            else if(choose == 2) {
                let duration = 0;
                let rangeInInches = 0;

                pins.digitalWritePin(pinEcho, 0);

                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000);

                rangeInInches = duration * 10 / 945;

                if(rangeInInches > 0 && rangeInInches <= 157) {
                    distanceBackupInch0 = rangeInInches;
                }
                else {
                    rangeInInches = distanceBackupInch0;
                }
                r = rangeInInches;
            }
        }
        else if(pinDistance == 1) {
            pinEcho = DigitalPin.P1;
            pinTrig = DigitalPin.P14;
            //cm
            if(choose == 1) {
                let duration = 0;
                let rangeInCentimeters = 0;
            
                pins.digitalWritePin(pinEcho, 0);
                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000); // Max duration 100 ms

                rangeInCentimeters = duration * 10 / 372;
            
                if(rangeInCentimeters > 0 && rangeInCentimeters <= 400) {
                    distanceBackupCM1 = rangeInCentimeters; 
                }
                else {
                    rangeInCentimeters = distanceBackupCM1;
                }
                r = rangeInCentimeters;
            }
            //inch
            else if(choose == 2) {
                let duration = 0;
                let rangeInInches = 0;

                pins.digitalWritePin(pinEcho, 0);

                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000);

                rangeInInches = duration * 10 / 945;

                if(rangeInInches > 0 && rangeInInches <= 157) {
                    distanceBackupInch1 = rangeInInches;
                }
                else {
                    rangeInInches = distanceBackupInch1;
                }
                r = rangeInInches;
            }
        }
        else if(pinDistance == 2) {
            pinEcho = DigitalPin.P2;
            pinTrig = DigitalPin.P15;
            //cm
            if(choose == 1) {
                let duration = 0;
                let rangeInCentimeters = 0;
            
                pins.digitalWritePin(pinEcho, 0);
                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000); // Max duration 100 ms

                rangeInCentimeters = duration * 10 / 372;
            
                if(rangeInCentimeters > 0 && rangeInCentimeters <= 400) {
                    distanceBackupCM2 = rangeInCentimeters; 
                }
                else {
                    rangeInCentimeters = distanceBackupCM2;
                }
                r = rangeInCentimeters;
            }
            //inch
            else if(choose == 2) {
                let duration = 0;
                let rangeInInches = 0;

                pins.digitalWritePin(pinEcho, 0);

                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000);

                rangeInInches = duration * 10 / 945;

                if(rangeInInches > 0 && rangeInInches <= 157) {
                    distanceBackupInch2 = rangeInInches;
                }
                else {
                    rangeInInches = distanceBackupInch2;
                }
                r = rangeInInches;
            }
        }
        else if(pinDistance == 3) {
            pinEcho = DigitalPin.P16;
            pinTrig = DigitalPin.P8;
            //cm
            if(choose == 1) {
                let duration = 0;
                let rangeInCentimeters = 0;
            
                pins.digitalWritePin(pinEcho, 0);
                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000); // Max duration 100 ms

                rangeInCentimeters = duration * 10 / 372;
            
                if(rangeInCentimeters > 0 && rangeInCentimeters <= 400) {
                    distanceBackupCM3 = rangeInCentimeters; 
                }
                else {
                    rangeInCentimeters = distanceBackupCM3;
                }
                r = rangeInCentimeters;
            }
            //inch
            else if(choose == 2) {
                let duration = 0;
                let rangeInInches = 0;

                pins.digitalWritePin(pinEcho, 0);

                pins.digitalWritePin(pinTrig, 0);
                control.waitMicros(5);
                pins.digitalWritePin(pinTrig, 1);
                control.waitMicros(20);
                pins.digitalWritePin(pinTrig, 0);

                duration = pins.pulseIn(pinEcho, PulseValue.High, 100000);

                rangeInInches = duration * 10 / 945;

                if(rangeInInches > 0 && rangeInInches <= 157) {
                    distanceBackupInch3 = rangeInInches;
                }
                else {
                    rangeInInches = distanceBackupInch3;
                }
                r = rangeInInches;
            }
        }
        
        return r;
    }
}