async function loadCSV(
  filePath,
  tableId,
  searchId = null,
  displayColumns = null,
  columnPickerId = null,
  sortColumnId = null,
  sortDirectionId = null,
  filters = []
) {
  const response = await fetch(filePath);
  const text = await response.text();

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const allHeaders = parsed.meta.fields || [];

  const data = parsed.data.filter(row => {
    // For movie data, ignore rows where Name is blank.
    // If a future CSV does not have a Name column, keep all non-empty rows.
    if (allHeaders.includes("Name")) {
      return String(row["Name"] ?? "").trim() !== "";
    }

    return allHeaders.some(header => String(row[header] ?? "").trim() !== "");
  });

  let visibleHeaders = displayColumns
    ? displayColumns.filter(column => allHeaders.includes(column))
    : allHeaders;

  const table = document.getElementById(tableId);

  let currentData = [...data];
  let sortColumn = visibleHeaders[0] || null;
  let sortDirection = "asc";

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getFilterValues(value) {
    return String(value ?? "")
      .split(/[;,|]/)
      .map(v => v.trim())
      .filter(v => v !== "");
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
        updateSortDropdown();
      });
    });
  }

  function applySort() {
    if (!sortColumn) {
      renderTable(currentData);
      return;
    }

    currentData.sort((a, b) => {
      const valueA = String(a[sortColumn] ?? "").trim();
      const valueB = String(b[sortColumn] ?? "").trim();

      if (valueA === "" && valueB === "") return 0;
      if (valueA === "") return 1;
      if (valueB === "") return -1;

      const numA = Number(valueA.replace(/,/g, ""));
      const numB = Number(valueB.replace(/,/g, ""));

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }

      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    renderTable(currentData);
  }

  function rowMatchesSearch(row) {
    if (!searchId) return true;

    const searchBox = document.getElementById(searchId);
    const searchTerm = searchBox.value.toLowerCase().trim();

    if (searchTerm === "") return true;

    return allHeaders.some(header =>
      String(row[header] ?? "").toLowerCase().includes(searchTerm)
    );
  }

  function rowMatchesFilters(row) {
    return filters.every(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return true;

      const selectedValues = Array.from(
        container.querySelectorAll("input:checked")
      ).map(input => input.value);

      // If nothing is selected in this filter, show no rows for that filter.
      if (selectedValues.length === 0) return false;

      const rowValues = getFilterValues(row[filter.column]);

      return rowValues.some(value => selectedValues.includes(value));
    });
  }

  function applyAllFiltersAndSort() {
    currentData = data.filter(row =>
      rowMatchesSearch(row) && rowMatchesFilters(row)
    );

    applySort();
  }

  function setupSearch() {
    if (!searchId) return;

    const searchBox = document.getElementById(searchId);
    searchBox.addEventListener("input", applyAllFiltersAndSort);
  }

  function updateSortDropdown() {
    if (!sortColumnId) return;

    const sortSelect = document.getElementById(sortColumnId);
    if (!sortSelect) return;

    sortSelect.innerHTML = visibleHeaders.map(header => {
      const selected = header === sortColumn ? "selected" : "";
      return `<option value="${escapeHTML(header)}" ${selected}>${escapeHTML(header)}</option>`;
    }).join("");

    if (!visibleHeaders.includes(sortColumn)) {
      sortColumn = visibleHeaders[0] || null;
      sortSelect.value = sortColumn;
    }
  }

  function setupSortControls() {
    if (!sortColumnId || !sortDirectionId) return;

    const sortSelect = document.getElementById(sortColumnId);
    const sortButton = document.getElementById(sortDirectionId);

    if (!sortSelect || !sortButton) return;

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
    if (!picker) return;

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
        visibleHeaders = Array.from(
          picker.querySelectorAll("input:checked")
        ).map(checkbox => checkbox.value);

        updateSortDropdown();
        renderTable(currentData);
      });
    });
  }

  function setupFilters() {
    filters.forEach(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return;

      const uniqueValues = Array.from(
        new Set(
          data.flatMap(row => getFilterValues(row[filter.column]))
        )
      ).sort((a, b) => a.localeCompare(b));

      container.innerHTML = uniqueValues.map(value => `
        <label class="filter-option">
          <input type="checkbox" value="${escapeHTML(value)}" checked>
          ${escapeHTML(value)}
        </label>
      `).join("");

      container.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", applyAllFiltersAndSort);
      });
    });
  }

  setupSearch();
  setupSortControls();
  setupColumnPicker();
  setupFilters();

  applyAllFiltersAndSort();
}
