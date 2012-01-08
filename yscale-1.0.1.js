/**
 * @preserve Copyright 2012 sriharsha vardhan (sriharsha.net)
 */ 

/**
 * Given max value of y scale
 * @param {number} max value
 * @return {array} an array [interval, noOfUnits]
 * interval * noOfUnits = scaleMax
 */
exports.yScaleMax =  function(max) {
  var scalemax, interval, units;
  var M = Math; //Minimize

  //Get order of log10
  var order = M.floor(M.LOG10E * M.log(max));

  //Get units and sub-units
  //For 12745 unit would be 10000 and sub-unit would be 1000
  var unit = M.pow(10,order);
  var subunit = M.pow(10,order-1);

  //Get weight and rider
  //For 12745 weight would be 12 and rider would be 2
  var weight = M.floor(max / subunit);
  var rider = M.floor(weight % 10);

  //Get interval
  if (weight < 20) {
    //In case of 100, 1000 ...
    //scale upto 10 units
    if (max == unit) {
      interval = subunit;
    } else {
      interval = subunit * 2;
    }
  } else if (weight < 30) {
    if (rider < 5) {
      //In case of 300 .. 350 or 3000 .. 3500
      //scale upto 10 units
      interval = subunit * 2.5;
    } else {
      interval = subunit * 5;
    }
  } else if (weight < 50) {
    interval = subunit * 5;
  } else {
    //In case of 500, 5000 ...
    //scale upto 10 units
    if (max == (unit * 5)) {
      interval = subunit * 5;
    } else {
      interval = unit;
    }
  }

  scalemax = ((max > (weight * subunit)) ? (weight + 1) : weight) * subunit;
  units = M.ceil(scalemax/interval);
  scalemax = interval * units;

  if ((interval * units) != scalemax) {
    throw new Error("Unknown error");
  }

  return [interval,units];
}

/**
 * Given min and range(max-min) this function gives new min
 * @param {number} min value
 * @param {number} range (max-min) value
 * @return {array} an array [interval, noOfUnits, scaleMax]
 */
exports.yScale =  function(min, max) {

  var range, interval, scaleMax, scaleMin,  scale, scales = [];

  range = max - min;

  //Get raw max
  interval = this.yScaleMax(max);

  //Get max scaled differential
  interval = this.yScaleMax((interval[0] * interval[1]) - min);
  scaleMin = (Math.floor(min/interval[0]) * interval[0]);
  scaleMax = (Math.ceil(max/interval[0]) * interval[0]);

  //Get scaled differential
  interval = this.yScaleMax(scaleMax-scaleMin);
  scaleMin = (Math.floor(min/interval[0]) * interval[0]);
  scaleMax = (Math.ceil(max/interval[0]) * interval[0]);

  scale = scaleMin;
  do {
    scales.push(scale);
    scale = Math.round((scale + interval[0]) * 1000)/1000;
  } while(scale <= scaleMax);

  if (scales.length > 11) {
    throw new Error("Unknown error");
  }

  return scales;
}

