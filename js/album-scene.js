// 梦幻相册 - 场景辅助函数 (THREE 通过 window.THREE 访问)
// 注: 此文件依赖 THREE 全局变量，需在 importmap 加载 THREE 后执行

window._albumHelpers = {
  // 更新队形 - 由主模块调用
  updateFormation: function(cardGroups, currentChapter) {
    var CHAPTERS = window.CHAPTERS || window.DEFAULT_CHAPTERS;
    var pos = window.getFormationPositions(CHAPTERS[currentChapter].formation, cardGroups.length);
    cardGroups.forEach(function(g, i) {
      var t = pos[i] || pos[0];
      g.userData.targetPos.set(t.pos[0], t.pos[1], t.pos[2]);
      g.userData.targetRot.set(t.rot[0], t.rot[1], t.rot[2]);
      g.userData.targetScl = t.scl;
    });
  },

  // 创建星空粒子
  createStars: function(scene) {
    var THREE = window.THREE;
    var sg = new THREE.BufferGeometry(), sp = new Float32Array(600 * 3), sc = new Float32Array(600 * 3);
    for (var i = 0; i < 600; i++) {
      sp[i*3]=(Math.random()-0.5)*30; sp[i*3+1]=(Math.random()-0.5)*20; sp[i*3+2]=(Math.random()-0.5)*20-5;
      sc[i*3]=0.7+Math.random()*0.3; sc[i*3+1]=0.5+Math.random()*0.2; sc[i*3+2]=0.8+Math.random()*0.3;
    }
    sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    sg.setAttribute("color", new THREE.BufferAttribute(sc, 3));
    var stars = new THREE.Points(sg, new THREE.PointsMaterial({size:0.04,vertexColors:true,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending,depthWrite:false}));
    scene.add(stars);
    return stars;
  },

  // 创建爱心粒子
  createHearts: function(scene) {
    var THREE = window.THREE;
    var hg = new THREE.BufferGeometry(), hp = new Float32Array(40 * 3);
    for (var i = 0; i < 40; i++) {
      hp[i*3]=(Math.random()-0.5)*25; hp[i*3+1]=(Math.random()-0.5)*15; hp[i*3+2]=(Math.random()-0.5)*15-3;
    }
    hg.setAttribute("position", new THREE.BufferAttribute(hp, 3));
    var hearts = new THREE.Points(hg, new THREE.PointsMaterial({size:0.12,color:0xff6b9d,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending,depthWrite:false}));
    scene.add(hearts);
    return hearts;
  },

  // 创建灯光
  createLights: function(scene) {
    var THREE = window.THREE;
    scene.add(new THREE.AmbientLight(0x442244, 0.3));
    var pl1 = new THREE.PointLight(0xff99cc, 0.5, 30); pl1.position.set(10, 10, 10); scene.add(pl1);
    var pl2 = new THREE.PointLight(0x9988ff, 0.3, 30); pl2.position.set(-10, -5, -10); scene.add(pl2);
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5));
  }
};
