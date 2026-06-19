// 梦幻相册 - 后台管理脚本
var FORMATIONS = ["cloud","wall","heartRing","orbitCircle","waveBridge","spiral","diamond","cross","vortex","finale"];

function getDefaultData() {
  return {
    photos: [],
    settings: {
      logo: "WXY",
      chapterDuration: 5000,
      chapters: [
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
      ]
    }
  };
}
var data = getDefaultData();

function openDB() {
  return new Promise(function(resolve, reject) {
    var idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    if (!idb) { reject(new Error("浏览器不支持 IndexedDB")); return; }
    var r = idb.open("dreamy_album_db", 1);
    r.onupgradeneeded = function(e) {
      if (!e.target.result.objectStoreNames.contains("album_data"))
        e.target.result.createObjectStore("album_data");
    };
    r.onsuccess = function(e) { resolve(e.target.result); };
    r.onerror = function() { reject(new Error("无法打开数据库")); };
  });
}

function loadFromDB() {
  return openDB().then(function(db) {
    return new Promise(function(resolve) {
      var tx = db.transaction("album_data", "readonly");
      var req = tx.objectStore("album_data").get("data");
      req.onsuccess = function() { resolve(req.result); db.close(); };
      req.onerror = function() { resolve(null); db.close(); };
    });
  }).catch(function() { return null; });
}

function saveToDB(d) {
  return openDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction("album_data", "readwrite");
      tx.objectStore("album_data").put(d, "data");
      tx.oncomplete = function() { resolve(); db.close(); };
      tx.onerror = function() { reject(new Error("保存失败")); db.close(); };
    });
  });
}
var saveData = saveToDB;

function clearDB() {
  return openDB().then(function(db) {
    return new Promise(function(resolve) {
      var tx = db.transaction("album_data", "readwrite");
      tx.objectStore("album_data").clear();
      tx.oncomplete = function() { resolve(); db.close(); };
    });
  }).catch(function() {});
}

var toastTimer;
function showToast(msg) {
  var el = document.getElementById("toast");
  el.textContent = msg; el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { el.classList.remove("show"); }, 2500);
}

function triggerUpload() { document.getElementById("fileInput").click(); }

function handleFiles(files) {
  if (!files || files.length === 0) return;
  var promises = [];
  for (var i = 0; i < files.length; i++) {
    (function(file) {
      promises.push(new Promise(function(resolve) {
        var reader = new FileReader();
        reader.onload = function(e) {
          resolve({ dataUrl: e.target.result, caption: "", accent: "#ff69b4", name: file.name, size: file.size });
        };
        reader.readAsDataURL(file);
      }));
    })(files[i]);
  }
  Promise.all(promises).then(function(results) {
    data.photos = data.photos.concat(results);
    saveData(data).then(function() { renderPhotos(); showToast("已添加 " + results.length + " 张照片"); });
  });
}

