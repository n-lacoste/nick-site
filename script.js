async function loadCSV(filePath, tableId, searchId = null) {
  const response = await fetch(filePath);
  const text = await response.text();

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const data = parsed.data;
  const headers = parsed.meta.fields;
  const table = document.getElementById(tableId);

  let currentData = [...data];
  let sortColumn = null;
  let sortDirection = "asc";

  function renderTable(rows) {
    let html = "<thead><tr>";

    headers.forEach(header => {
      html += `<th onclick="sortTable('${header}')">${header}</th>`;
    });

    html += "</tr></thead><tbody>";

    rows.forEach(row => {
      html += "<tr>";

      headers.forEach(header => {
        html += `<td>${row[header] ?? ""}</td>`;
      });

      html += "</tr>";
    });

    html += "</tbody>";
    table.innerHTML = html;
  }

  window.sortTable = function(column) {
    if (sortColumn === column) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortColumn = column;
      sortDirection = "asc";
    }

    currentData.sort((a, b) => {
      const valueA = a[column] ?? "";
      const valueB = b[column] ?? "";

      const numA = Number(valueA);
      const numB = Number(valueB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }

      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    renderTable(currentData);
  };

  renderTable(currentData);

  if (searchId) {
    const searchBox = document.getElementById(searchId);

    searchBox.addEventListener("input", () => {
      const searchTerm = searchBox.value.toLowerCase();

      currentData = data.filter(row =>
        headers.some(header =>
          String(row[header] ?? "").toLowerCase().includes(searchTerm)
        )
      );

      renderTable(currentData);
    });
  }
}
