@echo off
if %1 == max (node -e "var ys = require('./yscale'); console.log(ys.yScaleMax(%2));")
if %1 == scale (node -e "var ys = require('./yscale'); console.log(ys.yScale(%2, %3));")
@echo on