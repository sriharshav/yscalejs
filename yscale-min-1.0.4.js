/*
 Copyright 2012-2013 sriharsha vardhan (sriharsha.net)
*/
exports.a=function(c){var d,b,a,e,f;d=Math;a=d.floor(d.LOG10E*d.log(c));b=d.pow(10,a);f=(a=d.pow(10,a-1))?d.floor(c/a):0;e=d.floor(f%10);c=(b=20>f?c==b?a:2*a:30>f?5>e?2.5*a:5*a:50>f?5*a:c==5*b?5*a:b)?d.ceil((c>f*a?f+1:f)*a/b):0;if(b*c!==b*c)throw Error("Unknown error");return[b,c]};
exports.b=function(c,d){var b,a,e,f=[];b=d-c;a=this.a(b);a[0]*a[1]-b<=a[0]&&(a=this.a(b+a[0]));c<=a[0]&&(a=this.a(d));e=c-a[0];e=0>=e?0:e+(a[0]-e%a[0]);b=e+a[0]*a[1];b-a[0]>d&&(b-=a[0]);do f.push(e),e=Math.round(1E3*(e+a[0]))/1E3;while(e<=b);if(11<f.length)throw Error("Unknown error");return f};

