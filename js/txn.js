const peso = Intl.NumberFormat('en-US', {style: 'currency', currency: 'PHP'});
var  total = 0;

function txnHistory(txn) {
  let table = document.getElementById('txn_history'),
        row = table.insertRow(-1),
     col_ts = row.insertCell(0),
     col_mb = row.insertCell(1),
    col_amt = row.insertCell(2),
    txt_amt = document.createTextNode(txn.amt==0 ? 'FREE' : peso.format(txn.amt)),
     txt_mb = document.createTextNode(format_mb(txn.mb)),
     txt_ts = document.createTextNode(new Date(txn.ts).toLocaleString());

    col_amt.appendChild(txt_amt);
     col_mb.appendChild(txt_mb);
     col_ts.appendChild(txt_ts);
}

function txnSummary(txn) {
      total = total + txn.amt;
  let table = document.getElementById('txn_history'),
        row = table.insertRow(-1),
     col_ts = row.insertCell(0),
    col_amt = row.insertCell(1),
     col_tt = row.insertCell(2),
    txt_amt = document.createTextNode(txn.amt==0 ? 'FREE' : peso.format(txn.amt)),
     txt_tt = document.createTextNode(peso.format(total)),
     txt_ts = document.createTextNode(new Date(txn.ts).toLocaleString());

    col_amt.appendChild(txt_amt);
     col_tt.appendChild(txt_tt);
     col_ts.appendChild(txt_ts);
}

function notxn(){
  let table = document.getElementById('txn_history'),
        row = table.insertRow(-1),
      blank = row.insertCell(0);

      blank.setAttribute('colspan', 3);
      blank.appendChild(document.createTextNode('No Transaction History'));
}

function format_mb(size) {
  if( !size ) return size + 'MB';

  let base = Math.floor(Math.log(size) / Math.log(1024));
  let unit = ['MB','GB','TB','PB','EB','ZB','YB'];

  size = size / Math.pow(1024, base);
  size = Number.isInteger(size) ? size : parseFloat(size).toFixed(2);

  return size + unit[base];
}

function getDeviceTxn() {
  fetch('/api/txn.php').then((x) => x.json()).then((x) => { x.forEach((tx) => { tx.ts ? txnHistory(tx) : notxn(); }); });
}

function getTxnSummary() {
  fetch('/api/txn.php').then((x) => x.json()).then((x) => { x.forEach((tx) => { tx.ts ? txnSummary(tx) : notxn(); }); });
}

if( window.location.pathname == '/txn.html' ) {
  getDeviceTxn();
}

if( window.location.pathname == '/txn_summary.html' ) {
  getTxnSummary();
}
