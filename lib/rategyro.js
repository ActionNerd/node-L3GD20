var i2c = require('i2c');
var utils = require('./util');

var gyro_address = 0x6b; // This is the correct gyro address
var gyro_device = '/dev/i2c-1'

function Rategyro(options) {
    if (options && options.address) {
        gyro_address = options.address;
    }
    if (options && options.device) {
        gyro_device = options.device;
    }
    this.gyro = new i2c(gyro_address, {
        device: gyro_device,
        debug: false
    });
    this.init();
    this.setResolution();
}
// Init normal ops
Rategyro.prototype.init = function(){
    this.accel.writeBytes(0x20, [0x57], function(err) {
        if(err){
            console.log("Error enabling Accelerometer : "+err);
        }
        else{
            console.log("Accelerometer Enabled");
        }
    });
}
// Set resolution
Rategyro.prototype.setResolution = function(){
    this.accel.writeBytes(0x23, [0x38], function(err) {
        if(err){
            console.log("Error Setting Accelerometer Resolution : "+err);
        }
        else{
            console.log("Accelerometer Resolution Set");
        }
    });
}
// ReadAxes
Accelerometer.prototype.readAxes = function(callback){
    this.accel.readBytes(0x28 | 0x80, 6, function(err, res) {
        callback(err,utils.buffToXYZAccel(res));
    });
}
module.exports = Rategyro;
