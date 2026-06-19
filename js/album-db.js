// 梦幻相册 - IndexedDB 操作
window.loadFromDB = function() {
  return new Promise(function(resolve) {
    var idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    if (!idb) { resolve(null); return; }
    try {
      var r = idb.open("dreamy_album_db", 1);
      r.onupgradeneeded = function(e) {
        if (!e.target.result.objectStoreNames.contains("album_data"))
          e.target.result.createObjectStore("album_data");
      };
      r.onsuccess = function(e) {
        var db = e.target.result;
        try {
          var tx = db.transaction("album_data", "readonly");
          var req = tx.objectStore("album_data").get("data");
          req.onsuccess = function() { resolve(req.result); db.close(); };
          req.onerror = function() { resolve(null); db.close(); };
        } catch(e2) { resolve(null); db.close(); }
      };
      r.onerror = function() { resolve(null); };
    } catch(e) { resolve(null); }
  });
};
