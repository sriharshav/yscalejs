var ys = require('../yscale-min-1.0.3');

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
    expect(ys.yScale(19284, 19359)).toEqual([ 19280, 19290, 19300, 19310, 19320, 19330, 19340, 19350, 19360 ]);
  });
  it("should scale for small range of bigger values", function() {
    expect(ys.yScale(52479, 52635)).toEqual([ 52460, 52480, 52500, 52520, 52540, 52560, 52580, 52600, 52620, 52640 ]);
  });
  it("should scale for bigger range of bigger values", function() {
    expect(ys.yScale(430, 1203)).toEqual([ 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300 ]);
  });
  it("should not return more than 11 values", function() {
    var result = ys.yScale(7.8,500);
    expect(result.length).toEqual(11);
    expect(result[0]).toEqual(0);
  });
});


