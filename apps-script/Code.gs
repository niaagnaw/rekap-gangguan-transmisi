/**
 * Rekap Gangguan Transmisi - penghubung database bersama (Google Apps Script)
 * Cara pakai: lihat langkah di chat. Ganti 3 nilai di bawah ini.
 */
var SS_ID = 'GANTI_DENGAN_ID_SPREADSHEET';
var TAB = 'Halaman 3';
var PIN = 'GANTI_DENGAN_PIN_ANDA';

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function sheet() {
  return SpreadsheetApp.openById(SS_ID).getSheetByName(TAB);
}

// Baca semua data (terbuka untuk siapa pun yang punya link)
function doGet(e) {
  var s = sheet();
  var n = s.getLastRow();
  var v = n >= 2 ? s.getRange(2, 1, n - 1, 11).getDisplayValues() : [];
  return out({ values: v });
}

// Tulis data (wajib PIN)
function doPost(e) {
  var b;
  try { b = JSON.parse(e.postData.contents); } catch (x) { return out({ error: 'data_tidak_valid' }); }
  if (b.pin !== PIN) return out({ error: 'pin_salah' });
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var s = sheet();
    var vals = b.values || [];
    if (b.action === 'append') {
      var row = Math.max(s.getLastRow(), 1) + 1;
      s.getRange(row, 1, 1, vals.length).setValues([vals]);
      return out({ row: row });
    }
    if (b.action === 'update') {
      var r = Number(b.row);
      if (!(r >= 2)) return out({ error: 'baris_salah' });
      s.getRange(r, Number(b.col) || 1, 1, vals.length).setValues([vals]);
      return out({ ok: true });
    }
    return out({ error: 'aksi_tidak_dikenal' });
  } finally {
    lock.releaseLock();
  }
}
