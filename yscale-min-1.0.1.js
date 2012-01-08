/*
 Copyright 2012 sriharsha vardhan (sriharsha.net)
*/
exports.yScaleMax=function(d){var e,a=Math,b=a.floor(a.LOG10E*a.log(d));e=a.pow(10,b);var b=a.pow(10,b-1),c=a.floor(d/b),f=a.floor(c%10);e=20>c?d==e?b:2*b:30>c?5>f?2.5*b:5*b:50>c?5*b:d==5*e?5*b:e;d=a.ceil((d>c*b?c+1:c)*b/e);if(e*d!=e*d)throw Error("Unknown error");return[e,d]};
exports.yScale=function(d,e){var a,b,c,f=[];a=this.yScaleMax(e);a=this.yScaleMax(a[0]*a[1]-d);c=Math.floor(d/a[0])*a[0];b=Math.ceil(e/a[0])*a[0];a=this.yScaleMax(b-c);c=Math.floor(d/a[0])*a[0];b=Math.ceil(e/a[0])*a[0];do f.push(c),c=Math.round(1E3*(c+a[0]))/1E3;while(c<=b);if(11<f.length)throw Error("Unknown error");return f};
