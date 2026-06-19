// 梦幻相册 - 纹理生成与加载
window.generatePlaceholderTexture = function(index, accentHex) {
  var size = 512, c = document.createElement("canvas");
  c.width = size; c.height = Math.round(size * 1.5);
  var ctx = c.getContext("2d");
  var colors = [["#1a0033","#330033"],["#2d0033","#1a0033"],["#330022","#220033"],["#2a1a33","#1a0a2e"],["#1a2a33","#0a1a2e"],["#331a2a","#2e0a1a"]];
  var g = ctx.createLinearGradient(0, 0, c.width, c.height);
  g.addColorStop(0, colors[index % 6][0]); g.addColorStop(1, colors[index % 6][1]);
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  var rg = ctx.createRadialGradient(c.width*0.5,c.height*0.4,10,c.width*0.5,c.height*0.4,c.width*0.6);
  rg.addColorStop(0, accentHex + "44"); rg.addColorStop(1, "transparent");
  ctx.fillStyle = rg; ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = accentHex + "33"; ctx.font = (c.width*0.15) + "px serif"; ctx.textAlign = "center";
  ctx.fillText("\u2665", c.width*0.25, c.height*0.3);
  ctx.fillText("\u2726", c.width*0.75, c.height*0.7);
  ctx.fillText("\u2665", c.width*0.6, c.height*0.85);
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = (c.width*0.12) + "px Georgia,serif";
  ctx.fillText("" + (index + 1), c.width*0.5, c.height*0.5);
  var tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearMipmapLinearFilter; tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true; tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

window.loadPhotoTexture = function(url, index, accentHex) {
  if (url && url.startsWith("data:")) {
    return new Promise(function(resolve) {
      var img = new Image();
      img.onload = function() {
        var c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        c.getContext("2d").drawImage(img, 0, 0);
        var tex = new THREE.CanvasTexture(c);
        tex.minFilter = THREE.LinearMipmapLinearFilter; tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true; tex.colorSpace = THREE.SRGBColorSpace;
        tex.userData = { imgW: img.width, imgH: img.height };
        resolve(tex);
      };
      img.onerror = function() { resolve(window.generatePlaceholderTexture(index, accentHex)); };
      img.src = url;
    });
  }
  return new Promise(function(resolve) {
    var img = new Image(); img.crossOrigin = "anonymous";
    var t = setTimeout(function() { resolve(window.generatePlaceholderTexture(index, accentHex)); }, 3000);
    img.onload = function() {
      clearTimeout(t);
      var c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
      c.getContext("2d").drawImage(img, 0, 0);
      var tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
      resolve(tex);
    };
    img.onerror = function() { clearTimeout(t); resolve(window.generatePlaceholderTexture(index, accentHex)); };
    img.src = url;
  });
};

window.loadPhotoImage = function(url, index, accentHex) {
  return new Promise(function(resolve) {
    var img = new Image(); img.crossOrigin = "anonymous";
    var t = setTimeout(function() { resolve(window.generatePlaceholderTexture(index, accentHex).source.data.toDataURL()); }, 3000);
    img.onload = function() { clearTimeout(t); resolve(url); };
    img.onerror = function() { clearTimeout(t); resolve(window.generatePlaceholderTexture(index, accentHex).source.data.toDataURL()); };
    img.src = url;
  });
};
