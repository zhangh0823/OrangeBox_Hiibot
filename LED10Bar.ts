
namespace bluebox {


    enum LED10BarLightState {
        //% block=0
        LED10BAR_LIGHT_0  = 0,
        //% block=1
        LED10BAR_LIGHT_1  = 1,
        //% block=2
        LED10BAR_LIGHT_2  = 2,
        //% block=3
        LED10BAR_LIGHT_3  = 3,
        //% block=4
        LED10BAR_LIGHT_4  = 4,
        //% block=5
        LED10BAR_LIGHT_5  = 5,
        //% block=6
        LED10BAR_LIGHT_6  = 6,
        //% block=7
        LED10BAR_LIGHT_7  = 7,
        //% block=8
        LED10BAR_LIGHT_8  = 8,
        //% block=9
        LED10BAR_LIGHT_9  = 9,
        //% block=10
        LED10BAR_LIGHT_10 = 10
    }

    const LED10BAR_GLB_CMDMODE = 0x00;
    const LED10BAR_GLB_ON      = 0xff;
    const LED10BAR_GLB_OFF     = 0x00;

    let led10Bar:LED10Bar
    let led10BarLightState = LED10BarLightState.LED10BAR_LIGHT_0;

    
    /**
     * BlueBox LED10Bar 
     */
    class LED10Bar {
        _pinClock: DigitalPin;
        _pinData: DigitalPin;
        _bGreenToRed: boolean;
        _state: Buffer = pins.createBuffer(10);
        
        constructor(pinClock: DigitalPin, pinData: DigitalPin, greenToRed: boolean) {
            this._pinClock = pinClock;
            this._pinData = pinData;
            this._bGreenToRed = greenToRed;

            for (let i = 0; i < 10; i++){
                this._state[i] = 0x00;
            }
        }

        updateLED10BarLight() {

        }

    }

    /**
     * BlueBox LED10Bar set the number of lights
     */
    export function led10BarLightNumber(pinClock: DigitalPin, pinData: DigitalPin, ledLightState: LED10BarLightState) {
        if (led10Bar == null || led10Bar == undefined) {
            led10Bar = new LED10Bar(pinClock, pinData, false);
        }
        
        if (led10Bar._pinClock != pinClock) {
            led10Bar._pinClock = pinClock;
        }

        if (led10Bar._pinData != pinData) {
            led10Bar._pinData = pinData;
        }


    }


}