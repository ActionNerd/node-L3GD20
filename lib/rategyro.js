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
	this.idCheck();
	this.init();
	//this.setResolution();
}
// Check to see if this is the right sensor
Rategyro.prototype.idCheck = function() {
	this.gyro.readBytes(0x0f, 1, function(err, res) {
		console.log(res);
	});
}

// Init normal ops
Rategyro.prototype.init = function(){
	this.gyro.writeBytes(0x20, [0x0f], function(err) {
		if(err){
			console.log("Error enabling gyro : "+err);
		}
		else{
			console.log("Gyro Enabled");
		}
	});
}
// Set resolution
Rategyro.prototype.setResolution = function(){
	this.gyro.writeBytes(0x23, [0x38], function(err) {
		if(err){
			console.log("Error Setting Gyro Resolution : "+err);
		}
		else{
			console.log("Gyro Resolution Set");
		}
	});
}
// ReadAxes
Rategyro.prototype.readAxes = function(callback){
    this.gyro.readBytes(0x28 | 0x80, 6, function(err, res) {
        callback(err,utils.buffToXYZGyro(res));
    });
}
module.exports = Rategyro;
