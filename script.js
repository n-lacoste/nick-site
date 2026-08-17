async function loadCSV(filePath, tableId) {
  const response = await fetch(filePath);
  const text = await response.text();

  const rows = text.trim().split("\n").map(row => row.split(","));
  const headers = rows[0];
  const data = rows.slice(1);

  const table = document.getElementById(tableId);

  let html = "<thead><tr>";
  headers.forEach(header => {
    html += `<th>${header}</th>`;
  });
  html += "</tr></thead><tbody>";

  data.forEach(row => {
    html += "<tr>";
    row.forEach(cell => {
      html += `<td>${cell}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody>";
  table.innerHTML = html;
}
