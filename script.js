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
  let sortColumn = visibleHeaders.includes("Rk") ? "Rk" : visibleHeaders[0] || null;
  let sortDirection = "asc";

  const columnWidths = {
    "Tier": "80px",
    "Rk": "70px",
    "Name": "240px",
    "OMDB_Plot": "420px",
    "Plot": "420px",
    "Notes (Review)": "500px",
    "OMDB_Actors": "360px",
    "OMDB_Director": "220px",
    "OMDB_Genre": "220px",
    "Main Character(s)": "300px",
    "Side Characters": "300px"
  };

  const columnFontSizes = {
    "Notes (Review)": "13px",
    "Plot": "13px",
    "OMDB_Plot": "13px"
  };

  const tierColors = {
    "S":  { bg: "#efd1ff", text: "#5a3286" },
    "(S)": { bg: "#efd1ff", text: "#5a3286" },
    "A1": { bg: "#888ef5", text: "#473821" },
    "A2": { bg: "#5bc0dd", text: "#215a6c" },
    "A3": { bg: "#bfe1f6", text: "#0a53a8" },
    "B1": { bg: "#d4edbc", text: "#11734b" },
    "B2": { bg: "#ffe5a0", text: "#473821" },
    "B3": { bg: "#f0c885", text: "#000000" },
    "C1": { bg: "#ffc8aa", text: "#753800" },
    "C2": { bg: "#e38451", text: "#000000" },
    "C3": { bg: "#e36351", text: "#000000" },
    "D":  { bg: "#ff0000", text: "#000000" },
    "NR": { bg: "#ffcfc9", text: "#b10202" }
  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getColumnStyle(header) {
    let style = "";

    if (columnWidths[header]) {
      style += `min-width: ${columnWidths[header]}; max-width: ${columnWidths[header]};`;
    }

    if (columnFontSizes[header]) {
      style += ` font-size: ${columnFontSizes[header]};`;
    }

    return style;
  }

  function getConditionalStyle(header, value) {
    if (header === "Tier") {
      const tier = String(value ?? "").trim();
      const colors = tierColors[tier];

      if (colors) {
        return `
          background-color: ${colors.bg};
          color: ${colors.text};
          font-weight: bold;
        `;
      }
    }

    return "";
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
      html += `<th data-column="${escapeHTML(header)}" style="${getColumnStyle(header)}">${escapeHTML(header)}</th>`;
    });

    html += "</tr></thead><tbody>";

    rows.forEach(row => {
      html += "<tr>";

      visibleHeaders.forEach(header => {
        const cellStyle = `${getColumnStyle(header)} ${getConditionalStyle(header, row[header])}`;
        html += `<td style="${cellStyle}">${escapeHTML(row[header])}</td>`;
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
    if (!searchBox) return true;

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

      const inputs = Array.from(container.querySelectorAll("input"));
      const selectedValues = inputs
        .filter(input => input.checked)
        .map(input => input.value);

      if (inputs.length === 0) return true;
      if (selectedValues.length === inputs.length) return true;
      if (selectedValues.length === 0) return false;

      const rowValues = getFilterValues(row[filter.column]);

      if (filter.mode === "and") {
        return selectedValues.every(value => rowValues.includes(value));
      }

      return selectedValues.some(value => rowValues.includes(value));
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
    if (!searchBox) return;

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
      sortColumn = visibleHeaders.includes("Rk") ? "Rk" : visibleHeaders[0] || null;
      sortSelect.value = sortColumn;
    }
  }

  function setupSortControls() {
    if (!sortColumnId || !sortDirectionId) return;

    const sortSelect = document.getElementById(sortColumnId);
    const sortButton = document.getElementById(sortDirectionId);

    if (!sortSelect || !sortButton) return;

    updateSortDropdown();
    sortButton.textContent = sortDirection === "asc" ? "A–Z" : "Z–A";

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

  function updateFilterSelectAllCheckbox(filter) {
    if (!filter.selectAllId) return;

    const container = document.getElementById(filter.targetId);
    const selectAllCheckbox = document.getElementById(filter.selectAllId);

    if (!container || !selectAllCheckbox) return;

    const inputs = Array.from(container.querySelectorAll("input"));
    const checkedCount = inputs.filter(input => input.checked).length;

    selectAllCheckbox.checked = inputs.length > 0 && checkedCount === inputs.length;
    selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < inputs.length;
  }

  function updateFilterModeButton(filter) {
    if (!filter.modeButtonId) return;

    const button = document.getElementById(filter.modeButtonId);
    if (!button) return;

    button.textContent = filter.mode === "and"
      ? "MUST CONTAIN ALL"
      : "CONTAINS EITHER";
  }

  function setupFilters() {
    filters.forEach(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return;

      if (!filter.mode) {
        filter.mode = "or";
      }

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
        input.addEventListener("change", () => {
          updateFilterSelectAllCheckbox(filter);
          applyAllFiltersAndSort();
        });
      });

      if (filter.selectAllId) {
        const selectAllCheckbox = document.getElementById(filter.selectAllId);

        if (selectAllCheckbox) {
          selectAllCheckbox.addEventListener("change", () => {
            const inputs = Array.from(container.querySelectorAll("input"));

            inputs.forEach(input => {
              input.checked = selectAllCheckbox.checked;
            });

            selectAllCheckbox.indeterminate = false;
            applyAllFiltersAndSort();
          });
        }
      }

      if (filter.modeButtonId) {
        const modeButton = document.getElementById(filter.modeButtonId);

        if (modeButton) {
          modeButton.addEventListener("click", () => {
            filter.mode = filter.mode === "and" ? "or" : "and";

            updateFilterModeButton(filter);
            applyAllFiltersAndSort();
          });
        }
      }

      updateFilterSelectAllCheckbox(filter);
      updateFilterModeButton(filter);
    });
  }

  setupSearch();
  setupSortControls();
  setupColumnPicker();
  setupFilters();

  applyAllFiltersAndSort();
}
