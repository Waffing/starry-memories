// 梦幻相册 - 配置与默认数据
window.CAPTIONS = ["第一次遇见你，世界都亮了","你的笑容，是我见过最美的风景","那一瞬间，我就知道是你了","手牵手走过每一条街","我们的秘密基地","你认真时候的样子，我最喜欢","一起吃过的每一顿饭","阳光刚好，你也刚好","那次旅行，我们看了好多星星","你的侧脸，像一幅画","冬天有你就不再寒冷","因为有你，每一天都是节日","你睡着了，世界都安静了","我们的第一场电影","那些说不完的话题","每张照片都是时间的情书","你的眼睛里有着星辰大海","和你在一起的每一天都值得纪念","你是我写过最美的诗","一起数过的星星","你的温度，我永远记得","想和你一起慢慢变老","最美的不是风景，而是身边的你","余生请多指教"];
window.ACCENTS = ["#ff9999","#ffb3cc","#c9a0dc","#ffcc99","#99ccff","#ffaaaa","#ffd700","#ff69b4","#dda0dd","#f0e68c","#87ceeb","#ffb6c1","#b0c4de","#e6e6fa","#ffe4e1","#ffc0cb","#add8e6","#fff0f5","#d8bfd8","#f5deb3","#ffdab9","#e0ffff","#fffacd","#ffb6c1"];
window.DEFAULT_CHAPTERS = [
  {title:"星河初遇",texts:["把我们的回忆","放进一片星河"],formation:"cloud"},
  {title:"光影守护",texts:["愿你眼中的光","永远有我守护"],formation:"wall"},
  {title:"时光情书",texts:["每一张照片","都是时间写给我们的情书"],formation:"heartRing"},
  {title:"旋转回忆",texts:["我们的故事","像星辰环绕不息"],formation:"orbitCircle"},
  {title:"浪漫长廊",texts:["走过这条","属于我们的长廊"],formation:"waveBridge"},
  {title:"螺旋上升",texts:["我们的爱","盘旋而上直至永恒"],formation:"spiral"},
  {title:"钻石星辰",texts:["你是我生命里","最闪耀的钻石"],formation:"diamond"},
  {title:"十字誓约",texts:["以爱为名","许下不变的誓约"],formation:"cross"},
  {title:"时空漩涡",texts:["无论时间如何流转","我的心始终向你"],formation:"vortex"},
  {title:"永远",texts:["生日快乐 / 纪念日快乐","我一直都在 💕"],formation:"finale"}
];
window.CAMERA_TARGETS = {
  cloud:{pos:[0,0,14],look:[0,0,0]}, wall:{pos:[0,0.5,8],look:[0,0.5,0]},
  heartRing:{pos:[0,1,9],look:[0,0.5,0]}, orbitCircle:{pos:[0,3,8],look:[0,0,0]},
  waveBridge:{pos:[0,1.5,0],look:[0,0,-5]}, spiral:{pos:[0,0,10],look:[0,0,0]},
  diamond:{pos:[0,0,10],look:[0,0,0]}, cross:{pos:[0,0,10],look:[0,0,0]},
  vortex:{pos:[0,0,10],look:[0,0,0]}, finale:{pos:[0,0.5,10],look:[0,0.5,0]}
};
window.CARD_W = 1.0; window.CARD_H = 1.5; window.CARD_D = 0.06;
window.CHAPTER_DURATION = 5000;
