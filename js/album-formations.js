// 梦幻相册 - 3D 队形位置计算
window.getFormationPositions = function(type, count) {
  var results = [];
  var seed = function(i) { return (Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1; };
  switch (type) {
    case "cloud":
      var r = 9;
      for (var i = 0; i < count; i++) {
        var phi = Math.acos(1 - 2 * (i + 0.5) / count),
            theta = Math.PI * (1 + Math.sqrt(5)) * i,
            rad = r * (0.55 + 0.45 * ((i * 7) % 100) / 100);
        results.push({pos:[rad*Math.sin(phi)*Math.cos(theta),rad*Math.sin(phi)*Math.sin(theta),rad*Math.cos(phi)],
          rot:[(seed(i*7)-0.5)*0.5,(seed(i*7+1)-0.5)*0.5,(seed(i*7+2)-0.5)*0.3],scl:0.7+seed(i*5)*0.6});
      }
      break;
    case "wall":
      var cols = 6, sx = window.CARD_W * 1.2, sy = window.CARD_H * 1.15,
          tw = (cols - 1) * sx, rows = Math.ceil(count / cols), th = (rows - 1) * sy;
      for (var i = 0; i < count; i++) {
        var col = i % cols, row = Math.floor(i / cols);
        results.push({pos:[col*sx-tw/2,-(row*sy-th/2),0],rot:[0,0,0],scl:0.85});
      }
      break;
    case "heartRing":
      var s = 4;
      for (var i = 0; i < count; i++) {
        var t = (i / count) * Math.PI * 2,
            x = 16*Math.pow(Math.sin(t),3),
            y = 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t),
            dx = 48*Math.pow(Math.sin(t),2)*Math.cos(t),
            dy = -13*Math.sin(t)+10*Math.sin(2*t)+6*Math.sin(3*t)+4*Math.sin(4*t);
        results.push({pos:[x/16*s,y/16*s,(i%3-1)*0.5],rot:[0,0,-Math.atan2(dy,dx)+Math.PI/2],scl:0.7});
      }
      break;
    case "orbitCircle":
      var r = 5;
      for (var i = 0; i < count; i++) {
        var a = (i / count) * Math.PI * 2;
        results.push({pos:[Math.cos(a)*r,0,Math.sin(a)*r],rot:[0,-a+Math.PI,0],scl:0.85});
      }
      break;
    case "waveBridge":
      var len = 10;
      for (var i = 0; i < count; i++) {
        var t = (i / (count - 1)) * len - len / 2;
        results.push({pos:[Math.cos(t*0.3)*3,Math.sin(t*1.2)*2,t],rot:[0,-Math.PI/2+Math.cos(t*0.3)*0.3,0],scl:0.8});
      }
      break;
    case "spiral":
      var h = 8, r2 = 4;
      for (var i = 0; i < count; i++) {
        var t = i / count, a = t * Math.PI * 6, rad = r2 * (0.3 + t * 0.7);
        results.push({pos:[Math.cos(a)*rad,-h/2+t*h,Math.sin(a)*rad],rot:[0,-a+Math.PI/2,0],scl:0.65+t*0.35});
      }
      break;
    case "diamond":
      var n = Math.ceil(Math.sqrt(count)), sp = 1.3;
      for (var i = 0; i < count; i++) {
        var row = Math.floor(i/n), col = i % n, cx = (col-(n-1)/2)*sp, cy = (row-(n-1)/2)*sp;
        results.push({pos:[cx,-cy*0.7,Math.abs(cx)*0.3+Math.abs(cy)*0.3],rot:[0,0,0],scl:0.75});
      }
      break;
    case "cross":
      var span = 8, half = Math.floor(count / 2);
      for (var i = 0; i < count; i++) {
        if (i < half) {
          var t = (i / (half - 1)) * span - span / 2;
          results.push({pos:[t,0,0],rot:[0,0,0],scl:0.8});
        } else {
          var t = ((i - half) / (count - half - 1)) * span - span / 2;
          results.push({pos:[0,-t,0],rot:[0,0,0],scl:0.8});
        }
      }
      break;
    case "vortex":
      var vh = 8, maxR = 5;
      for (var i = 0; i < count; i++) {
        var t = i / count, a = t * Math.PI * 8, rad = maxR * (1 - t) * 0.8 + 0.5;
        results.push({pos:[Math.cos(a)*rad,-vh/2+t*vh,Math.sin(a)*rad],rot:[(Math.random()-0.5)*0.3,(Math.random()-0.5)*0.3,0],scl:0.6+t*0.4});
      }
      break;
    case "finale":
      var s = 5;
      for (var i = 0; i < count; i++) {
        var t = (i / count) * Math.PI * 2 + Math.PI,
            x = 16*Math.pow(Math.sin(t),3),
            y = 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
        results.push({pos:[x/16*s,y/16*s,(i%3-1)*0.3],rot:[0,0,0],scl:0.75});
      }
      break;
  }
  return results;
};
