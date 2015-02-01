var l3gd20 = require('l3gd20');

var l3g  = new l3gd20(); // This is a lowercase "L" not a one "1"

var gyro = l3g.rategyro();

gyro.readAxes(function(err,axes){
    if(err){
        console.log("Error reading Accelerometer Axes : " + err);
    }
    if (axes) {
        console.log(axes);
    }
});
