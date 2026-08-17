async function loadCSV(filePath, tableId, searchId = null, displayColumns = null, columnPickerId = null) {
  const response = await fetch(filePath);
  const text = await response.text();

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const data = parsed.data;
  const allHeaders = parsed.meta.fields;
  let visibleHeaders = displayColumns || allHeaders;

  const table = document.getElementById(tableId);
  let currentData = [...data];
  let sortColumn = null;
  let sortDirection = "asc";

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderTable(rows) {
    let html = "<thead><tr>";

    visibleHeaders.forEach(header => {
      html += `<th data-column="${escapeHTML(header)}">${escapeHTML(header)}</th>`;
    });

    html += "</tr></thead><tbody>";

    rows.forEach(row => {
      html += "<tr>";

      visibleHeaders.forEach(header => {
        html += `<td>${escapeHTML(row[header])}</td>`;
      });

      html += "</tr>";
    });

    html += "</tbody>";
    table.innerHTML = html;

    table.querySelectorAll("th").forEach(th => {
      th.addEventListener("click", () => {
        sortTable(th.dataset.column);
      });
    });
  }

  function sortTable(column) {
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

      if (valueA === "") return 1;
      if (valueB === "") return -1;

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }

      return sortDirection === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    renderTable(currentData);
  }

  function setupSearch() {
    if (!searchId) return;

    const searchBox = document.getElementById(searchId);

    searchBox.addEventListener("input", () => {
      const searchTerm = searchBox.value.toLowerCase();

      currentData = data.filter(row =>
        allHeaders.some(header =>
          String(row[header] ?? "").toLowerCase().includes(searchTerm)
        )
      );

      renderTable(currentData);
    });
  }

  function setupColumnPicker() {
    if (!columnPickerId) return;

    const picker = document.getElementById(columnPickerId);

    picker.innerHTML = allHeaders.map(header => {
      const checked = visibleHeaders.includes(header) ? "checked" : "";

      return `
        <label class="column-option">
          <input type="checkbox" value="${escapeHTML(header)}" ${checked}>
          ${escapeHTML(header)}
        </label>
      `;
    }).join("");

    picker.querySelectorAll("input").forEach(input => {
      input.addEventListener("change", () => {
        visibleHeaders = Array.from(picker.querySelectorAll("input:checked"))
          .map(checkbox => checkbox.value);

        renderTable(currentData);
      });
    });
  }

  renderTable(currentData);
  setupSearch();
  setupColumnPicker();
}
