/**
 * @preserve Copyright 2012 sriharsha vardhan (sriharsha.net)
 */ 

/**
 * Given max value of y scale
 * @param {number} max value
 * @return {array} an array [interval, noOfUnits]
 * interval * noOfUnits = scaleMax
 */
exports.yScaleMax = function(max) {
  var M, interval, order, rider, scalemax, subunit, unit, units, weight;
  scalemax = 0;
  interval = 0;
  units = 0;
  M = Math;

  //Get order of log10
  order = M.floor(M.LOG10E * M.log(max));

  //Get units and sub-units
  //For 12745 unit would be 10000 and sub-unit would be 1000
  unit = M.pow(10, order);
  subunit = M.pow(10, order - 1);

  //Get weight and rider
  //For 12745 weight would be 12 and rider would be 2
  weight = M.floor(max / subunit);
  rider = M.floor(weight % 10);

  
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

  scalemax = (max > (weight * subunit) ? weight + 1 : weight) * subunit;
  units = M.ceil(scalemax / interval);
  scalemax = interval * units;
  if ((interval * units) !== scalemax) {
    throw new Error("Unknown error");
  }
  return [interval, units];
};

/**
 * Given min and range(max-min) this function gives new min
 * @param {number} min value
 * @param {number} max value
 * @return {array} an array of scales
 */
exports.yScale =  function(min, max) {

  var range, interval, scaleMax, scaleMin,  scale, scales = [];

  range = max - min;

  //Get raw max
  interval = this.yScaleMax(range);

  //Get adjusted interval and units
  if (((interval[0] * interval[1]) - range) <= interval[0]) {
    interval = this.yScaleMax(range + interval[0]);
  }
  if (min <= interval[0]) {
      interval = this.yScaleMax(max);
  }

  //Calculate Scale Minimum
  scaleMin = min - interval[0];
  if (scaleMin <= 0) {
    scaleMin = 0;
  } else {
    scaleMin = scaleMin + (10 - (scaleMin % 10));
  }

  //Calculate Scale Maximum
  scaleMax = scaleMin + (interval[0] * interval[1]);
  if ((scaleMax - interval[0]) > max) {
    scaleMax = scaleMax - interval[0];
  }

  //Now fill scales
  scale = scaleMin;
  do {
    scales.push(scale);
    scale = Math.round((scale + interval[0]) * 1000)/1000;
  } while(scale <= scaleMax);

  //Assert
  if (scales.length > 11) {
    throw Error("Unknown error");
  }

  return scales;
}
