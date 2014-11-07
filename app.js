var i2c = require('i2c');
var address = 0x6b;

var wire = new i2c(address, {device: '/dev/i2c-1', debug: true}); // point to your i2c address, d

wire.scan(function(err, data) {
        console.log(data);
  // result contains an array of addresses (in decimal format)
});

//wire.writeByte(byte, function(err) {});

//wire.writeBytes(command, [byte0, byte1], function(err) {});

// wire.readByte(function(err, res) { // result is single byte })

var Adafruit_L3GD20 = function() {
        this.addressObj = {
                'L3GD20_REGISTER_WHO_AM_I'            : 0x0F,   // 11010100   r
                'L3GD20_REGISTER_CTRL_REG1'           : 0x20,   // 00000111   rw
                'L3GD20_REGISTER_CTRL_REG2'           : 0x21,   // 00000000   rw
                'L3GD20_REGISTER_CTRL_REG3'           : 0x22,   // 00000000   rw
                'L3GD20_REGISTER_CTRL_REG4'           : 0x23,   // 00000000   rw
                'L3GD20_REGISTER_CTRL_REG5'           : 0x24,   // 00000000   rw
                'L3GD20_REGISTER_REFERENCE'           : 0x25,   // 00000000   rw
                'L3GD20_REGISTER_OUT_TEMP'            : 0x26,   //            r
                'L3GD20_REGISTER_STATUS_REG'          : 0x27,   //            r
                'L3GD20_REGISTER_OUT_X_L'             : 0x28,   //            r
                'L3GD20_REGISTER_OUT_X_H'             : 0x29,   //            r
                'L3GD20_REGISTER_OUT_Y_L'             : 0x2A,   //            r
                'L3GD20_REGISTER_OUT_Y_H'             : 0x2B,   //            r
                'L3GD20_REGISTER_OUT_Z_L'             : 0x2C,   //            r
                'L3GD20_REGISTER_OUT_Z_H'             : 0x2D,   //            r
                'L3GD20_REGISTER_FIFO_CTRL_REG'       : 0x2E,   // 00000000   rw
                'L3GD20_REGISTER_FIFO_SRC_REG'        : 0x2F,   //            r
                'L3GD20_REGISTER_INT1_CFG'            : 0x30,   // 00000000   rw
                'L3GD20_REGISTER_INT1_SRC'            : 0x31,   //            r
                'L3GD20_REGISTER_TSH_XH'              : 0x32,   // 00000000   rw
                'L3GD20_REGISTER_TSH_XL'              : 0x33,   // 00000000   rw
                'L3GD20_REGISTER_TSH_YH'              : 0x34,   // 00000000   rw
                'L3GD20_REGISTER_TSH_YL'              : 0x35,   // 00000000   rw
                'L3GD20_REGISTER_TSH_ZH'              : 0x36,   // 00000000   rw
                'L3GD20_REGISTER_TSH_ZL'              : 0x37,   // 00000000   rw
                'L3GD20_REGISTER_INT1_DURATION'       : 0x38    // 00000000   rw
        }
}

var gyro = new Adafruit_L3GD20();

function printReg(gyroSub) {
        for (var key in gyroSub.addressObj) {
                wire.readBytes(gyroSub.addressObj[key], 10, function(err, res) {
                        console.log((gyroSub.addressObj[key]).toString(16), res[0]);
                        // result contains a buffer of bytes
                });
        }
}

printReg(gyro);

console.log("Now putting the device into normal mode...");

// Turn on normal OPS:
wire.writeBytes(0x20, [0x0F], function(err) {
        if (!err) {
                console.log("Normal ops initiated successfully...");
        }
        else {
                console.log("Ops initiation error: " + err);
        }
});

// Turn on FIFO OPS:
wire.writeBytes(0x24, [0x00], function(err) {
        if (!err) {
                console.log("FIFO enabled successfully...");
        }
        else {
                console.log("FIFO error: " + err);
        }
});

// Initialize FIFO
wire.writeBytes(0x2E, [0x00], function(err) {
        if (!err) {
                console.log("FIFO initiated successfully...");
        }
        else {
                console.log("FIFO error: " + err);
        }
});






var intCounter = 0;

var intObj = setInterval(function() {
        intCounter++;
        printReg(gyro);
        if (intCounter == 50) {
                clearInterval(intObj)
        }
}, 1000);


