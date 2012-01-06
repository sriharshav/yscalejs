/* node_modules\.bin\jasmine-node.cmd yScale */

var ys = require('../yscale');

describe("yScale", function() {
  it("should scale with 10 units for values like 10 and 100 .. ", function() {
    var ranges = [1,10,100,1000,10000,100000];
    ranges.forEach(function(range) {
      expect(ys.yScale(range)[1]).toEqual(10);
    });
  });
});

describe("yScale", function() {
  it("should scale with 10 units for values like 50 and 500 .. ", function() {
    var ranges = [5,50,500,5000,50000,500000];
    ranges.forEach(function(range) {
      expect(ys.yScale(range)[1]).toEqual(10);
    });
  });
});

describe("yScale", function() {
  it("should scale for float ranges also .. ", function() {
    var testRange = [];
    for (i = 20.36; i < 197.85; i = i + 0.1) {
      testRange.push(i.toFixed(3));
    }
    testRange.forEach(function (range) {
      var result = ys.yScale(range);
      var max = (result[0] * result[1]);
      expect(result[1] > 5).toBeTruthy();
      expect(result[1] <= 10).toBeTruthy();
      expect(max == result[2]).toBeTruthy();
      expect(max >= range).toBeTruthy();
    });
  });
});

describe("yScale", function() {
  it("should fail for negative ranges .. ", function() {
    try {
      var result = ys.yScale(-2.4);
    } catch(error) {
      expect(error).toBeTruthy();
    }
  });
});


