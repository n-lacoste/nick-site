async function loadCSV(filePath, tableId, searchId = null) {
  const response = await fetch(filePath);
  const text = await response.text();

  const rows = text.trim().split("\n").map(row => row.split(","));
  const headers = rows[0];
  const data = rows.slice(1);

  const table = document.getElementById(tableId);

  function renderTable(filteredData) {
    let html = "<thead><tr>";

    headers.forEach(header => {
      html += `<th>${header}</th>`;
    });

    html += "</tr></thead><tbody>";

    filteredData.forEach(row => {
      html += "<tr>";
      row.forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody>";
    table.innerHTML = html;
  }

  renderTable(data);

  if (searchId) {
    const searchBox = document.getElementById(searchId);

    searchBox.addEventListener("input", () => {
      const searchTerm = searchBox.value.toLowerCase();

      const filteredData = data.filter(row =>
        row.join(" ").toLowerCase().includes(searchTerm)
      );

      renderTable(filteredData);
    });
  }
}
