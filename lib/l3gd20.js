var i2c = require('i2c');
var Rategyro = require('./rategyro.js')

function L3GD20() {
    this.rategyro = null;
}

L3GD20.prototype.rategyro = function(options){
    if (this.gyro == null) {
        this.gyro = new Rategyro(options);
    }
    return this.gyro;
}

module.exports = L3GD20;
