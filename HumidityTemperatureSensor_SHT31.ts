enum chooseTem {
    //% block=celsius
    celsius = 1,
    //% block=fahrenheit
    fahrenheit = 2
}

enum SHT31ControlAddr {
    SHT31_MEAS_HIGHREP_STRETCH  = 0x2C06,
    SHT31_MEAS_MEDREP_STRETCH   = 0x2C0D,
    SHT31_MEAS_LOWREP_STRETCH   = 0x2C10,
    SHT31_MEAS_HIGHREP          = 0x2400,
    SHT31_MEAS_MEDREP           = 0x240B,
    SHT31_MEAS_LOWREP           = 0x2416,
    SHT31_READSTATUS            = 0xF32D,
    SHT31_CLEARSTATUS           = 0x3041,
    SHT31_SOFTRESET             = 0x30A2,
    SHT31_HEATEREN              = 0x306D,
    SHT31_HEATERDIS             = 0x3066
}

namespace sensor {

    const SHT31_I2C_DEFAULT_ADDR = 0x45;
    let humidityTemperatureSensor: HumidityTemperatureSensorSHT31;
    

    /**
     * BlueBox  HumidityTemperatureSensorSHT31
     */
    export class HumidityTemperatureSensorSHT31 {
        humidity: number;
        cTemperature: number;
        fTemperature: number;
    

        private reset() {
            this.sht31WriteCommand(SHT31ControlAddr.SHT31_SOFTRESET);
            control.waitMicros(10);
        }

        private sht31WriteCommand(cmd:SHT31ControlAddr) {
            let buf: Buffer = pins.createBuffer(2);

            buf[0] = cmd >> 8;
            buf[1] = cmd & 0xFF;

            pins.i2cWriteBuffer(SHT31_I2C_DEFAULT_ADDR, buf, false);
        }

        sht31Init() {
            this.reset();
        }

        public measureHumTemp() {
            this.sht31WriteCommand(SHT31ControlAddr.SHT31_MEAS_HIGHREP);
            let readBuf: Buffer = pins.createBuffer(6);
            readBuf = pins.i2cReadBuffer(SHT31_I2C_DEFAULT_ADDR, 6, false);
            
            let st: number = readBuf[0];
            st <<= 8;
            st |= readBuf[1];

            // let stBuf: Buffer = readBuf;
            
            let stCrc8 = this.crc8(readBuf, 2, 0);
            if (readBuf[2] != stCrc8) {
                serial.writeLine("temperature CRC error");
                // serial.writeValue("readBuf[2]", readBuf[2]);
                // serial.writeValue("stcrc8", stCrc8);
                return;
            }

            let srh: number = readBuf[3];
            srh <<= 8;
            srh |= readBuf[4];

            if (readBuf[5] != this.crc8(readBuf, 2, 3)) {
                serial.writeLine("humidity CRC error");
                return;
            }

            let stemp: number = st;
            stemp *= 175;
            stemp /= 0xFFFF;
            stemp = -45 + stemp;

            this.cTemperature = stemp;

            stemp = st;
            stemp *= 315;
            stemp /= 0xFFFF;
            stemp = -49 + stemp;
            this.fTemperature = stemp;

            let shum: number = srh;
            shum *= 100;
            shum /= 0xFFFF;
            this.humidity = shum;

        }

        private crc8(data: Buffer, len: number, index: number) {
            let crc: Buffer = pins.createBuffer(1);
            crc[0] = 0xFF;

            
            for (let j = index; j < index+len; j++) {
                
                crc[0] =  crc[0] ^ data[j];

                for (let i = 8; i>0; --i) {
                    if (crc[0] & 0x80) {
                        crc[0] = (crc[0] << 1) ^ 0x31;
                    }
                    else {
                        crc[0] = (crc[0] << 1);
                    }
                }
            }
            return crc[0]; 
        }
    }

    /**
     * get current temperaure in celsius 
     */
    //% group="温湿度传感器"
    //% blockId=bluebox_HumidityTemperatureSensorSHT31_temperature_with_celsius block="get current temperature in |%choose|"
    export function acquireHumidityTemperature(choose: chooseTem): number {
        if (humidityTemperatureSensor == null || humidityTemperatureSensor == undefined) {
            humidityTemperatureSensor = new HumidityTemperatureSensorSHT31();
            humidityTemperatureSensor.sht31Init();
        }
        humidityTemperatureSensor.measureHumTemp();
        let r: number = 0;
        if (choose == 1) {
            r = humidityTemperatureSensor.cTemperature;
        }
        else if(choose == 2) {
            r = humidityTemperatureSensor.fTemperature;
        }
        return r;
    }

    /**
     * get current humidity 
     */
    //% group="温湿度传感器"
    //% blockId=bluebox_HumidityTemperatureSensorSHT31_humidity block="get current humidity"
    export function acquireCurrentHumidity(): number {
        if (humidityTemperatureSensor == null || humidityTemperatureSensor == undefined) {
            humidityTemperatureSensor = new HumidityTemperatureSensorSHT31();
            humidityTemperatureSensor.sht31Init();
        }
        humidityTemperatureSensor.measureHumTemp();
        
        return humidityTemperatureSensor.humidity;
    }

}