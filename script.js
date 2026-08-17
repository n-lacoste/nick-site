async function loadCSV(
  filePath,
  tableId,
  searchId = null,
  displayColumns = null,
  columnPickerId = null,
  sortColumnId = null,
  sortDirectionId = null
) {
  const response = await fetch(filePath);
  const text = await response.text();

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const data = parsed.data.filter(row =>
    String(row["Name"] ?? "").trim() !== ""
  );

  const allHeaders = parsed.meta.fields;
  let visibleHeaders = displayColumns || allHeaders;

  const table = document.getElementById(tableId);
  let currentData = [...data];
  let sortColumn = visibleHeaders[0];
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
        sortColumn = th.dataset.column;
        applySort();
      });
    });
  }

  function applySort() {
    if (!sortColumn) return;

    currentData.sort((a, b) => {
      const valueA = String(a[sortColumn] ?? "").trim();
      const valueB = String(b[sortColumn] ?? "").trim();

      if (valueA === "") return 1;
      if (valueB === "") return -1;

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

      applySort();
    });
  }

  function updateSortDropdown() {
    if (!sortColumnId) return;

    const sortSelect = document.getElementById(sortColumnId);

    sortSelect.innerHTML = visibleHeaders.map(header => {
      const selected = header === sortColumn ? "selected" : "";
      return `<option value="${escapeHTML(header)}" ${selected}>${escapeHTML(header)}</option>`;
    }).join("");

    if (!visibleHeaders.includes(sortColumn)) {
      sortColumn = visibleHeaders[0];
      sortSelect.value = sortColumn;
    }
  }

  function setupSortControls() {
    if (!sortColumnId || !sortDirectionId) return;

    const sortSelect = document.getElementById(sortColumnId);
    const sortButton = document.getElementById(sortDirectionId);

    updateSortDropdown();

    sortSelect.addEventListener("change", () => {
      sortColumn = sortSelect.value;
      applySort();
    });

    sortButton.addEventListener("click", () => {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
      sortButton.textContent = sortDirection === "asc" ? "A–Z" : "Z–A";
      applySort();
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

        updateSortDropdown();
        renderTable(currentData);
      });
    });
  }

  renderTable(currentData);
  setupSearch();
  setupSortControls();
  setupColumnPicker();
}
