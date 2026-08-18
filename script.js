async function loadCSV(
  filePath,
  tableId,
  searchId = null,
  displayColumns = null,
  columnPickerId = null,
  sortColumnId = null,
  sortDirectionId = null,
  filters = [],
  rowLimitId = null,
  ratingStatusId = null
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
  let rowLimit = 100;

  const columnWidths = {
    "Tier": "80px",
    "Rk": "70px",
    "Name": "240px",
    "OMDB_Plot": "420px",
    "Notes (Review)": "500px",
    "OMDB_Actors": "360px",
    "OMDB_Director": "220px",
    "OMDB_Genre": "220px",
    "Main Character(s)": "300px",
    "Side Characters": "300px",
    "Plot": "50px",
    "Main Character(s)": "50px",
    "Side Characters": "50px",
    "Emotion": "50px",
    "Dialogue (Writing)": "50px",
    "Purpose Met": "50px",
    "Cast": "50px",
    "Music & Sound": "50px",
    "Rewatch Value": "50px",
  };

  const columnFontSizes = {
    "Notes (Review)": "13px",
    "OMDB_Plot": "13px",
    "Plot": "12px",
    "Main Character(s)": "12px",
    "Side Characters": "12px",
    "Emotion": "12px",
    "Dialogue (Writing)": "12px",
    "Purpose Met": "12px",
    "Cast": "12px",
    "Music & Sound": "12px",
    "Rewatch Value": "12px",
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
  const factorColumns = [
  "Plot",
  "Main Character(s)",
  "Side Characters",
  "Emotion",
  "Dialogue (Writing)",
  "Purpose Met",
  "Cast",
  "Music & Sound",
  "Rewatch Value"
];

const factorColors = {
  "10":  { bg: "#11734b", text: "#ffffff" },
  "9.5": { bg: "#029458", text: "#ffffff" },
  "9":   { bg: "#5ea818", text: "#ffffff" },
  "8.5": { bg: "#b1d98b", text: "#11734b" },
  "8":   { bg: "#d4edbc", text: "#11734b" },
  "7.5": { bg: "#d1dd4a", text: "#473821" },
  "7":   { bg: "#dff08f", text: "#473821" },
  "6.5": { bg: "#efff82", text: "#473821" },
  "6":   { bg: "#f1f151", text: "#000000" },
  "5.5": { bg: "#fff375", text: "#473821" },
  "5":   { bg: "#ffe5a0", text: "#473821" },
  "4.5": { bg: "#e3bd60", text: "#7c4300" },
  "4":   { bg: "#d79900", text: "#753800" },
  "3.5": { bg: "#f8a67a", text: "#753800" },
  "3":   { bg: "#ffc8aa", text: "#753800" },
  "2.5": { bg: "#ffcfc9", text: "#b10202" },
  "2":   { bg: "#f86666", text: "#ffcfc9" },
  "1.5": { bg: "#b10202", text: "#ffcfc9" },
  "1":   { bg: "#5d0202", text: "#ffcfc9" },
  "0":   { bg: "#3d3d3d", text: "#e5e5e5" },
  "--":  { bg: "#e8e8e8", text: "#1a74a6" }
};

function normalizeFactorValue(value) {
  const text = String(value ?? "").trim();

  if (text === "") return "";
  if (text === "--") return "--";

  const num = Number(text);

  if (!isNaN(num)) {
    return Number.isInteger(num) ? String(num) : String(num);
  }

  return text;
}

function getFactorStyle(header, value) {
  if (!factorColumns.includes(header)) return "";

  const factorValue = normalizeFactorValue(value);
  const colors = factorColors[factorValue];

  if (!colors) return "";

  return `
    background-color: ${colors.bg};
    color: ${colors.text};
    font-weight: bold;
  `;
}
function getRatingColor(value) {
  const num = Number(String(value ?? "").replace(/,/g, "").trim());

  if (isNaN(num)) return "";

  const clamped = Math.max(0, Math.min(100, num));

  const redColor = { r: 204, g: 0, b: 0 };      // #cc0000
  const yellowColor = { r: 255, g: 217, b: 102 }; // #ffd966
  const greenColor = { r: 87, g: 187, b: 138 };   // #57bb8a

  let start;
  let end;
  let percent;

  if (clamped <= 50) {
    start = redColor;
    end = yellowColor;
    percent = clamped / 50;
  } else {
    start = yellowColor;
    end = greenColor;
    percent = (clamped - 50) / 50;
  }

  const r = Math.round(start.r + (end.r - start.r) * percent);
  const g = Math.round(start.g + (end.g - start.g) * percent);
  const b = Math.round(start.b + (end.b - start.b) * percent);

  return `
    background-color: rgb(${r}, ${g}, ${b});
    color: #000000;
    font-weight: bold;
  `;
}
  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
function formatHeader(header) {
  const headerBreaks = {
    "Main Character(s)": "Main<br>Character(s)",
    "Side Characters": "Side<br>Characters",
    "Dialogue (Writing)": "Dialogue<br>(Writing)",
    "Purpose Met": "Purpose<br>Met",
    "Music & Sound": "Music &<br>Sound",
    "Rewatch Value": "Rewatch<br>Value"
  };

  return headerBreaks[header] || escapeHTML(header);
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

  if (header === "My Rating") {
    return getRatingColor(value);
  }

  if (factorColumns.includes(header)) {
    return getFactorStyle(header, value);
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
    html += `<th data-column="${escapeHTML(header)}" style="${getColumnStyle(header)}">${formatHeader(header)}</th>`;    
    });

    html += "</tr></thead><tbody>";

    const rowsToShow = rowLimit === "all" ? rows : rows.slice(0, rowLimit);

      rowsToShow.forEach(row => {
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
    const clickedColumn = th.dataset.column;

    if (sortColumn === clickedColumn) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortColumn = clickedColumn;
      sortDirection = "asc";
    }

    const sortButton = sortDirectionId
      ? document.getElementById(sortDirectionId)
      : null;

    if (sortButton) {
      sortButton.textContent = sortDirection === "asc" ? "A–Z" : "Z–A";
    }

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
function isRanked(row) {
      const rating = String(row["My Rating"] ?? "").trim();
    
      return rating !== "" && rating !== "--";
    }
    
    function rowMatchesRatingStatus(row) {
      if (!ratingStatusId) return true;
    
      const ratingSelect = document.getElementById(ratingStatusId);
      if (!ratingSelect) return true;
    
      const status = ratingSelect.value;
    
      if (status === "ranked") {
        return isRanked(row);
      }
    
      if (status === "unranked") {
        return !isRanked(row);
      }
    
      return true;
    }
    
    function setupRatingStatusFilter() {
      if (!ratingStatusId) return;
    
      const ratingSelect = document.getElementById(ratingStatusId);
      if (!ratingSelect) return;
    
      ratingSelect.addEventListener("change", applyAllFiltersAndSort);
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
      rowMatchesSearch(row) &&
      rowMatchesFilters(row) &&
      rowMatchesRatingStatus(row)
    );

    applySort();
  }
function setupRowLimit() {
  if (!rowLimitId) return;

  const rowLimitSelect = document.getElementById(rowLimitId);
  if (!rowLimitSelect) return;

  rowLimit = rowLimitSelect.value === "all"
    ? "all"
    : Number(rowLimitSelect.value) || 100;

  rowLimitSelect.addEventListener("change", () => {
    rowLimit = rowLimitSelect.value === "all"
      ? "all"
      : Number(rowLimitSelect.value) || 100;

    renderTable(currentData);
  });
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
      sortSelect.value = sortColumn || "";
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

  function updateColumnPickerSelectAll() {
    if (!columnPickerId) return;

    const picker = document.getElementById(columnPickerId);
    const selectAllCheckbox = document.getElementById(`${columnPickerId}-select-all`);

    if (!picker || !selectAllCheckbox) return;

    const inputs = Array.from(picker.querySelectorAll("input"));
    const checkedCount = inputs.filter(input => input.checked).length;

    selectAllCheckbox.checked = inputs.length > 0 && checkedCount === inputs.length;
    selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < inputs.length;
  }

  function setupColumnPicker() {
    if (!columnPickerId) return;

    const picker = document.getElementById(columnPickerId);
    const selectAllCheckbox = document.getElementById(`${columnPickerId}-select-all`);

    if (!picker) return;

    picker.innerHTML = allHeaders.map(header => {
      const checked = visibleHeaders.includes(header) ? "checked" : "";

      return `
        <label class="filter-option">
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

        updateColumnPickerSelectAll();
        updateColumnSummary();
        updateSortDropdown();
        renderTable(currentData);
      });
    });

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", () => {
        const inputs = Array.from(picker.querySelectorAll("input"));

        inputs.forEach(input => {
          input.checked = selectAllCheckbox.checked;
        });

        visibleHeaders = Array.from(
          picker.querySelectorAll("input:checked")
        ).map(checkbox => checkbox.value);

        selectAllCheckbox.indeterminate = false;
        updateColumnSummary();
        updateSortDropdown();
        renderTable(currentData);
      });
    }

    updateColumnPickerSelectAll();
  }
function updateColumnSummary() {
  if (!columnPickerId) return;

  const dropdown = document.getElementById(`${columnPickerId}-dropdown`);
  const summary = document.getElementById("column-summary");
  const visibleSpan = document.getElementById("visible-columns-summary");
  const hiddenSpan = document.getElementById("hidden-columns-summary");

  if (!dropdown || !summary || !visibleSpan || !hiddenSpan) return;

  if (!dropdown.open) {
    summary.hidden = true;
    return;
  }

  const hiddenHeaders = allHeaders.filter(header => !visibleHeaders.includes(header));

  visibleSpan.textContent = visibleHeaders.length
    ? visibleHeaders.join("; ")
    : "None";

  hiddenSpan.textContent = hiddenHeaders.length
    ? hiddenHeaders.join("; ")
    : "None";

  summary.hidden = false;
}

function setupColumnSummaryToggle() {
  if (!columnPickerId) return;

  const dropdown = document.getElementById(`${columnPickerId}-dropdown`);
  if (!dropdown) return;

  dropdown.addEventListener("toggle", updateColumnSummary);
  updateColumnSummary();
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
setupColumnSummaryToggle();
setupFilters();
setupRowLimit();
setupRatingStatusFilter();

applyAllFiltersAndSort();
}
