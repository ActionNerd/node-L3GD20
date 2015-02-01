function Utils() {

}

var toPolar = function(x, y) { // returns polar coordinates as an object (radians)
  var polarCoords = {};
  polarCoords.r = Math.sqrt(x * x + y * y);
  polarCoords.theta = Math.PI / 2 - Math.atan2(y, x);
  if ( polarCoords.theta < 0 ) {
    polarCoords.theta += 2 * Math.PI;
  }
  polarCoords.theta = 2 * Math.PI - polarCoords.theta;
  polarCoords.theta = (180 / Math.PI * polarCoords.theta);
  return ((polarCoords.theta != 360) ? polarCoords.theta : 0);
}

Utils.buffToTemp = function(buffer){
  var temp;
  temp = {
    temp : (((buffer[0] << 8) | buffer[1]) >> 4)/8 + 18
  };
  return temp;
}

Utils.twoscomp = function(value,no_of_bits) {
  var upper = Math.pow(2,no_of_bits);
  if (value > upper / 2) {
    return value - upper;
  }
  else{
    return value;
  }
}

Utils.trueRound = function(value, digits){
    return parseFloat((Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits));
}

module.exports = Utils;