function esc(s) { return (s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function renderPhotos() {
  var grid = document.getElementById("photoGrid");
  if (data.photos.length === 0) {
    grid.innerHTML = '<div class="empty">✨ 还没有照片，点击上方区域上传</div>';
    return;
  }
  var parts = [];
  for (var i = 0; i < data.photos.length; i++) {
    var p = data.photos[i];
    var cap = esc(p.caption);
    var sizeStr = p.size ? Math.round(p.size/1024)+"KB" : "";
    var disUp = i===0 ? " disabled" : "";
    var disDown = i===data.photos.length-1 ? " disabled" : "";
    var html = '<div class="photo-card">';
    html += '<span class="index">#'+(i+1)+'</span>';
    html += '<img src="'+p.dataUrl+'" alt="">';
    html += '<div class="info">';
    html += '<input type="text" value="'+cap+'" placeholder="照片文案..." onchange="updatePhoto('+i+',\u0027caption\u0027,this.value)">';
    html += '<div style="display:flex;align-items:center;gap:0.4rem;margin-top:0.3rem">';
    html += '<input type="color" value="'+p.accent+'" onchange="updatePhoto('+i+',\u0027accent\u0027,this.value)" title="主题色">';
    html += '<span style="font-size:0.7rem;color:rgba(255,255,255,0.3)">'+sizeStr+'</span>';
    html += '</div></div>';
    html += '<div class="actions">';
    html += '<button class="btn btn-sm" onclick="movePhoto('+i+',-1)"'+disUp+'>▲</button>';
    html += '<button class="btn btn-sm" onclick="movePhoto('+i+',1)"'+disDown+'>▼</button>';
    html += '<button class="btn btn-sm btn-danger" onclick="deletePhoto('+i+')">✕</button>';
    html += '</div></div>';
    parts.push(html);
  }
  grid.innerHTML = parts.join("");
}

function updatePhoto(index, field, value) { data.photos[index][field] = value; saveData(data); }

function movePhoto(index, dir) {
  var ni = index + dir; if (ni < 0 || ni >= data.photos.length) return;
  var tmp = data.photos[index]; data.photos[index] = data.photos[ni]; data.photos[ni] = tmp;
  saveData(data).then(function() { renderPhotos(); });
}

function deletePhoto(index) {
  if (!confirm("确定删除这张照片？")) return;
  data.photos.splice(index, 1); saveData(data).then(function() { renderPhotos(); });
}

function renderSettings() {
  var s = data.settings;
  document.getElementById("setLogo").value = s.logo;
  document.getElementById("setDuration").value = s.chapterDuration;
  var div = document.getElementById("chapterSettings");
  var parts = [];
  for (var i = 0; i < s.chapters.length; i++) {
    var ch = s.chapters[i];
    var h = '<div class="setting-card">';
    h += '<label>第'+(i+1)+'章 · 标题</label>';
    h += '<input type="text" value="'+esc(ch.title)+'" onchange="data.settings.chapters['+i+'].title=this.value">';
    h += '<label>文案第1行</label>';
    h += '<input type="text" value="'+esc(ch.texts[0]||"")+'" onchange="data.settings.chapters['+i+'].texts[0]=this.value">';
    h += '<label>文案第2行</label>';
    h += '<input type="text" value="'+esc(ch.texts[1]||"")+'" onchange="data.settings.chapters['+i+'].texts[1]=this.value">';
    h += '<label>队形</label><select onchange="data.settings.chapters['+i+'].formation=this.value">';
    for (var j = 0; j < FORMATIONS.length; j++) {
      var f = FORMATIONS[j];
      h += '<option value="'+f+'"'+(ch.formation===f?" selected":"")+'>'+f+'</option>';
    }
    h += '</select></div>';
    parts.push(h);
  }
  div.innerHTML = parts.join("");
}

function saveAll() {
  data.settings.logo = document.getElementById("setLogo").value;
  data.settings.chapterDuration = parseInt(document.getElementById("setDuration").value) || 5000;
  saveData(data).then(function() { showToast("✓ 全部设置已保存"); }).catch(function(e) { showToast("✗ 保存失败: " + e.message); });
}

function previewAlbum() { saveAll(); window.open("dreamy-album.html", "_blank"); }

function exportData() {
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], {type:"application/json"});
  var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "dreamy-album-backup-"+new Date().toISOString().slice(0,10)+".json"; a.click();
  showToast("📜 数据已导出");
}

function importData() {
  var input = document.createElement("input"); input.type = "file"; input.accept = ".json";
  input.onchange = function(e) {
    var file = e.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        if (!imported.photos || !imported.settings) throw new Error("格式错误");
        data = imported; saveData(data).then(function() { renderPhotos(); renderSettings(); showToast("📛 数据已导入"); });
      } catch(err) { showToast("✗ 文件格式不正确"); }
    };
    reader.readAsText(file);
  };
  input.click();
}

function clearAll() {
  if (!confirm("确定清空所有照片和设置？\n\n建议先导出数据备份。")) return;
  clearDB().then(function() { data = getDefaultData(); renderPhotos(); renderSettings(); showToast("已清空"); });
}

function debugStorage() {
  loadFromDB().then(function(d) {
    var info = d ? ("✓ 数据存在\n照片: "+(d.photos?d.photos.length:0)+" 张\n章节: "+(d.settings&&d.settings.chapters?d.settings.chapters.length:0)+" 个") : "✗ 无数据";
    if (d && d.photos) d.photos.forEach(function(p,i) { info += "\n  #"+(i+1)+": "+Math.round((p.dataUrl||"").length/1024)+"KB"; });
    alert(info);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var zone = document.getElementById("uploadZone");
  if (zone) {
    zone.addEventListener("dragover", function(e) { e.preventDefault(); zone.classList.add("dragover"); });
    zone.addEventListener("dragleave", function() { zone.classList.remove("dragover"); });
    zone.addEventListener("drop", function(e) { e.preventDefault(); zone.classList.remove("dragover"); handleFiles(e.dataTransfer.files); });
  }

  loadFromDB().then(function(saved) {
    if (saved && saved.photos) { data = saved; console.log("[后台] 从 IndexedDB 加载 " + data.photos.length + " 张照片"); }
    renderPhotos(); renderSettings();
  }).catch(function() { renderPhotos(); renderSettings(); });
});