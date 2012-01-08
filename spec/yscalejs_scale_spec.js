var ys = require('../yscale-min-1.0.1');

describe("yScale", function() {
  it("should scale for min value of 0", function() {
    expect(ys.yScale(0,360)).toEqual([ 0, 50, 100, 150, 200, 250, 300, 350, 400 ]);
  });
  it("should scale for decimal values", function() {
    expect(ys.yScale(0.2, 2.077)).toEqual([ 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25 ]);
  });
  it("should scale for decimal values", function() {
    expect(ys.yScale(0.2, 2.77)).toEqual([ 0, 0.5, 1, 1.5, 2, 2.5, 3 ]);
  });
  it("should scale for small range of bigger values", function() {
    expect(ys.yScale(19284, 19359)).toEqual([ 19275, 19300, 19325, 19350, 19375 ]);
  });
  it("should not return more than 11 values", function() {
    var result = ys.yScale(7.8,500);
    expect(result.length).toEqual(11);
    expect(result[0]).toEqual(0);
  });
});


