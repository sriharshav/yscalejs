/*
 Copyright 2012 sriharsha vardhan (sriharsha.net)
*/
exports.yScaleMax=function(c){var d,b,a,e,f;d=Math;a=d.floor(d.LOG10E*d.log(c));b=d.pow(10,a);a=d.pow(10,a-1);f=d.floor(c/a);e=d.floor(f%10);b=20>f?c==b?a:2*a:30>f?5>e?2.5*a:5*a:50>f?5*a:c==5*b?5*a:b;c=d.ceil((c>f*a?f+1:f)*a/b);if(b*c!==b*c)throw Error("Unknown error");return[b,c]};
exports.yScale=function(c,d){var b,a,e,f=[];b=d-c;a=this.yScaleMax(b);a[0]*a[1]-b<=a[0]&&(a=this.yScaleMax(b+a[0]));c<=a[0]&&(a=this.yScaleMax(d));e=c-a[0];e=0>=e?0:e+(10-e%10);b=e+a[0]*a[1];b-a[0]>d&&(b-=a[0]);do f.push(e),e=Math.round(1E3*(e+a[0]))/1E3;while(e<=b);if(11<f.length)throw Error("Unknown error");return f};
