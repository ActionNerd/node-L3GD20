var l3gd20 = require('../lib/l3gd20');

console.log(l3gd20);

var l3g  = new l3gd20(); // This is a lowercase "L" not a one "1"
console.log(l3g);
var gyro = l3g.rategyro();
var gyroIntCount = 0;



var intObj = setInterval(function() {
	gyro.readAxes(function(err,axes) {
		if(err){
			console.log("Error reading Gyro Axes : " + err);
		}
		if (axes) {
			console.log(axes);
		}
	});
	gyroIntCount++;
	if (gyroIntCount == 2000) {
		clearInterval(intObj);
	}
}, 200);
