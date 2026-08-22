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
    return allHeaders.some(header => {
      return String(row[header] ?? "").trim() !== "";
    });
  });

  let visibleHeaders = displayColumns
    ? displayColumns.filter(column => allHeaders.includes(column))
    : allHeaders;

  const table = document.getElementById(tableId);

  const safeFilters = Array.isArray(filters)
    ? filters.filter(filter => filter && filter.targetId && filter.column)
    : [];

  let currentData = [...data];
  let sortColumn = visibleHeaders.includes("Rk") ? "Rk" : visibleHeaders[0] || null;
  let sortDirection = "asc";
  let rowLimit = 25;

  const expandableColumns = ["Notes (Review)", "OMDB_Plot"];
  let expandedCellCounter = 0;
  const expandedCellStore = {};

  const columnWidths = {
    "Tier": "80px",
    "Rk": "70px",
    "Name": "240px",
    "Me vs. IMDB": "65px",
    "Tags": "150px",
    "Movie Series?": "120px",

    "Plot": "50px",
    "Main Character(s)": "50px",
    "Side Characters": "50px",
    "Emotion": "50px",
    "Dialogue (Writing)": "50px",
    "Purpose Met": "50px",
    "Cast": "50px",
    "Music & Sound": "50px",
    "Rewatch Value": "50px",

    "Notes (Review)": "500px",
    "OMDB_Plot": "420px",
    "OMDB_Actors": "180px",
    "OMDB_Director": "150px",
    "OMDB_Genre": "150px"
  };

  const cellFontSizes = {
    "Notes (Review)": "13px",
    "OMDB_Plot": "13px",
    "Tags": "13px",
    "Movie Series?": "13px",
    "OMDB_Genre": "13px",
    "OMDB_Director": "13px",
    "OMDB_Actors": "13px"
  };

  const factorHeaderFontSize = "12px";

  const compactHeaderColumns = [
    "Main Character(s)",
    "Side Characters",
    "Dialogue (Writing)"
  ];

  const tierColors = {
    "S": { bg: "#efd1ff", text: "#5a3286" },
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
    "D": { bg: "#ff0000", text: "#000000" },
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

  const factorColumnWidths = {
    "Plot": { min: "65px", max: "70px" },
    "Main Character(s)": { min: "75px", max: "85px" },
    "Side Characters": { min: "70px", max: "85px" },
    "Emotion": { min: "65px", max: "75px" },
    "Dialogue (Writing)": { min: "75px", max: "90px" },
    "Purpose Met": { min: "65px", max: "80px" },
    "Cast": { min: "65px", max: "75px" },
    "Music & Sound": { min: "70px", max: "85px" },
    "Rewatch Value": { min: "70px", max: "85px" }
  };

  const factorColors = {
    "10": { bg: "#11734b", text: "#ffffff" },
    "9.5": { bg: "#029458", text: "#ffffff" },
    "9": { bg: "#5ea818", text: "#ffffff" },
    "8.5": { bg: "#b1d98b", text: "#11734b" },
    "8": { bg: "#d4edbc", text: "#11734b" },
    "7.5": { bg: "#d1dd4a", text: "#473821" },
    "7": { bg: "#dff08f", text: "#473821" },
    "6.5": { bg: "#efff82", text: "#473821" },
    "6": { bg: "#f1f151", text: "#000000" },
    "5.5": { bg: "#fff375", text: "#473821" },
    "5": { bg: "#ffe5a0", text: "#473821" },
    "4.5": { bg: "#e3bd60", text: "#7c4300" },
    "4": { bg: "#d79900", text: "#753800" },
    "3.5": { bg: "#f8a67a", text: "#753800" },
    "3": { bg: "#ffc8aa", text: "#753800" },
    "2.5": { bg: "#ffcfc9", text: "#b10202" },
    "2": { bg: "#f86666", text: "#ffcfc9" },
    "1.5": { bg: "#b10202", text: "#ffcfc9" },
    "1": { bg: "#5d0202", text: "#ffcfc9" },
    "0": { bg: "#3d3d3d", text: "#e5e5e5" },
    "--": { bg: "#e8e8e8", text: "#1a74a6" }
  };

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
      "Me vs. IMDB": "vs.<br>IMDB",
      "Movie Series?": "Movie Series",
      "Main Character(s)": "Main<br>Character(s)",
      "Side Characters": "Side<br>Characters",
      "Dialogue (Writing)": "Dialogue<br>(Writing)",
      "Purpose Met": "Purpose<br>Met",
      "Music & Sound": "Music &<br>Sound",
      "Rewatch Value": "Rewatch<br>Value"
    };

    return headerBreaks[header] || escapeHTML(header);
  }

  function formatCellValue(header, value) {
    const text = String(value ?? "");

    if (header === "Tags") {
      return text
        .split(/[;,|]/)
        .map(tag => tag.trim())
        .filter(tag => tag !== "")
        .map(tag => escapeHTML(tag))
        .join("<br>");
    }

    return escapeHTML(text);
  }

  function getColumnWidthStyle(header) {
    let style = "";

    if (factorColumns.includes(header)) {
      const widths = factorColumnWidths[header] || {
        min: "65px",
        max: "80px"
      };

      style += `
        width: ${widths.min};
        min-width: ${widths.min};
        max-width: ${widths.max};
      `;

      return style;
    }

    if (columnWidths[header]) {
      style += `
        width: ${columnWidths[header]};
        min-width: ${columnWidths[header]};
        max-width: ${columnWidths[header]};
      `;
    }

    return style;
  }

  function getHeaderStyle(header) {
    let style = getColumnWidthStyle(header);

    if (factorColumns.includes(header)) {
      style += `
        font-size: ${factorHeaderFontSize};
        line-height: 1.1;
      `;
    }

    if (compactHeaderColumns.includes(header)) {
      style += `
        padding-left: 4px;
        padding-right: 4px;
      `;
    }

    return style;
  }

  function getCellStyle(header) {
    let style = getColumnWidthStyle(header);

    if (factorColumns.includes(header)) {
      style += `
        font-size: 16px;
        line-height: 1;
      `;
    } else if (header === "My Rating") {
      style += `
        font-size: 20px;
        line-height: 1;
      `;
    } else if (cellFontSizes[header]) {
      style += ` font-size: ${cellFontSizes[header]};`;
    }

    return style;
  }

  function getRatingColor(value) {
    const num = Number(String(value ?? "").replace(/,/g, "").trim());

    if (isNaN(num)) return "";

    const clamped = Math.max(0, Math.min(100, num));

    const redColor = { r: 204, g: 0, b: 0 };
    const yellowColor = { r: 255, g: 217, b: 102 };
    const greenColor = { r: 87, g: 187, b: 138 };

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

  function getFilterValuesForRow(row, filter) {
    const rawValue = String(row[filter.column] ?? "").trim();

    if (filter.filterType === "watchedStatus") {
      const normalized = rawValue.toLowerCase();

      if (normalized === "watched") {
        return ["Watched"];
      }

      if (normalized === "unwatched") {
        return ["Unwatched"];
      }

      return [];
    }

    if (rawValue === "" && filter.blankLabel) {
      return [filter.blankLabel];
    }

    return getFilterValues(rawValue);
  }

  function clearExpandedCellStore() {
    expandedCellCounter = 0;

    Object.keys(expandedCellStore).forEach(key => {
      delete expandedCellStore[key];
    });
  }

  function renderExpandableCell(header, value) {
    const text = String(value ?? "").trim();

    if (text === "") return "";

    const cellId = `cell-${expandedCellCounter++}`;

    expandedCellStore[cellId] = {
      title: header,
      text: text
    };

    return `
      <div class="expandable-cell">
        <button class="cell-expand-button" type="button" data-cell-id="${cellId}">+</button>
        <span class="cell-preview">${escapeHTML(text)}</span>
      </div>
    `;
  }

  function setupExpandableCells() {
    table.querySelectorAll(".cell-expand-button").forEach(button => {
      button.addEventListener("click", () => {
        const cellData = expandedCellStore[button.dataset.cellId];
        if (!cellData) return;

        const modal = document.getElementById("cell-modal");
        const modalTitle = document.getElementById("cell-modal-title");
        const modalText = document.getElementById("cell-modal-text");

        if (!modal || !modalTitle || !modalText) return;

        modalTitle.textContent = cellData.title;
        modalText.textContent = cellData.text;
        modal.hidden = false;
      });
    });

    const closeButton = document.getElementById("cell-modal-close");
    const modal = document.getElementById("cell-modal");

    if (closeButton && modal && !closeButton.dataset.ready) {
      closeButton.addEventListener("click", () => {
        modal.hidden = true;
      });

      modal.addEventListener("click", event => {
        if (event.target === modal) {
          modal.hidden = true;
        }
      });

      closeButton.dataset.ready = "true";
    }
  }

  function renderTable(rows) {
    clearExpandedCellStore();

    let html = "<thead><tr>";

    visibleHeaders.forEach(header => {
      html += `<th data-column="${escapeHTML(header)}" style="${getHeaderStyle(header)}">${formatHeader(header)}</th>`;
    });

    html += "</tr></thead><tbody>";

    const rowsToShow = rowLimit === "all" ? rows : rows.slice(0, rowLimit);
    const rowCount = document.getElementById("movies-row-count");

    if (rowCount) {
      rowCount.textContent = `Showing ${rowsToShow.length} of ${rows.length} matches.`;
    }

    rowsToShow.forEach(row => {
      html += "<tr>";

      visibleHeaders.forEach(header => {
        const cellStyle = `${getCellStyle(header)} ${getConditionalStyle(header, row[header])}`;

        const cellContent = expandableColumns.includes(header)
          ? renderExpandableCell(header, row[header])
          : formatCellValue(header, row[header]);

        html += `<td style="${cellStyle}">${cellContent}</td>`;
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

    setupExpandableCells();
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

  function rowMatchesFilters(row) {
    return safeFilters.every(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return true;

      const inputs = Array.from(container.querySelectorAll("input"));
      const selectedValues = inputs
        .filter(input => input.checked)
        .map(input => input.value);

      if (inputs.length === 0) return true;
      if (selectedValues.length === inputs.length) return true;
      if (selectedValues.length === 0) return false;

      const rowValues = getFilterValuesForRow(row, filter);

      if (filter.mode === "and") {
        return selectedValues.every(value => rowValues.includes(value));
      }

      return selectedValues.some(value => rowValues.includes(value));
    });
  }

  function rowMatchesAdvancedInputs(row) {
    const sampleInput = document.getElementById("sample-filter");
    const yearStartInput = document.getElementById("year-start-filter");
    const yearEndInput = document.getElementById("year-end-filter");
    const minsModeInput = document.getElementById("mins-mode-filter");
    const minsValueInput = document.getElementById("mins-value-filter");

    const sampleTerm = sampleInput ? sampleInput.value.trim().toLowerCase() : "";

    if (sampleTerm !== "") {
      const sampleText = [
        row["Name"],
        row["Tags"],
        row["Movie Series?"],
        row["OMDB_Genre"],
        row["OMDB_Director"],
        row["OMDB_Actors"],
        row["OMDB_Plot"],
        row["Notes (Review)"]
      ]
        .map(value => String(value ?? "").toLowerCase())
        .join(" ");

      if (!sampleText.includes(sampleTerm)) {
        return false;
      }
    }

    const yearStartText = yearStartInput ? yearStartInput.value.trim() : "";
    const yearEndText = yearEndInput ? yearEndInput.value.trim() : "";

    if (yearStartText !== "" || yearEndText !== "") {
      const yearText = String(row["Year"] ?? "").trim();
      const year = Number(yearText);

      if (yearText === "" || isNaN(year)) {
        return false;
      }

      if (yearStartText !== "") {
        const yearStart = Number(yearStartText);

        if (!isNaN(yearStart) && year < yearStart) {
          return false;
        }
      }

      if (yearEndText !== "") {
        const yearEnd = Number(yearEndText);

        if (!isNaN(yearEnd) && year > yearEnd) {
          return false;
        }
      }
    }

    const minsValueText = minsValueInput ? minsValueInput.value.trim() : "";

    if (minsValueText !== "") {
      const minsText = String(row["Mins."] ?? "").trim();
      const mins = Number(minsText);
      const minsValue = Number(minsValueText);
      const minsMode = minsModeInput ? minsModeInput.value : "greater";

      if (minsText === "" || isNaN(mins) || isNaN(minsValue)) {
        return false;
      }

      if (minsMode === "greater" && mins <= minsValue) {
        return false;
      }

      if (minsMode === "less" && mins >= minsValue) {
        return false;
      }
    }

    return true;
  }

  function applyAllFiltersAndSort() {
    currentData = data.filter(row => {
      return (
        rowMatchesSearch(row) &&
        rowMatchesFilters(row) &&
        rowMatchesRatingStatus(row) &&
        rowMatchesAdvancedInputs(row)
      );
    });

    applySort();
    updateFilterIndicator();
  }

  function setupSearch() {
    if (!searchId) return;

    const searchBox = document.getElementById(searchId);
    if (!searchBox) return;

    searchBox.addEventListener("input", applyAllFiltersAndSort);
  }

  function setupRowLimit() {
    if (!rowLimitId) return;

    const rowLimitSelect = document.getElementById(rowLimitId);
    if (!rowLimitSelect) return;

    rowLimit = rowLimitSelect.value === "all"
      ? "all"
      : Number(rowLimitSelect.value) || 25;

    rowLimitSelect.addEventListener("change", () => {
      rowLimit = rowLimitSelect.value === "all"
        ? "all"
        : Number(rowLimitSelect.value) || 25;

      renderTable(currentData);
    });
  }

  function setupRatingStatusFilter() {
    if (!ratingStatusId) return;

    const ratingSelect = document.getElementById(ratingStatusId);
    if (!ratingSelect) return;

    ratingSelect.addEventListener("change", markFiltersPending);
  }

  function setupAdvancedInputFilters() {
    [
      "sample-filter",
      "year-start-filter",
      "year-end-filter",
      "mins-mode-filter",
      "mins-value-filter"
    ].forEach(id => {
      const input = document.getElementById(id);

      if (input) {
        input.addEventListener("input", markFiltersPending);
        input.addEventListener("change", markFiltersPending);
      }
    });
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

  function getActiveFilterCount() {
    let count = 0;

    const searchBox = searchId ? document.getElementById(searchId) : null;

    if (searchBox && searchBox.value.trim() !== "") {
      count++;
    }

    const ratingSelect = ratingStatusId ? document.getElementById(ratingStatusId) : null;

    if (ratingSelect && ratingSelect.value !== "all") {
      count++;
    }

    const sampleInput = document.getElementById("sample-filter");
    const yearStartInput = document.getElementById("year-start-filter");
    const yearEndInput = document.getElementById("year-end-filter");
    const minsValueInput = document.getElementById("mins-value-filter");

    if (sampleInput && sampleInput.value.trim() !== "") {
      count++;
    }

    if (
      (yearStartInput && yearStartInput.value.trim() !== "") ||
      (yearEndInput && yearEndInput.value.trim() !== "")
    ) {
      count++;
    }

    if (minsValueInput && minsValueInput.value.trim() !== "") {
      count++;
    }

    safeFilters.forEach(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return;

      const inputs = Array.from(container.querySelectorAll("input"));
      if (inputs.length === 0) return;

      const checkedCount = inputs.filter(input => input.checked).length;

      if (checkedCount !== inputs.length) {
        count++;
      }
    });

    return count;
  }

 function setApplyButtonState(state) {
  const applyButton = document.getElementById("apply-movies-filters");

  if (!applyButton) return;

  applyButton.classList.remove("filters-pending-button");
  applyButton.classList.remove("filters-applied-button");

  if (state === "pending") {
    applyButton.classList.add("filters-pending-button");
  }

  if (state === "applied") {
    applyButton.classList.add("filters-applied-button");
  }
}

function markFiltersPending() {
  const indicator = document.getElementById("filters-active-indicator");
  const filtersPanel = document.getElementById("movies-filters-panel");

  setApplyButtonState("pending");

  if (!indicator) return;

  indicator.textContent = "Click apply to confirm filters";
  indicator.classList.add("filters-active");
  indicator.classList.add("filters-pending");
  indicator.classList.remove("filters-applied");

  if (filtersPanel) {
    filtersPanel.classList.add("filters-active-panel");
  }
}

 function updateFilterIndicator() {
  const indicator = document.getElementById("filters-active-indicator");
  const filtersPanel = document.getElementById("movies-filters-panel");

  const activeCount = getActiveFilterCount();

  if (activeCount > 0) {
    setApplyButtonState("applied");
  } else {
    setApplyButtonState("none");
  }

  if (!indicator) return;

  indicator.classList.remove("filters-pending");
  indicator.classList.remove("filters-applied");

  if (activeCount > 0) {
    indicator.textContent = `Filters on (${activeCount})`;
    indicator.classList.add("filters-active");
    indicator.classList.add("filters-applied");

    if (filtersPanel) {
      filtersPanel.classList.add("filters-active-panel");
    }
  } else {
    indicator.textContent = "No filters";
    indicator.classList.remove("filters-active");

    if (filtersPanel) {
      filtersPanel.classList.remove("filters-active-panel");
    }
  }
}

  function clearAllMovieFilters() {
    const searchBox = searchId ? document.getElementById(searchId) : null;

    if (searchBox) {
      searchBox.value = "";
    }

    const ratingSelect = ratingStatusId ? document.getElementById(ratingStatusId) : null;

    if (ratingSelect) {
      ratingSelect.value = "all";
    }

    const sampleInput = document.getElementById("sample-filter");
    const yearStartInput = document.getElementById("year-start-filter");
    const yearEndInput = document.getElementById("year-end-filter");
    const minsModeInput = document.getElementById("mins-mode-filter");
    const minsValueInput = document.getElementById("mins-value-filter");

    if (sampleInput) sampleInput.value = "";
    if (yearStartInput) yearStartInput.value = "";
    if (yearEndInput) yearEndInput.value = "";
    if (minsModeInput) minsModeInput.value = "greater";
    if (minsValueInput) minsValueInput.value = "";

    safeFilters.forEach(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return;

      const inputs = Array.from(container.querySelectorAll("input"));

      inputs.forEach(input => {
        input.checked = true;
      });

      if (filter.selectAllId) {
        const selectAllCheckbox = document.getElementById(filter.selectAllId);

        if (selectAllCheckbox) {
          selectAllCheckbox.checked = true;
          selectAllCheckbox.indeterminate = false;
        }
      }

      if (filter.modeButtonId) {
        filter.mode = "or";
        updateFilterModeButton(filter);
      }
    });

    applyAllFiltersAndSort();
  }

  function setupClearFiltersButton() {
    const clearButton = document.getElementById("clear-movies-filters");

    if (!clearButton) return;

    clearButton.addEventListener("click", clearAllMovieFilters);
  }

  function setupApplyFiltersButton() {
    const applyButton = document.getElementById("apply-movies-filters");

    if (!applyButton) return;

    applyButton.addEventListener("click", applyAllFiltersAndSort);
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
    safeFilters.forEach(filter => {
      const container = document.getElementById(filter.targetId);
      if (!container) return;

      if (!filter.mode) {
        filter.mode = "or";
      }

      const valuesFromData = Array.from(
        new Set(
          data.flatMap(row => getFilterValuesForRow(row, filter))
        )
      ).sort((a, b) => a.localeCompare(b));

      const uniqueValues = filter.options
        ? [
            ...filter.options,
            ...valuesFromData.filter(value => !filter.options.includes(value))
          ]
        : valuesFromData;

      container.innerHTML = uniqueValues.map(value => `
        <label class="filter-option">
          <input type="checkbox" value="${escapeHTML(value)}" checked>
          ${escapeHTML(value)}
        </label>
      `).join("");

      container.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", () => {
          updateFilterSelectAllCheckbox(filter);
          markFiltersPending();
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
            markFiltersPending();
          });
        }
      }

      if (filter.modeButtonId) {
        const modeButton = document.getElementById(filter.modeButtonId);

        if (modeButton) {
          modeButton.addEventListener("click", () => {
            filter.mode = filter.mode === "and" ? "or" : "and";

            updateFilterModeButton(filter);
            markFiltersPending();
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
  setupAdvancedInputFilters();
  setupApplyFiltersButton();
  setupClearFiltersButton();

  applyAllFiltersAndSort();
}

function exportTableToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = Array.from(table.querySelectorAll("tr"));

  const csv = rows.map(row => {
    const cells = Array.from(row.querySelectorAll("th, td"));

    return cells.map(cell => {
      const value = cell.innerText.replace(/\r?\n/g, "\n").trim();
      return `"${value.replace(/"/g, '""')}"`;
    }).join(",");
  }).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
function setupHeaderMenus() {
  const menus = Array.from(document.querySelectorAll(".site-nav .nav-menu"));

  if (menus.length === 0) return;

  menus.forEach(menu => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;

      menus.forEach(otherMenu => {
        if (otherMenu !== menu) {
          otherMenu.open = false;
        }
      });
    });
  });

  document.addEventListener("click", event => {
    const clickedInsideNav = event.target.closest(".site-nav");

    if (clickedInsideNav) return;

    menus.forEach(menu => {
      menu.open = false;
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    menus.forEach(menu => {
      menu.open = false;
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupHeaderMenus);
} else {
  setupHeaderMenus();
}
async function loadMovieWatchHistory(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const rows = parsed.data.filter(row => {
    return Object.values(row).some(value => String(value ?? "").trim() !== "");
  });

  const table = document.getElementById("watch-history-table");
  const searchBox = document.getElementById("history-search");
  const rowCount = document.getElementById("history-row-count");
  const sortColumnButton = document.getElementById("history-sort-column");
  const sortDirectionButton = document.getElementById("history-sort-direction");
  const showSelect = document.getElementById("history-show-count");

  if (!table) return;

  let sortColumn = "Updated";
  let sortDirection = "Latest";
  let rowLimit = 25;
  function updateHistoryButtonStates() {
    if (sortColumnButton) {
      sortColumnButton.classList.remove("history-updated-button");
      sortColumnButton.classList.remove("history-added-button");
  
      if (sortColumn === "Updated") {
        sortColumnButton.classList.add("history-updated-button");
      } else {
        sortColumnButton.classList.add("history-added-button");
      }
    }
  
    if (sortDirectionButton) {
      sortDirectionButton.classList.remove("history-latest-button");
      sortDirectionButton.classList.remove("history-earliest-button");
  
      if (sortDirection === "Latest") {
        sortDirectionButton.classList.add("history-latest-button");
      } else {
        sortDirectionButton.classList.add("history-earliest-button");
      }
    }
  }
  const tierColors = {
    "S": { bg: "#efd1ff", text: "#5a3286" },
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
    "D": { bg: "#ff0000", text: "#000000" },
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

  function parseDate(value) {
    const text = String(value ?? "").trim();

    if (text === "") return null;

    const date = new Date(text);

    if (isNaN(date.getTime())) return null;

    return date;
  }

  function formatDate(value) {
    const date = parseDate(value);

    if (!date) return "";

    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function getTierStyle(value) {
    const tier = String(value ?? "").trim();
    const colors = tierColors[tier];

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

    const redColor = { r: 204, g: 0, b: 0 };
    const yellowColor = { r: 255, g: 217, b: 102 };
    const greenColor = { r: 87, g: 187, b: 138 };

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
function rowHasUpdateDate(row) {
  return parseDate(row["Updated"]) !== null;
}
  function rowIsWatchedMovie(row) {
    const watched = String(row["Watched?"] ?? "").trim().toLowerCase();
    return watched === "watched";
  }

  function rowMatchesSearch(row) {
    if (!searchBox) return true;

    const searchTerm = searchBox.value.trim().toLowerCase();

    if (searchTerm === "") return true;

   const searchableText = [
      row["Added"],
      row["Updated"],
      row["Name"],
      row["Year"],
      row["Tier"],
      row["My Rating"],
      row["Rk"],
      formatRank(row["Rk"]),
      row["Me vs. IMDB"],
      row["Notes (Review)"]
    ]
      .map(value => String(value ?? "").toLowerCase())
      .join(" ");
    
    return searchableText.includes(searchTerm);
  }

 function getSortedRows() {
  return rows
    .filter(rowIsWatchedMovie)
    .filter(rowHasUpdateDate)
    .filter(rowMatchesSearch)
    .sort((a, b) => {
      const dateA = parseDate(a[sortColumn]);
      const dateB = parseDate(b[sortColumn]);

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return sortDirection === "Latest"
        ? dateB - dateA
        : dateA - dateB;
    });
}
function formatReviewWithTitle(row) {
  const title = String(row["Name"] ?? "").trim();
  const year = String(row["Year"] ?? "").trim();
  const review = String(row["Notes (Review)"] ?? "").trim();

  if (review === "") return "";

  const titleYear = year === ""
    ? title
    : `${title} (${year})`;

  return `${titleYear}: ${review}`;
}
  function formatRank(value) {
  const text = String(value ?? "").trim();

  if (text === "") return "";

  if (text.startsWith("#")) {
    return text;
  }

  return `#${text}`;
}
  function renderTable() {
    const historyRows = getSortedRows();

    const rowsToShow = rowLimit === "all"
      ? historyRows
      : historyRows.slice(0, rowLimit);

     if (rowCount) {
      const sortLabel = sortColumn === "Updated" ? "last update" : "date added";
      rowCount.textContent = `Showing ${rowsToShow.length} of ${historyRows.length} movies with update dates, sorted by ${sortLabel}, ${sortDirection.toLowerCase()} first.`;
    }

    let html = `
      <thead>
        <tr>
          <th>Date Added</th>
          <th>Last Update</th>
          <th>Title</th>
          <th>Year</th>
          <th>Tier</th>
          <th>Rating</th>
          <th>Rank</th>
          <th>vs. IMDB</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
    `;

   rowsToShow.forEach(row => {
      html += `
        <tr>
          <td>${escapeHTML(formatDate(row["Added"]))}</td>
          <td>${escapeHTML(formatDate(row["Updated"]))}</td>
          <td>${escapeHTML(row["Name"])}</td>
          <td>${escapeHTML(row["Year"])}</td>
          <td style="${getTierStyle(row["Tier"])}">${escapeHTML(row["Tier"])}</td>
          <td style="${getRatingColor(row["My Rating"])}">${escapeHTML(row["My Rating"])}</td>
          <td>${escapeHTML(formatRank(row["Rk"]))}</td>
          <td>${escapeHTML(row["Me vs. IMDB"])}</td>
          <td>${escapeHTML(formatReviewWithTitle(row))}</td>
        </tr>
      `;
    });

    html += "</tbody>";
    table.innerHTML = html;
  }
if (showSelect) {
  showSelect.addEventListener("change", () => {
    rowLimit = showSelect.value === "all"
      ? "all"
      : Number(showSelect.value) || 25;

    renderTable();
  });
}
 if (sortColumnButton) {
  sortColumnButton.addEventListener("click", () => {
    sortColumn = sortColumn === "Updated" ? "Added" : "Updated";

    sortColumnButton.textContent = sortColumn === "Updated"
      ? "Sort by: Last Update"
      : "Sort by: Date Added";

    updateHistoryButtonStates();
    renderTable();
  });
}

if (sortDirectionButton) {
  sortDirectionButton.addEventListener("click", () => {
    sortDirection = sortDirection === "Latest" ? "Earliest" : "Latest";
    sortDirectionButton.textContent = `Sort: ${sortDirection}`;

    updateHistoryButtonStates();
    renderTable();
  });
}

  if (searchBox) {
    searchBox.addEventListener("input", renderTable);
  }
  updateHistoryButtonStates();
  renderTable();
}
async function loadMovieComparison(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const rows = parsed.data.filter(row => {
    return Object.values(row).some(value => String(value ?? "").trim() !== "");
  });

  const leftInput = document.getElementById("movie-compare-left-search");
  const rightInput = document.getElementById("movie-compare-right-search");
  const datalist = document.getElementById("movie-compare-options");
  const leftCard = document.getElementById("movie-compare-left-card");
  const rightCard = document.getElementById("movie-compare-right-card");
  const factorComparison = document.getElementById("movie-factor-comparison");
  const status = document.getElementById("movie-compare-status");

  if (!leftInput || !rightInput || !datalist || !leftCard || !rightCard || !factorComparison) {
    return;
  }

  let leftMovie = null;
  let rightMovie = null;

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

  const tierColors = {
    "S": { bg: "#efd1ff", text: "#5a3286" },
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
    "D": { bg: "#ff0000", text: "#000000" },
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

  function makeMovieLabel(row) {
    const title = String(row["Name"] ?? "").trim();
    const year = String(row["Year"] ?? "").trim();

    if (title === "" && year === "") return "";

    return year === ""
      ? title
      : `${title} (${year})`;
  }
  function isRankedMovie(row) {
  const rating = String(row["My Rating"] ?? "").trim();

  return rating !== "" && rating !== "--";
}
  const rankedRows = rows.filter(isRankedMovie);
  
  function normalizeSearchText(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function formatRank(value) {
    const text = String(value ?? "").trim();

    if (text === "") return "";
    if (text.startsWith("#")) return text;

    return `#${text}`;
  }

  function formatValue(value) {
    const text = String(value ?? "").trim();
    return text === "" ? "—" : text;
  }

  function getNumber(value) {
    const text = String(value ?? "").trim();

    if (text === "" || text === "--") return null;

    const num = Number(text);

    return isNaN(num) ? null : num;
  }

  function getTierStyle(value) {
    const tier = String(value ?? "").trim();
    const colors = tierColors[tier];

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

    const redColor = { r: 204, g: 0, b: 0 };
    const yellowColor = { r: 255, g: 217, b: 102 };
    const greenColor = { r: 87, g: 187, b: 138 };

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

  function findMovieByInput(value) {
    const searchValue = normalizeSearchText(value);
  
    if (searchValue === "") return null;
  
    return rankedRows.find(row => {
      return normalizeSearchText(makeMovieLabel(row)) === searchValue;
    }) || null;
  }

  function renderMovieCard(target, movie, sideLabel) {
    if (!movie) {
      target.innerHTML = `<p class="movie-compare-placeholder">Select a movie on the ${sideLabel}.</p>`;
      return;
    }

    target.innerHTML = `
      <h3>${escapeHTML(movie["Name"])}</h3>

      <div class="movie-compare-meta">
        <span>${escapeHTML(movie["Year"])}</span>
        <span style="${getTierStyle(movie["Tier"])}">${escapeHTML(formatValue(movie["Tier"]))}</span>
        <span style="${getRatingColor(movie["My Rating"])}">${escapeHTML(formatValue(movie["My Rating"]))}</span>
        <span>${escapeHTML(formatRank(movie["Rk"]))}</span>
      </div>

      <dl class="movie-compare-details">
        <div>
          <dt>vs. IMDB</dt>
          <dd>${escapeHTML(formatValue(movie["Me vs. IMDB"]))}</dd>
        </div>

        <div>
          <dt>Runtime</dt>
          <dd>${escapeHTML(formatValue(movie["Mins."]))} mins</dd>
        </div>

        <div>
          <dt>Genre</dt>
          <dd>${escapeHTML(formatValue(movie["OMDB_Genre"]))}</dd>
        </div>

        <div>
          <dt>Director</dt>
          <dd>${escapeHTML(formatValue(movie["OMDB_Director"]))}</dd>
        </div>
      </dl>

      <div class="movie-compare-review">
        <h4>Review</h4>
        <p>${escapeHTML(formatValue(movie["Notes (Review)"]))}</p>
      </div>
    `;
  }

  function renderFactorRow(factor) {
    const leftRaw = leftMovie ? leftMovie[factor] : "";
    const rightRaw = rightMovie ? rightMovie[factor] : "";

    const leftValue = getNumber(leftRaw);
    const rightValue = getNumber(rightRaw);

    const leftPercent = leftValue === null ? 0 : Math.max(0, Math.min(100, leftValue * 10));
    const rightPercent = rightValue === null ? 0 : Math.max(0, Math.min(100, rightValue * 10));

    let resultClass = "";

    if (leftValue !== null && rightValue !== null) {
      if (leftValue > rightValue) resultClass = "left-wins";
      if (rightValue > leftValue) resultClass = "right-wins";
      if (rightValue === leftValue) resultClass = "tie";
    }

    return `
      <div class="movie-factor-row ${resultClass}">
        <div class="movie-factor-value movie-factor-left-value">${escapeHTML(formatValue(leftRaw))}</div>

        <div class="movie-factor-middle">
          <div class="movie-factor-label">${escapeHTML(factor)}</div>

          <div class="movie-factor-bar">
            <div class="movie-factor-half movie-factor-half-left">
              <div class="movie-factor-fill movie-factor-fill-left" style="width: ${leftPercent}%;"></div>
            </div>

            <div class="movie-factor-centre-line"></div>

            <div class="movie-factor-half movie-factor-half-right">
              <div class="movie-factor-fill movie-factor-fill-right" style="width: ${rightPercent}%;"></div>
            </div>
          </div>
        </div>

        <div class="movie-factor-value movie-factor-right-value">${escapeHTML(formatValue(rightRaw))}</div>
      </div>
    `;
  }

  function renderFactorComparison() {
    if (!leftMovie && !rightMovie) {
      factorComparison.innerHTML = `<p class="movie-compare-placeholder">Select two movies to compare factor scores.</p>`;
      return;
    }

    factorComparison.innerHTML = factorColumns
      .map(factor => renderFactorRow(factor))
      .join("");
  }

  function renderComparison() {
    renderMovieCard(leftCard, leftMovie, "left");
    renderMovieCard(rightCard, rightMovie, "right");
    renderFactorComparison();

    if (status) {
      if (leftMovie && rightMovie) {
        status.textContent = `Comparing ${makeMovieLabel(leftMovie)} against ${makeMovieLabel(rightMovie)}.`;
      } else if (leftMovie || rightMovie) {
        status.textContent = "Select one more movie to complete the comparison.";
      } else {
        status.textContent = "Search and select two movies to begin.";
      }
    }
  }

 const movieOptions = rankedRows
  .map(row => makeMovieLabel(row))
  .filter(label => label !== "")
  .sort((a, b) => a.localeCompare(b));

  datalist.innerHTML = movieOptions
    .map(label => `<option value="${escapeHTML(label)}"></option>`)
    .join("");

  leftInput.addEventListener("change", () => {
    leftMovie = findMovieByInput(leftInput.value);
    renderComparison();
  });

  rightInput.addEventListener("change", () => {
    rightMovie = findMovieByInput(rightInput.value);
    renderComparison();
  });

  leftInput.addEventListener("input", () => {
    const match = findMovieByInput(leftInput.value);

    if (match) {
      leftMovie = match;
      renderComparison();
    }
  });

  rightInput.addEventListener("input", () => {
    const match = findMovieByInput(rightInput.value);

    if (match) {
      rightMovie = match;
      renderComparison();
    }
  });

  renderComparison();
}
