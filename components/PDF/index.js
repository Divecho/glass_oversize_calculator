import matchData from "../../core/matchData";
export function PdfData(items, name, mode) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  var table = '';
  var totalSqFt = 0;
  var totalASqFt = 0;
  var totalQty = 0;
  function convertMmToInch(mm) {
    return (mm * 0.03937).toFixed(2);
  }
  for (let i in items) {
    const item = items[i];
    let bHeight = item.height;
    let bWidth = item.width;
    if (mode === 'MM Mode') {
      bHeight = convertMmToInch(item.height)
      bWidth = convertMmToInch(item.width)
    }

    let aSqFt = bHeight * bWidth * item.qty / 144
    totalASqFt = totalASqFt + aSqFt;

    const bData = matchData(mode, bHeight, bWidth);
    
    let sqFt = bData.height * bData.width * item.qty / 144;
    totalSqFt = totalSqFt + sqFt;
    totalQty = totalQty + parseFloat(item.qty);

    let sno = parseFloat(i) + 1;
    table = table + `
      <tr>
        <td>${sno}</td>
        <td>
        ${item.height}
        ${mode === 'MM Mode' ? `<p>Inch. ${convertMmToInch(item.height)}</p>` : ''}
        </td>
        <td>
        ${item.width}
        ${mode === 'MM Mode' ? `<p>Inch. ${convertMmToInch(item.width)}</p>` : ''}
        </td>
        <td>${item.qty}</td>
        <td>${aSqFt.toFixed(3)}</td>
        <td>${sqFt}</td>
        <td>${item.variety}</td>
      </tr>
      `
  }
  const PdfData = `
    <style>
    table {
    width:80%;
    border-collapse: collapse;
    }
    table, th, td {
    border: 1px solid black;
    }
    td, th {
        text-align: left;
        padding: 8px;
      }
    tr:nth-child(even) {
    background-color: #dddddd;
    }
    tfoot {
      background-color: skyblue;
    }
    h1{
      text-align:center;
      font-size:80px,
    }
    </style>
    <body style="padding:10%;">
    <div>
    <div style="display:flex; justify-content:space-between;width:80%;clear:both;margin-bottom:20px;">
    <b>Date : ${formattedDate} </b>
    <b>${name}</b>
    </div>
    ${mode === 'MM Mode' ? `<b>Height & Width In millimeters(MM)</b>` : ''}
    </div>
    <table style="width:100%">
  <thead>
    <tr>
      <th>S.No.</th>
      <th>Height</th>
      <th>Width</th>
      <th>Qty</th>
      <th>Actual Sq.ft.</th>
      <th>Chargeable <br>Sq.ft.</th>
      <th>Variety</th>
    </tr>
  </thead>
  <tbody>
    ${table}
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total</td>
      <td></td>
      <td>${totalQty}</td>
      <td>${totalASqFt.toFixed(3)}</td>
      <td>${totalSqFt}</td>
      <td></td>
    </tr>
  </tfoot>
</table>
<div class="footer-note" style="margin-top:20px">
<b>Note*</b>
<p>*The size converted from mm to inches is not exact, it is the approximate size.</p>
<p>*The calculations seen are just suggestions, the final decision rests on one's own discretion.</p>
<p>*All Disputes are subject to jaipur jurisdictions.</p>
<p>*We accepts rates, our size margen (6 inches) etc.</p>
</div>
</body>`;
  return PdfData;
}