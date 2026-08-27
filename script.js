window.MOVIES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=1266267170&single=true&output=csv";

window.TVSHOWS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=1404525297&single=true&output=csv";
window.EPISODES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=210626138&single=true&output=csv";

window.ALBUMS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=0&single=true&output=csv";
window.SONGS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=1964285622&single=true&output=csv";
window.ARTISTS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=1541619566&single=true&output=csv";
window.ARTIST_SONGS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=2000775501&single=true&output=csv";
window.FAV_SONGS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=2072637157&single=true&output=csv";

window.FLAGS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmeTR35_PhZG8dySIXLskh-Z2QqGhczSg1kr9HWDsn4PD0bL6pdSl09USGztrnm-iWf25Y5SkFLTDG/pub?gid=671321735&single=true&output=csv";
window.FLAGS_LEADERBOARD_URL = "https://script.google.com/macros/s/AKfycbwD7ZNosirs9cBpMvP7nutDo3t0KdV2zRAn8LwBTelT-BFo-ltgmCgs3CychRnwvpT1-g/exec";

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

function getFactorColor(value) {
  const text = String(value ?? "").trim();

  if (text === "") {
    return { bg: "", text: "" };
  }

  if (factorColors[text]) {
    return factorColors[text];
  }

  const num = Number(text);

  if (!isNaN(num)) {
    const roundedToHalf = Math.round(num * 2) / 2;
    const roundedText = String(roundedToHalf);

    if (factorColors[roundedText]) {
      return factorColors[roundedText];
    }
  }

  return { bg: "", text: "" };
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

function getTierColor(value) {
  const tier = String(value ?? "").trim();

  if (tierColors[tier]) {
    return tierColors[tier];
  }

  return { bg: "", text: "" };
}

window.MOVIES_LOCAL_CSV_URL = "/nick-site/data/movies.csv";
window.TVSHOWS_LOCAL_CSV_URL = "/nick-site/data/tvshows.csv";
window.EPISODES_LOCAL_CSV_URL = "/nick-site/data/episodes.csv";
window.ALBUMS_LOCAL_CSV_URL = "/nick-site/data/albums.csv";
window.SONGS_LOCAL_CSV_URL = "/nick-site/data/songs.csv";

function getCSVFallbackUrl(filePath) {
  if (filePath === window.MOVIES_CSV_URL) return window.MOVIES_LOCAL_CSV_URL;
  if (filePath === window.TVSHOWS_CSV_URL) return window.TVSHOWS_LOCAL_CSV_URL;
  if (filePath === window.EPISODES_CSV_URL) return window.EPISODES_LOCAL_CSV_URL;
  if (filePath === window.ALBUMS_CSV_URL) return window.ALBUMS_LOCAL_CSV_URL;
  if (filePath === window.SONGS_CSV_URL) return window.SONGS_LOCAL_CSV_URL;

  return null;
}

async function fetchCSVTextWithRetry(filePath, attempts = 3) {
  let lastError = null;

  if (!filePath) {
    throw new Error("Missing CSV path.");
  }

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const separator = filePath.includes("?") ? "&" : "?";
      const cacheBustedUrl = `${filePath}${separator}cachebust=${Date.now()}-${attempt}`;

      const response = await fetch(cacheBustedUrl, {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`CSV fetch failed with status ${response.status}`);
      }

      const text = await response.text();
      const trimmed = text.trim().toLowerCase();

      if (trimmed.startsWith("<!doctype") || trimmed.startsWith("<html")) {
        throw new Error("CSV URL returned HTML instead of CSV.");
      }

      return text;
    } catch (error) {
      lastError = error;
      console.warn(`CSV fetch attempt ${attempt} failed:`, error);
    }
  }

  throw lastError;
}

async function getCSVText(filePath) {
  const primaryPath = filePath;
  const fallbackPath = getCSVFallbackUrl(primaryPath);

  try {
    return await fetchCSVTextWithRetry(primaryPath, 3);
  } catch (primaryError) {
    console.warn("Primary CSV failed.", primaryError);

    if (fallbackPath && fallbackPath !== primaryPath) {
      console.warn("Trying local fallback CSV:", fallbackPath);
      return await fetchCSVTextWithRetry(fallbackPath, 1);
    }

    throw primaryError;
  }
}

function getTierStyleFromValue(value, fallback = "") {
  const colors = getTierColor(value);

  if (colors.bg === "" || colors.text === "") return fallback;

  return `
    background-color: ${colors.bg};
    color: ${colors.text};
    font-weight: bold;
  `;
}

function getFactorStyleFromValue(value, fallback = "") {
  const colors = getFactorColor(value);

  if (colors.bg === "" || colors.text === "") return fallback;

  return `
    background-color: ${colors.bg};
    color: ${colors.text};
    font-weight: bold;
  `;
}

function parseMovieDate(value) {
  const text = String(value ?? "").trim();

  if (text === "") return null;

  const slashParts = text.split("/");

  if (slashParts.length === 3) {
    const month = Number(slashParts[0]);
    const day = Number(slashParts[1]);
    let year = Number(slashParts[2]);

    if (year < 100) {
      year += year >= 70 ? 1900 : 2000;
    }

    if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
      return new Date(year, month - 1, day).getTime();
    }
  }

  const fallbackDate = new Date(text).getTime();

  return isNaN(fallbackDate) ? null : fallbackDate;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";

  const lastDigit = day % 10;

  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";

  return "th";
}

function formatLongMovieDate(timestamp) {
  const date = new Date(timestamp);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

function updateRankingsLastUpdatedText(rows) {
      const lastUpdatedElement =
        document.getElementById("last-updated") ||
        document.getElementById("movies-last-updated");
    
      if (!lastUpdatedElement) return;
    
      const latestTimestamp = rows
        .map(row => parseMovieDate(row["Updated"]))
        .filter(timestamp => timestamp !== null)
        .sort((a, b) => b - a)[0];
    
      if (!latestTimestamp) {
        lastUpdatedElement.textContent = "Last updated: —";
        return;
      }
    
      lastUpdatedElement.textContent = `Last updated: ${formatLongMovieDate(latestTimestamp)}`;
    }
    
    function updateMoviesLastUpdatedText(rows) {
      updateRankingsLastUpdatedText(rows);
}

const MOVIE_PINNED_COLUMNS = [
  "Tier",
  "Rk",
  "Movie Title",
  "Year",
  "Mins.",
  "h:mm",
  "My Rating",
  "vs. IMDB",
  "Watched?",
  "Updated"
];

const MOVIE_FACTOR_SCORE_COLUMNS = [
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

function isMovieRankingTable(headers) {
  return (
    headers.includes("Tier") &&
    headers.includes("Rk") &&
    headers.includes("Movie Title") &&
    headers.includes("My Rating") &&
    headers.includes("Updated")
  );
}

function getOrderedMovieHeaders(headers) {
  if (!isMovieRankingTable(headers)) {
    return headers;
  }

  const usedHeaders = new Set();
  const orderedHeaders = [];

  function addHeader(header) {
    if (!headers.includes(header)) return;
    if (usedHeaders.has(header)) return;

    orderedHeaders.push(header);
    usedHeaders.add(header);
  }

  MOVIE_PINNED_COLUMNS.forEach(addHeader);
  MOVIE_FACTOR_SCORE_COLUMNS.forEach(addHeader);

  headers.forEach(addHeader);

  return orderedHeaders;
}

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
  const text = await getCSVText(filePath);

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const sourceHeaders = parsed.meta.fields || [];
  const allHeaders = getOrderedMovieHeaders(sourceHeaders);
  
  const data = parsed.data.filter(row => {
    return allHeaders.some(header => {
      return String(row[header] ?? "").trim() !== "";
    });
  });

  updateMoviesLastUpdatedText(data);

  let visibleHeaders = displayColumns
      ? allHeaders.filter(column => displayColumns.includes(column))
      : allHeaders;

  const table = document.getElementById(tableId);

  if (!table) return;

  const safeFilters = Array.isArray(filters)
    ? filters.filter(filter => filter && filter.targetId && filter.column)
    : [];

  let currentData = [...data];
  let sortColumn = visibleHeaders.includes("Rk") ? "Rk" : visibleHeaders[0] || null;
  let sortDirection = "asc";
  let rowLimit = 25;

  const expandableColumns = [
      "Notes (Review)",
      "OMDB_Plot",
      "Blurb",
      "Season Episode Counts"
    ];
  let expandedCellCounter = 0;
  const expandedCellStore = {};

  const columnWidths = {
    /* All tables */
    "Updated": "105px",
      
    /* Movie + TV tables */
    "Tier": "80px",
    "Rk": "70px",
    "Notes (Review)": "500px",
    "vs. IMDB": "65px",
    "Tags": "150px",
    
    "Plot": "50px",
    "Main Character(s)": "50px",
    "Side Characters": "50px",
    "Emotion": "50px",
    "Dialogue (Writing)": "50px",
    "Purpose Met": "50px",
    "Cast": "50px",
    "Music & Sound": "50px",
    "Rewatch Value": "50px",
    
    /* Movie Table only */
    "Movie Title": "240px",
    "Movie Series?": "120px",
    "OMDB_Plot": "420px",
    "OMDB_Top_3_Actors": "180px",
    "OMDB_Director": "150px",
    "OMDB_Genre": "150px",
    
    /* TV Show Table only */
    "TV Show": "240px",
    "Times Seen": "75px",

    /* Episodes Table only */
    "Episode Title": "260px",
    "Blurb": "400px",
    "Release Date": "240px",
    "Season Epi #": "75px",
    "Rank": "60px",
    "Notes": "400px"
  };

  const cellFontSizes = {
    /* All tables */
    "Updated": "12px",
    
    /* Movie + TV tables */
    "Notes (Review)": "13px",
    "Tags": "13px",
        
    /* Movie Table only */
    "Movie Series?": "13px",
    "OMDB_Plot": "13px",
    "OMDB_Genre": "13px",
    "OMDB_Director": "13px",
    "OMDB_Top_3_Actors": "13px",
    
    /* TV Show Table only */
    "Times Seen": "12px",
    
    /* Episodes Table only */
    "Blurb": "11px",
    "Release Date": "14px",
    "Season Epi #": "14px",
    "Rank": "18px",
    "Notes": "11px"
  };

  const defaultHeaderFontSize = "18px";

  const headerFontSizes = {
    /* All tables */

    /* Movie table only */
    
    /* TV Show Table only */
    "Times Seen": "12px",
    
    /* Episodes Table only */
    "Season": "14px",
    "Season Epi #": "12px",
    "Release Date": "13px",
    "Rank": "12px"
  };

  const factorHeaderFontSize = "12px";

  const compactHeaderColumns = [
    "Main Character(s)",
    "Side Characters",
    "Dialogue (Writing)"
  ];

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
      "OMDB_Top_3_Actors": "Actors (3)",
      "vs. IMDB": "vs.<br>IMDB",
      "Movie Series?": "Movie Series",
      "Main Character(s)": "Main<br>Character(s)",
      "Side Characters": "Side<br>Characters",
      "Dialogue (Writing)": "Dialogue<br>(Writing)",
      "Purpose Met": "Purpose<br>Met",
      "Music & Sound": "Music &<br>Sound",
      "Rewatch Value": "Rewatch<br>Value",
      "Sarah :)": "Sarah's<br>Rank",
      "Nick <3": "Nick's<br>Rank",
      "Season Epi #": "Season<br>Epi #",
    };

    return headerBreaks[header] || escapeHTML(header);
  }

  function formatCellValue(header, value) {
    const text = String(value ?? "");

    if (header === "Tags") {
      return text
        .split(";")
        .map(tag => tag.trim())
        .filter(tag => tag !== "")
        .map(tag => escapeHTML(tag))
        .join("<br>");
    }

    return escapeHTML(text);
  }

  const dateColumns = ["Added", "Updated", "Release Date"];

  function csvEscape(value) {
    const text = String(value ?? "");

    if (
      text.includes(",") ||
      text.includes('"') ||
      text.includes("\n") ||
      text.includes("\r")
    ) {
      return `"${text.replaceAll('"', '""')}"`;
    }

    return text;
  }

  function downloadVisibleTableAsCSV() {
    const rowsToExport = rowLimit === "all"
      ? currentData
      : currentData.slice(0, rowLimit);

    const csvRows = [];

    csvRows.push(
      visibleHeaders
        .map(header => csvEscape(header))
        .join(",")
    );

    rowsToExport.forEach(row => {
      csvRows.push(
        visibleHeaders
          .map(header => csvEscape(row[header]))
          .join(",")
      );
    });

    const csvText = "\uFEFF" + csvRows.join("\r\n");

    const blob = new Blob([csvText], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `${tableId || "table"}-visible-${today}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

 function setupDownloadVisibleCSVButton() {
    const button =
      document.getElementById("download-csv") ||
      document.getElementById("movies-download-csv");
  
    if (!button) return;
  
    button.addEventListener("click", downloadVisibleTableAsCSV);
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
          
            style += `
              font-size: ${defaultHeaderFontSize};
            `;
          
            if (headerFontSizes[header]) {
              style += `
                font-size: ${headerFontSizes[header]};
                line-height: 1.1;
              `;
            }
          
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
    const text = String(value ?? "").replace(/,/g, "").trim();

    if (text === "" || text === "--") return "";

    const num = Number(text);

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

    return getFactorStyleFromValue(normalizeFactorValue(value));
  }

  function getConditionalStyle(header, value) {
    if (header === "Tier" || header === "TV SHOW TIER") {
      return getTierStyleFromValue(value);
    }

    if (header === "Rank" || header === "Sarah :)" || header === "Nick <3") {
      return getFactorStyleFromValue(value);
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

  function formatSeasonEpisodeCounts(value) {
      const parts = String(value ?? "")
        .split(";")
        .map(part => part.trim())
        .filter(Boolean);
    
      return parts.map((count, index) => {
        return `S${index + 1} = ${count}`;
      });
}
  
function renderExpandableCell(header, value) {
      const text = String(value ?? "").trim();
    
      if (text === "") return "";
    
      const cellId = `cell-${expandedCellCounter++}`;
    
      let previewText = text;
      let modalText = text;
    
      if (header === "Season Episode Counts") {
        const seasonLines = formatSeasonEpisodeCounts(value);
    
        previewText = seasonLines[0] || text;
        modalText = seasonLines.length ? seasonLines.join("\n") : text;
      }
    
      expandedCellStore[cellId] = {
        title: header,
        text: modalText
      };
    
      return `
        <div class="expandable-cell">
          <button class="cell-expand-button" type="button" data-cell-id="${cellId}">+</button>
          <span class="cell-preview">${escapeHTML(previewText)}</span>
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

function getVisibleEpisodeRankAverage(rowsToShow) {
  const isEpisodeRankingsTable =
    allHeaders.includes("Episode Title") &&
    allHeaders.includes("Rank");

  if (!isEpisodeRankingsTable) {
    return "";
  }

  const rankValues = rowsToShow
    .map(row => {
      const value = String(row["Rank"] ?? "").replace(/,/g, "").trim();
      const number = Number(value);

      return isNaN(number) ? null : number;
    })
    .filter(value => value !== null);

  if (rankValues.length === 0) {
    return "—";
  }

  const average =
    rankValues.reduce((sum, value) => sum + value, 0) / rankValues.length;

  return average
    .toFixed(2)
    .replace(/\.?0+$/, "");
}
  
  function renderTable(rows) {
    clearExpandedCellStore();

    let html = "<thead><tr>";

    visibleHeaders.forEach(header => {
      html += `<th data-column="${escapeHTML(header)}" style="${getHeaderStyle(header)}">${formatHeader(header)}</th>`;
    });

    html += "</tr></thead><tbody>";

    const rowsToShow = rowLimit === "all" ? rows : rows.slice(0, rowLimit);
    const rowCount =
        document.getElementById("row-count") ||
        document.getElementById("movies-row-count");

       if (rowCount) {
      const averageRank = getVisibleEpisodeRankAverage(rowsToShow);
    
      rowCount.innerHTML = `
        <span>Showing ${rowsToShow.length} of ${rows.length} matches.</span>
        ${averageRank ? `
          <span class="visible-rank-average">
            Average Rank: <span class="visible-rank-average-number">${averageRank}</span>
          </span>
        ` : ""}
      `;
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

      if (dateColumns.includes(sortColumn)) {
        const dateA = parseMovieDate(valueA);
        const dateB = parseMovieDate(valueB);

        if (dateA !== null && dateB !== null) {
          return sortDirection === "asc"
            ? dateA - dateB
            : dateB - dateA;
        }

        if (dateA !== null && dateB === null) return -1;
        if (dateA === null && dateB !== null) return 1;
        return 0;
      }

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
        row["Movie Title"],
        row["Tags"],
        row["Movie Series?"],
        row["OMDB_Genre"],
        row["OMDB_Director"],
        row["OMDB_Top_3_Actors"],
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
      
        const searchInput = document.getElementById(searchId);
        const searchButton = document.getElementById(`${searchId}-button`);
        const clearButton = document.getElementById(`${searchId}-clear`);
      
        if (!searchInput) return;
      
      function updateClearButton() {
          if (!clearButton) return;
      
          clearButton.hidden = searchInput.value.trim() === "";
        }
      
        function runSearch() {
          applyAllFiltersAndSort();
          updateClearButton();
        }
      
        searchInput.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            runSearch();
          }
      
          if (event.key === "Escape") {
            event.preventDefault();
            searchInput.value = "";
            runSearch();
          }
        });
      
        searchInput.addEventListener("input", updateClearButton);
      
        if (searchButton) {
          searchButton.addEventListener("click", runSearch);
        }
      
        if (clearButton) {
          clearButton.addEventListener("click", function () {
            searchInput.value = "";
            runSearch();
            searchInput.focus();
          });
        }
      
        updateClearButton();
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
              const changedHeader = input.value;
        
             if (input.checked) {
              if (!visibleHeaders.includes(changedHeader)) {
                const insertBeforeHeader = window.RANKINGS_ADDED_COLUMNS_BEFORE || "";
            
                if (insertBeforeHeader && visibleHeaders.includes(insertBeforeHeader)) {
                  const insertIndex = visibleHeaders.indexOf(insertBeforeHeader);
                  visibleHeaders.splice(insertIndex, 0, changedHeader);
                } else {
                  visibleHeaders.push(changedHeader);
                }
              }
            } else {
              visibleHeaders = visibleHeaders.filter(header => header !== changedHeader);
            }
        
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
        
              if (selectAllCheckbox.checked) {
                allHeaders.forEach(header => {
                  if (!visibleHeaders.includes(header)) {
                    visibleHeaders.push(header);
                  }
                });
              } else {
                visibleHeaders = [];
              }
        
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
    const filtersPanel = document.querySelector(".filters-panel");

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
function getFilterSummaryLabel(filter) {
  const container = document.getElementById(filter.targetId);
  const details = container ? container.closest("details") : null;
  const summary = details ? details.querySelector("summary") : null;

  if (summary) {
    return summary.textContent.replace(/\s+/g, " ").trim();
  }

  return filter.column || "Filter";
}

function getSelectedFilterSummary(filter) {
  const container = document.getElementById(filter.targetId);

  if (!container) return null;

  const inputs = Array.from(container.querySelectorAll("input"));

  if (inputs.length === 0) return null;

  const selectedValues = inputs
    .filter(input => input.checked)
    .map(input => input.value);

  if (selectedValues.length === inputs.length) return null;

  const label = getFilterSummaryLabel(filter);

  if (selectedValues.length === 0) {
    return `${label} = none`;
  }

  const selectedText = selectedValues.length <= 5
    ? selectedValues.join(", ")
    : `${selectedValues.length} selected`;

  if (filter.modeButtonId) {
    const modeText = filter.mode === "and"
      ? "must contain all"
      : "contains either";

    return `${label} = ${selectedText} (${modeText})`;
  }

  return `${label} = ${selectedText}`;
}

function updateAppliedFiltersSummary() {
          const summaryBox = document.getElementById("filters-applied-summary");
          const summaryText = document.getElementById("filters-applied-summary-text");
        
          if (!summaryBox || !summaryText) return;
        
          const parts = [];
        
          const searchBox = searchId ? document.getElementById(searchId) : null;
        
          if (searchBox && searchBox.value.trim() !== "") {
            parts.push(`Search = "${searchBox.value.trim()}"`);
          }
        
          const ratingSelect = ratingStatusId ? document.getElementById(ratingStatusId) : null;
        
          if (ratingSelect && ratingSelect.value !== "all") {
            const selectedOption = ratingSelect.options[ratingSelect.selectedIndex];
            const label = selectedOption ? selectedOption.textContent.trim() : ratingSelect.value;
        
            parts.push(`Rating = ${label}`);
          }
        
          const sampleInput = document.getElementById("sample-filter");
          const yearStartInput = document.getElementById("year-start-filter");
          const yearEndInput = document.getElementById("year-end-filter");
          const minsModeInput = document.getElementById("mins-mode-filter");
          const minsValueInput = document.getElementById("mins-value-filter");
        
          if (sampleInput && sampleInput.value.trim() !== "") {
            parts.push(`Sample = "${sampleInput.value.trim()}"`);
          }
        
          const yearStart = yearStartInput ? yearStartInput.value.trim() : "";
          const yearEnd = yearEndInput ? yearEndInput.value.trim() : "";
        
          if (yearStart !== "" || yearEnd !== "") {
            parts.push(`Year = ${yearStart || "any"} to ${yearEnd || "any"}`);
          }
        
          const minsValue = minsValueInput ? minsValueInput.value.trim() : "";
        
          if (minsValue !== "") {
            const minsMode = minsModeInput ? minsModeInput.value : "greater";
            const minsText = minsMode === "less" ? "less than" : "greater than";
        
            parts.push(`Mins. = ${minsText} ${minsValue}`);
          }
        
          safeFilters.forEach(filter => {
            const filterSummary = getSelectedFilterSummary(filter);
        
            if (filterSummary) {
              parts.push(filterSummary);
            }
          });
        
          if (parts.length === 0) {
            summaryBox.hidden = true;
            summaryText.textContent = "None";
            return;
          }
        
          summaryText.textContent = parts.join("; ");
          summaryBox.hidden = false;
}
  
  function updateFilterIndicator() {
    const indicator = document.getElementById("filters-active-indicator");
    const filtersPanel = document.querySelector(".filters-panel");

    const activeCount = getActiveFilterCount();

    updateAppliedFiltersSummary();

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
  setupDownloadVisibleCSVButton();

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
  const text = await getCSVText(filePath);

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

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function parseDate(value) {
    const timestamp = parseMovieDate(value);

    if (timestamp === null) return null;

    return new Date(timestamp);
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
    return getTierStyleFromValue(value);
  }

  function getRatingColor(value) {
    const text = String(value ?? "").replace(/,/g, "").trim();

    if (text === "" || text === "--") return "";

    const num = Number(text);

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
      row["Movie Title"],
      row["Year"],
      row["Tier"],
      row["My Rating"],
      row["Rk"],
      formatRank(row["Rk"]),
      row["vs. IMDB"],
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
    const title = String(row["Movie Title"] ?? "").trim();
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
          <td>${escapeHTML(row["Movie Title"])}</td>
          <td>${escapeHTML(row["Year"])}</td>
          <td style="${getTierStyle(row["Tier"])}">${escapeHTML(row["Tier"])}</td>
          <td style="${getRatingColor(row["My Rating"])}">${escapeHTML(row["My Rating"])}</td>
          <td>${escapeHTML(formatRank(row["Rk"]))}</td>
          <td>${escapeHTML(row["vs. IMDB"])}</td>
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
  const text = await getCSVText(filePath);

  const parsed = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true
  });

  const rows = parsed.data.filter(row => {
    return Object.values(row).some(value => String(value ?? "").trim() !== "");
  });

  const leftInput = document.getElementById("movie-compare-left-search");
  const rightInput = document.getElementById("movie-compare-right-search");
  const leftRandomButton = document.getElementById("movie-compare-left-random");
  const rightRandomButton = document.getElementById("movie-compare-right-random");
  const datalist = document.getElementById("movie-compare-options");
  const leftCard = document.getElementById("movie-compare-left-card");
  const rightCard = document.getElementById("movie-compare-right-card");
  const factorComparison = document.getElementById("movie-factor-comparison");
  const status = document.getElementById("movie-compare-status");
  const categoryWinner = document.getElementById("movie-category-winner");
  const factorLeftTitle = document.getElementById("movie-factor-left-title");
  const factorRightTitle = document.getElementById("movie-factor-right-title");

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

  function renderFactorMatchupHeader() {
    if (factorLeftTitle) {
      factorLeftTitle.textContent = leftMovie
        ? makeMovieLabel(leftMovie)
        : "Movie A";
    }

    if (factorRightTitle) {
      factorRightTitle.textContent = rightMovie
        ? makeMovieLabel(rightMovie)
        : "Movie B";
    }
  }

  function isRankedMovie(row) {
    const rating = String(row["My Rating"] ?? "").trim();

    return rating !== "" && rating !== "--";
  }

  const rankedRows = rows.filter(isRankedMovie);

  function getRandomMovie() {
    if (!rankedRows || rankedRows.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * rankedRows.length);
    return rankedRows[randomIndex];
  }

  if (leftRandomButton) {
    leftRandomButton.addEventListener("click", () => {
      const randomMovie = getRandomMovie();

      if (!randomMovie) return;

      leftMovie = randomMovie;
      leftInput.value = makeMovieLabel(randomMovie);
      renderComparison();
    });
  }

  if (rightRandomButton) {
    rightRandomButton.addEventListener("click", () => {
      const randomMovie = getRandomMovie();

      if (!randomMovie) return;

      rightMovie = randomMovie;
      rightInput.value = makeMovieLabel(randomMovie);
      renderComparison();
    });
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function makeMovieLabel(row) {
    const title = String(row["Movie Title"] ?? "").trim();
    const year = String(row["Year"] ?? "").trim();

    if (title === "" && year === "") return "";

    return year === ""
      ? title
      : `${title} (${year})`;
  }

  function normalizeSearchText(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function formatRank(value) {
    const text = String(value ?? "").trim();

    if (text === "") return "";
    if (text.startsWith("#")) return text;

    return `#${text}`;
  }
  
  function formatTagsForInfo(value) {
  return String(value ?? "")
    .split(";")
    .map(tag => tag.trim())
    .filter(Boolean)
    .join(", ");
}
  
  function formatValue(value) {
    const text = String(value ?? "").trim();
    return text === "" ? "—" : text;
  }

  function formatTagsForInfo(value) {
  return String(value ?? "")
    .split(";")
    .map(tag => tag.trim())
    .filter(Boolean)
    .join(", ");
}
  
  function formatRankWithHash(value) {
          const text = String(value ?? "").trim();
        
          if (text === "" || text === "—" || text === "--") {
            return "—";
          }
        
          if (text.startsWith("#")) {
            return text;
          }
        
          return `#${text}`;
  }

  function getNumber(value) {
    const text = String(value ?? "").trim();

    if (text === "" || text === "--") return null;

    const num = Number(text);

    return isNaN(num) ? null : num;
  }

  function getTierStyle(value) {
    return getTierStyleFromValue(value);
  }

  function getRatingColor(value) {
    const text = String(value ?? "").replace(/,/g, "").trim();

    if (text === "" || text === "--") return "";

    const num = Number(text);

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
      target.innerHTML = `<p class="movie-compare-placeholder">Select a movie in the search box above.</p>`;
      return;
    }

    target.innerHTML = `
      <h3>${escapeHTML(movie["Movie Title"])}</h3>

      <div class="movie-compare-meta">
        <span>${escapeHTML(movie["Year"])}</span>
        <span style="${getTierStyle(movie["Tier"])}">${escapeHTML(formatValue(movie["Tier"]))}</span>
        <span style="${getRatingColor(movie["My Rating"])}">${escapeHTML(formatValue(movie["My Rating"]))}</span>
        <span>${escapeHTML(formatRank(movie["Rk"]))}</span>
      </div>

      <dl class="movie-compare-details">
        <div>
          <dt>vs. IMDB</dt>
          <dd>${escapeHTML(formatValue(movie["vs. IMDB"]))}</dd>
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

  function renderCategoryBattleWinner() {
    if (!categoryWinner) return;

    if (!leftMovie || !rightMovie) {
      categoryWinner.className = "movie-category-winner";
      categoryWinner.textContent = "Select two movies above to see the factor battle winner.";
      return;
    }

    let leftWins = 0;
    let rightWins = 0;
    let ties = 0;

    factorColumns.forEach(factor => {
      const leftValue = getNumber(leftMovie[factor]);
      const rightValue = getNumber(rightMovie[factor]);

      if (leftValue === null || rightValue === null) return;

      if (leftValue > rightValue) {
        leftWins++;
      } else if (rightValue > leftValue) {
        rightWins++;
      } else {
        ties++;
      }
    });

    const leftTitle = makeMovieLabel(leftMovie);
    const rightTitle = makeMovieLabel(rightMovie);

    categoryWinner.classList.remove("left-winner");
    categoryWinner.classList.remove("right-winner");
    categoryWinner.classList.remove("tie-winner");

    if (leftWins > rightWins) {
      categoryWinner.classList.add("left-winner");
      categoryWinner.innerHTML = `
        <strong>${escapeHTML(leftTitle)}</strong> wins the factor battle 
        <span>${leftWins}-${rightWins}${ties > 0 ? `, with ${ties} tie${ties === 1 ? "" : "s"}` : ""}</span>
      `;
      return;
    }

    if (rightWins > leftWins) {
      categoryWinner.classList.add("right-winner");
      categoryWinner.innerHTML = `
        <strong>${escapeHTML(rightTitle)}</strong> wins the factor battle 
        <span>${rightWins}-${leftWins}${ties > 0 ? `, with ${ties} tie${ties === 1 ? "" : "s"}` : ""}</span>
      `;
      return;
    }

    categoryWinner.classList.add("tie-winner");
    categoryWinner.innerHTML = `
      <strong>Factor battle is tied</strong>
      <span>${leftWins}-${rightWins}${ties > 0 ? `, with ${ties} tie${ties === 1 ? "" : "s"}` : ""}</span>
    `;
  }

  function renderFactorComparison() {
    renderCategoryBattleWinner();
    renderFactorMatchupHeader();

    if (!leftMovie && !rightMovie) {
      factorComparison.innerHTML = `<p class="movie-compare-placeholder">Select two movies above to compare factor scores.</p>`;
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
        status.textContent = "";
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

/* TV SHOW CARD */
window.loadTVShowCard = async function loadTVShowCard(tvShowsPath, episodesPath) {
  const selectInput = document.getElementById("tv-show-card-select");
  const datalist = document.getElementById("tv-show-card-options");
  const output = document.getElementById("tv-show-card-output");
  const status = document.getElementById("tv-show-card-status");
  const suggestionsBox = document.getElementById("tv-show-card-suggestions");

  if (!selectInput || !datalist || !output) return;

  async function fetchCSVTextForTVCard(filePath) {
    return await getCSVText(filePath);
  }

  function parseCSVRows(text) {
    const parsed = Papa.parse(text.trim(), {
      header: true,
      skipEmptyLines: true
    });

    return parsed.data.filter(row => {
      return Object.values(row).some(value => String(value ?? "").trim() !== "");
    });
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getText(row, column) {
    return String(row?.[column] ?? "").trim();
  }

  function formatYearRange(showRow) {
  const startYear = getText(showRow, "Year Start");
  const endYear = getText(showRow, "Year DONE");

  if (startYear === "" && endYear === "") {
    return "—";
  }

  if (startYear !== "" && endYear === "") {
    return `${startYear} - Present`;
  }

  if (startYear !== "" && endYear !== "") {
    return `${startYear} - ${endYear}`;
  }

  return endYear;
}
  function formatValue(value) {
  const text = String(value ?? "").trim();
  return text === "" ? "—" : text;
}

function formatTagsForInfo(value) {
  return String(value ?? "")
    .split(";")
    .map(tag => tag.trim())
    .filter(Boolean)
    .join("\n");
}

function formatRankWithHash(value) {
  const text = String(value ?? "").trim();

  if (text === "" || text === "—" || text === "--") {
    return "—";
  }

  if (text.startsWith("#")) {
    return text;
  }

  return `#${text}`;
}

function getNumber(value) {
    const text = String(value ?? "").replace(/,/g, "").trim();

    if (text === "" || text === "--") return null;

    const num = Number(text);

    return isNaN(num) ? null : num;
  }

  function getShowTitle(row) {
    return getText(row, "TV Show");
  }

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function getRankColor(value) {
    const colors = getFactorColor(value);

    if (colors.bg === "" || colors.text === "") {
      return {
        bg: "#1f1f1f",
        text: "#aaa"
      };
    }

    return colors;
  }

  function getTierStyle(value) {
    const colors = getTierColor(value);

    if (colors.bg === "" || colors.text === "") {
      return { bg: "#1f1f1f", text: "#f5f5f5" };
    }

    return colors;
  }

  function makeStatBox(label, value, extraClass = "") {
    return `
      <div class="tv-card-stat ${extraClass}">
        <span>${escapeHTML(label)}</span>
        <strong>${escapeHTML(formatValue(value))}</strong>
      </div>
    `;
  }

  function getAverageEpisodeRank(episodeRows) {
    const ranks = episodeRows
      .map(row => getNumber(row["Rank"]))
      .filter(value => value !== null);

    if (ranks.length === 0) return "—";

    const total = ranks.reduce((sum, value) => sum + value, 0);
    return (total / ranks.length).toFixed(2);
  }

  function countRankedEpisodes(episodeRows) {
    return episodeRows.filter(row => getNumber(row["Rank"]) !== null).length;
  }

  function renderCategoricalRanks(showRow) {
    const factors = [
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

    return `
      <section class="tv-card-panel">
        <h3>Categorical Ranks</h3>

        <div class="tv-card-factor-grid">
          ${factors.map(factor => {
            const value = getText(showRow, factor);
            const colors = getRankColor(value);

            return `
              <div class="tv-card-factor-row">
                <span>${escapeHTML(factor)}</span>
                <strong style="background:${colors.bg}; color:${colors.text};">
                  ${escapeHTML(formatValue(value))}
                </strong>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderRankCountChart(episodeRows) {
    const counts = {};

    for (let rank = 1; rank <= 10; rank++) {
      counts[rank] = 0;
    }

    episodeRows.forEach(row => {
      const rank = getNumber(row["Rank"]);

      if (rank !== null) {
        const roundedRank = Math.round(rank);

        if (roundedRank >= 1 && roundedRank <= 10) {
          counts[roundedRank]++;
        }
      }
    });

    const maxCount = Math.max(...Object.values(counts), 1);

    return `
      <section class="tv-card-panel">
        <h3>Episode Counts per Rank</h3>

        <div class="tv-card-rank-chart">
          ${Object.keys(counts).reverse().map(rank => {
            const count = counts[rank];
            const width = count === 0 ? 0 : Math.max(4, (count / maxCount) * 100);
            const colors = getRankColor(rank);

            return `
              <div class="tv-card-rank-chart-row">
                <span class="tv-card-rank-label">${rank}</span>

                <div class="tv-card-rank-bar-track">
                  <div 
                    class="tv-card-rank-bar"
                    style="width:${width}%; background:${colors.bg};"
                  ></div>
                </div>

                <span class="tv-card-rank-count">${count}</span>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderShowInfo(showRow, episodeRows) {
    const rankedEpisodes = countRankedEpisodes(episodeRows);
    const averageEpisodeRank = getAverageEpisodeRank(episodeRows);

    return `
      <section class="tv-card-panel tv-card-full-width tv-card-show-info-panel">
        <h3>Show Info</h3>

       <div class="tv-card-info-grid tv-card-info-grid-compact">
          ${makeStatBox("Times Seen", getText(showRow, "Times Seen"), "tv-card-times-seen-stat")}
          ${makeStatBox("Years", getText(showRow, "Years"), "tv-card-years-stat")}
          ${makeStatBox("Seasons", getText(showRow, "Seasons"), "tv-card-seasons-stat")}
          ${makeStatBox("Episodes", getText(showRow, "Episodes"), "tv-card-episodes-stat")}
          ${makeStatBox("Ranked Episodes", rankedEpisodes, "tv-card-ranked-episodes-stat")}
          ${makeStatBox("Watched", getText(showRow, "Watched / Unwatched"), "tv-card-watched-stat")}
          ${makeStatBox("Tags", formatTagsForInfo(getText(showRow, "Tags")), "tv-card-tags-stat")}
          ${makeStatBox("Average Episode Rank", averageEpisodeRank, "tv-card-average-episode-rank-stat")}
        </div>
      </section>
    `;
  }

  let tvCardEpisodeGridLayout = "blocks";

function renderEpisodeGridControls() {
  const blocksActive = tvCardEpisodeGridLayout === "blocks";
  const columnsActive = tvCardEpisodeGridLayout === "columns";

  return `
    <div class="tv-card-episode-grid-toolbar">
      <span>Grid View</span>

      <button
        id="tvCardEpisodeGridBlocks"
        class="tv-card-grid-toggle ${blocksActive ? "active" : ""}"
        type="button"
      >
        Season Blocks
      </button>

      <button
        id="tvCardEpisodeGridColumns"
        class="tv-card-grid-toggle ${columnsActive ? "active" : ""}"
        type="button"
      >
        Season Columns
      </button>
    </div>
  `;
}

function setupTVCardEpisodeGridControls(showRow, episodeRows) {
  const blocksButton = document.getElementById("tvCardEpisodeGridBlocks");
  const columnsButton = document.getElementById("tvCardEpisodeGridColumns");

  if (blocksButton) {
    blocksButton.addEventListener("click", function () {
      tvCardEpisodeGridLayout = "blocks";
      renderTVShowCard(showRow, episodeRows);
    });
  }

  if (columnsButton) {
    columnsButton.addEventListener("click", function () {
      tvCardEpisodeGridLayout = "columns";
      renderTVShowCard(showRow, episodeRows);
    });
  }
}

function getEpisodeSortNumber(row) {
  return getNumber(row["Season Epi #"]) ?? getNumber(row["Episode Number"]) ?? 0;
}

function getEpisodesGroupedBySeason(episodeRows) {
  const seasons = {};

  episodeRows.forEach(row => {
    const season = getText(row, "Season") || "Unknown";

    if (!seasons[season]) {
      seasons[season] = [];
    }

    seasons[season].push(row);
  });

  const sortedSeasons = Object.keys(seasons).sort((a, b) => {
    const numA = Number(a);
    const numB = Number(b);

    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;

    return a.localeCompare(b);
  });

  sortedSeasons.forEach(season => {
    seasons[season].sort((a, b) => {
      return getEpisodeSortNumber(a) - getEpisodeSortNumber(b);
    });
  });

  return { seasons, sortedSeasons };
}

function renderEpisodeGrid(episodeRows) {
  if (episodeRows.length === 0) {
    return `
      <section class="tv-card-panel tv-card-full-width">
        <h3>Episode Grid</h3>
        <p class="movie-compare-placeholder">No episode rows found for this show.</p>
      </section>
    `;
  }

  if (tvCardEpisodeGridLayout === "columns") {
    return renderEpisodeGridAsSeasonColumns(episodeRows);
  }

  return renderEpisodeGridAsSeasonBlocks(episodeRows);
}

function renderEpisodeGridAsSeasonBlocks(episodeRows) {
  const { seasons, sortedSeasons } = getEpisodesGroupedBySeason(episodeRows);

  return `
    <section class="tv-card-panel tv-card-full-width">
      <h3>Episode Grid</h3>

      ${renderEpisodeGridControls()}

      <div class="tv-card-episode-grid">
        ${sortedSeasons.map(season => {
          const rows = seasons[season];

          return `
            <div class="tv-card-season-block">
              <h4>S${escapeHTML(season)}</h4>

              <div class="tv-card-season-episodes">
                ${rows.map(row => {
                  const rank = getText(row, "Rank");
                  const colors = getRankColor(rank);
                  const episodeTitle = getText(row, "Episode Title");
                  const episodeNumber = getText(row, "Season Epi #") || getText(row, "Episode Number");

                  return `
                    <div
                      class="tv-card-episode-cell"
                      style="background:${colors.bg}; color:${colors.text};"
                      title="S${escapeHTML(season)}E${escapeHTML(episodeNumber)}: ${escapeHTML(episodeTitle)}"
                    >
                     <span>${escapeHTML(formatValue(rank))}</span>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderEpisodeGridAsSeasonColumns(episodeRows) {
  const { seasons, sortedSeasons } = getEpisodesGroupedBySeason(episodeRows);

  const maxEpisodeCount = Math.max(
    ...sortedSeasons.map(season => seasons[season].length),
    0
  );

  return `
    <section class="tv-card-panel tv-card-full-width">
      <h3>Episode Grid</h3>

      ${renderEpisodeGridControls()}

      <div class="tv-card-episode-matrix-wrap">
        <table class="tv-card-episode-matrix">
          <thead>
            <tr>
              <th class="tv-card-episode-count-header">#</th>
              ${sortedSeasons.map(season => {
                return `<th>S${escapeHTML(season)}</th>`;
              }).join("")}
            </tr>
          </thead>

          <tbody>
            ${Array.from({ length: maxEpisodeCount }, (_, index) => {
              const episodeNumber = index + 1;

              return `
                <tr>
                  <th class="tv-card-episode-row-number">${episodeNumber}</th>

                  ${sortedSeasons.map(season => {
                    const rows = seasons[season];

                    const row =
                      rows.find(item => getEpisodeSortNumber(item) === episodeNumber) ||
                      rows[index];

                    if (!row) {
                      return `<td class="tv-card-episode-matrix-empty"></td>`;
                    }

                    const rank = getText(row, "Rank");
                    const colors = getRankColor(rank);
                    const episodeTitle = getText(row, "Episode Title");
                    const seasonEpisodeNumber = getText(row, "Season Epi #") || episodeNumber;

                    return `
                      <td>
                        <div
                          class="tv-card-episode-matrix-cell"
                          style="background:${colors.bg}; color:${colors.text};"
                          title="S${escapeHTML(season)}E${escapeHTML(seasonEpisodeNumber)}: ${escapeHTML(episodeTitle)}"
                        >
                          <span class="tv-card-matrix-rank">${escapeHTML(formatValue(rank))}</span>
                          <span class="tv-card-matrix-title">${escapeHTML(episodeTitle)}</span>
                        </div>
                      </td>
                    `;
                  }).join("")}
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

  function renderNotes(showRow) {
    const notes = getText(showRow, "Notes (Review)");

    if (notes === "") return "";

    return `
      <section class="tv-card-panel tv-card-full-width">
        <h3>Notes</h3>
        <p class="tv-card-notes">${escapeHTML(notes)}</p>
      </section>
    `;
  }
  
  // TV Show Card
  function renderTVShowCard(showRow, episodeRows) {
    const showTitle = getShowTitle(showRow);
    const rating = getText(showRow, "My Rating");
    const rank = getText(showRow, "Rk");
    const tier = getText(showRow, "Tier");
    const tierStyle = getTierStyle(tier);

    output.innerHTML = `
      <div class="tv-show-card">
        <div class="tv-card-title-row">
          <div>
            <h3>${escapeHTML(showTitle)}</h3>
            <p>
              ${escapeHTML(formatYearRange(showRow))}
            </p>
          </div>

          <div class="tv-card-title-stats">
            <div class="tv-card-score-box">
              <span>Rating</span>
              <strong>${escapeHTML(formatValue(rating))}</strong>
            </div>
          
            <div class="tv-card-score-box">
              <span>Rank</span>
              <strong>${escapeHTML(formatRankWithHash(rank))}</strong>
            </div>
          
            <div class="tv-card-score-box">
              <span>Tier</span>
              <strong style="background:${tierStyle.bg}; color:${tierStyle.text};">
                ${escapeHTML(formatValue(tier))}
              </strong>
            </div>
          </div>
        </div>

        <div class="tv-card-main-grid">
          ${renderShowInfo(showRow, episodeRows)}
        
          <div class="tv-card-side-by-side-panels">
            ${renderRankCountChart(episodeRows)}
            ${renderCategoricalRanks(showRow)}
          </div>
        
          ${renderNotes(showRow)}
          ${renderEpisodeGrid(episodeRows)}
        </div>
      </div>
    `;

    setupTVCardEpisodeGridControls(showRow, episodeRows);
    
    if (status) {
      status.hidden = true;
    }
  }

  let tvShowRows = [];
  let episodeRows = [];

  try {
    const [showsText, episodesText] = await Promise.all([
      fetchCSVTextForTVCard(tvShowsPath),
      fetchCSVTextForTVCard(episodesPath)
    ]);

    tvShowRows = parseCSVRows(showsText);
    episodeRows = parseCSVRows(episodesText);
  } catch (error) {
    console.error("TV show card failed to load:", error);

    output.innerHTML = `
      <p class="movie-compare-placeholder">
        Could not load TV show card data. Check the published CSV links.
      </p>
    `;

    if (status) {
      status.textContent = "TV show card data failed to load.";
    }

    return;
  }

  const showOptions = tvShowRows
    .map(row => getShowTitle(row))
    .filter(title => title !== "")
    .sort((a, b) => a.localeCompare(b));

  datalist.innerHTML = showOptions
    .map(title => `<option value="${escapeHTML(title)}"></option>`)
    .join("");

  function getFilteredTVShowOptions(value) {
  const searchValue = normalize(value);

  if (searchValue === "") {
    return showOptions.slice(0, 12);
  }

  return showOptions
    .filter(title => normalize(title).includes(searchValue))
    .slice(0, 12);
}

function hideTVShowSuggestions() {
  if (!suggestionsBox) return;

  suggestionsBox.hidden = true;
  suggestionsBox.innerHTML = "";
}

function chooseTVShowSuggestion(title) {
  selectInput.value = title;
  hideTVShowSuggestions();
  updateCardFromInput();
}
  
function renderTVShowSuggestions() {
  if (!suggestionsBox) return;

  const matches = getFilteredTVShowOptions(selectInput.value);

  if (matches.length === 0) {
    hideTVShowSuggestions();
    return;
  }

  suggestionsBox.innerHTML = matches
    .map(title => {
      return `
        <button
          class="tv-card-suggestion-option"
          type="button"
          data-tv-show-title="${escapeHTML(title)}"
        >
          ${escapeHTML(title)}
        </button>
      `;
    })
    .join("");

  suggestionsBox.hidden = false;

 suggestionsBox.querySelectorAll(".tv-card-suggestion-option").forEach(button => {
  button.addEventListener("mousedown", function (event) {
    event.preventDefault();

    const title = button.dataset.tvShowTitle || "";
    chooseTVShowSuggestion(title);
  });

  button.addEventListener("click", function (event) {
    event.preventDefault();

    const title = button.dataset.tvShowTitle || "";
    chooseTVShowSuggestion(title);
  });
});
}

  function findShowByInput(value) {
    const searchValue = normalize(value);

    if (searchValue === "") return null;

    return tvShowRows.find(row => normalize(getShowTitle(row)) === searchValue) || null;
  }

  function getEpisodesForShow(showTitle) {
    return episodeRows.filter(row => {
      return normalize(row["TV Show"]) === normalize(showTitle);
    });
  }

  function updateCardFromInput() {
    const showRow = findShowByInput(selectInput.value);

    if (!showRow) {
     output.innerHTML = "";

      if (status) {
        status.hidden = false;
        status.textContent = "Select a TV show to generate a card.";
      }

      return;
    }

    const showTitle = getShowTitle(showRow);
    const showEpisodes = getEpisodesForShow(showTitle);

    renderTVShowCard(showRow, showEpisodes);
  }

  selectInput.addEventListener("focus", renderTVShowSuggestions);

selectInput.addEventListener("change", function () {
  updateCardFromInput();
  hideTVShowSuggestions();
});

selectInput.addEventListener("input", function () {
  renderTVShowSuggestions();

  const showRow = findShowByInput(selectInput.value);

  if (showRow) {
    updateCardFromInput();
  }
});

document.addEventListener("click", function (event) {
  if (!suggestionsBox) return;

  const clickedInsideSuggestions = suggestionsBox.contains(event.target);
  const clickedInput = event.target === selectInput;

  if (!clickedInsideSuggestions && !clickedInput) {
    hideTVShowSuggestions();
  }
});
}

// load flags game //
window.loadFlagsGame = function loadFlagsGame(filePath) {
  const startGameButton = document.getElementById("flagsStartGameButton");
  const setupSummaryEl = document.getElementById("flagsSetupSummary");
  const selectedGameSummaryEl = document.getElementById("flagsSelectedGameSummary");
  
  const startScreen = document.getElementById("flagsStartScreen");
  const playScreen = document.getElementById("flagsPlayScreen");
  const modeButtons = document.querySelectorAll(".flags-mode-button");
  const sortSelect = document.getElementById("flagsSortSelect");

  const playStyleToggle = document.getElementById("flagsPlayStyleToggle");
  const playStyleDescriptionEl = document.getElementById("flagsPlayStyleDescription");
  const layoutToggle = document.getElementById("flagsLayoutToggle");
  const suggestionsToggle = document.getElementById("flagsSuggestionsToggle");
  const answerSuggestions = document.getElementById("flagsAnswerSuggestions");

  const currentModeLabel = document.getElementById("flagsCurrentModeLabel");
  const changeGameButton = document.getElementById("flagsChangeGameButton");
  const resetButton = document.getElementById("flagsResetButton");

  const scoreEl = document.getElementById("flagsScore");
  const streakEl = document.getElementById("flagsStreak");
  const hintsEl = document.getElementById("flagsHints");
  const remainingEl = document.getElementById("flagsRemaining");
  const progressTextEl = document.getElementById("flagsProgressText");
  const progressFillEl = document.getElementById("flagsProgressFill");
  const debugEl = document.getElementById("flagsDebug");

  const leaderboardUrl = window.FLAGS_LEADERBOARD_URL || "";
  const highScoreEl = document.getElementById("flagsHighScore");
  const timerEl = document.getElementById("flagsTimer");
  const timerSelect = document.getElementById("flagsTimerSelect");
  const endGameButton = document.getElementById("flagsEndGameButton");
  
  const gridEl = document.getElementById("flagsGrid");
  const flagImageWrap = document.getElementById("flagsImageWrap");
  const flagImage = document.getElementById("flagsImage");
  const promptText = document.getElementById("flagsPromptText");

  const answerInput = document.getElementById("flagsAnswerInput");
  const submitButton = document.getElementById("flagsSubmitButton");
  const hintButton = document.getElementById("flagsHintButton");
  const revealButton = document.getElementById("flagsRevealButton");
  const skipButton = document.getElementById("flagsSkipButton");

  const feedbackEl = document.getElementById("flagsFeedback");
  const detailsEl = document.getElementById("flagsDetails");

  const answerArea = document.querySelector(".flags-answer-area");
  const actionRow = document.querySelector(".flags-action-row");

  const timerFloatingEl = document.getElementById("flagsTimerFloating");
  const pauseButton = document.getElementById("flagsPauseButton");
  const pauseOverlay = document.getElementById("flagsPauseOverlay");
  const resumeButton = document.getElementById("flagsResumeButton");

  const pauseModeLabel = document.getElementById("flagsPauseModeLabel");
  const topScoresPanel = document.getElementById("flagsTopScoresPanel");
  const topScoresList = document.getElementById("flagsTopScoresList");

  const gameModes = {
    "flag-country": {
      label: "Guess Country from Flag",
      answerPlaceholder: "Type the country name...",
      questionType: "flag",
      filter: row => isYes(row.country) && !isUSState(row) && !isCanadianProvinceOrTerritory(row),
      answerKind: "name"
    },

    "flag-us-state": {
      label: "Guess U.S. State from Flag",
      answerPlaceholder: "Type the U.S. state name...",
      questionType: "flag",
      filter: row => isUSState(row),
      answerKind: "name"
    },

    "flag-canada-province": {
      label: "Guess Canadian Province/Territory from Flag",
      answerPlaceholder: "Type the province or territory name...",
      questionType: "flag",
      filter: row => isCanadianProvinceOrTerritory(row),
      answerKind: "name"
    },

    "flag-fifa": {
      label: "Guess FIFA nation from Flag",
      answerPlaceholder: "Type the FIFA association name...",
      questionType: "flag",
      filter: row => isYes(row.fifa),
      answerKind: "name"
    },

    "flag-all": {
      label: "Guess ALL from Flag",
      answerPlaceholder: "Type the flag name...",
      questionType: "flag",
      filter: row => true,
      answerKind: "name"
    },

    "capital-to-country": {
      label: "Guess Country from Capital City",
      answerPlaceholder: "Type the country name...",
      questionType: "capital-to-country",
      filter: row => isYes(row.country) && row.capital !== "",
      answerKind: "name"
    },

    "country-to-capital": {
      label: "Guess Capital City from Country",
      answerPlaceholder: "Type the capital city...",
      questionType: "country-to-capital",
      filter: row => isYes(row.country) && row.capital !== "",
      answerKind: "capital"
    },

    "us-state-capital": {
      label: "Guess U.S. State Capital",
      answerPlaceholder: "Type the state capital...",
      questionType: "country-to-capital",
      filter: row => isUSState(row) && row.capital !== "",
      answerKind: "capital"
    },

    "canada-province-capital": {
      label: "Guess Canadian Province/Territory Capital",
      answerPlaceholder: "Type the provincial or territorial capital...",
      questionType: "country-to-capital",
      filter: row => isCanadianProvinceOrTerritory(row) && row.capital !== "",
      answerKind: "capital"
    },

    "north-america-subnational-capital": {
      label: "Guess North American Province/Territory/State Capital",
      answerPlaceholder: "Type the capital...",
      questionType: "country-to-capital",
      filter: row => isNorthAmericanSubnational(row) && row.capital !== "",
      answerKind: "capital"
    },

    "north-america-subnational-flag": {
      label: "Guess North American Province/Territory/State Flag",
      answerPlaceholder: "Type the state, province, or territory...",
      questionType: "flag",
      filter: row => isNorthAmericanSubnational(row) && row.imageUrl !== "",
      answerKind: "name"
    }
  };

  let csvLoaded = false;
  let allFlags = [];
  let activeFlags = [];
  let activeModeId = "";
  let activeSortId = "random";
  let activePlayStyle = "information";
  let activeLayoutStyle = "single";
  let activeSuggestions = "off";
  
  let activeTimerLimitSeconds = 0;
  let timerIntervalId = null;
  let gameStartTimestamp = 0;
  let gameEndTimestamp = 0;
  let gameEndedByGiveUp = false;
  let gamePaused = false;
  let pauseStartTimestamp = 0;
  let totalPausedMilliseconds = 0;
  
  let currentIndex = 0;
  let score = 0;
  let attempts = 0;
  let streak = 0;
  let hintsUsed = 0;
  let answeredCurrent = false;
  let selectedModeId = "";

 if (!filePath) {
      showStartScreen();
    
      if (debugEl) {
        debugEl.textContent = "Missing FLAGS_CSV_URL.";
      }
    
      return;
    }
    
updateGameSetupSummary();
updatePlayStyleDescription();
showStartScreen();

  if (debugEl) {
    debugEl.textContent = "Loading flags CSV...";
  }

  Papa.parse(filePath, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const rawRows = results.data || [];

      allFlags = rawRows
        .map(cleanFlagRow)
        .filter(row => row.name);

      csvLoaded = true;

      if (debugEl) {
        debugEl.textContent = `CSV rows loaded: ${rawRows.length}`;
      }

      console.log("Flags CSV results:", results);
      console.log("Cleaned flags:", allFlags);
    },
    error: function (error) {
      console.error("Flags CSV error:", error);

      if (debugEl) {
        debugEl.textContent = "CSV loading failed. Check published CSV URL.";
      }
    }
  });

  function cleanFlagRow(row) {
    const name = cleanCell(row["Flag Name"]);
    const alt = cleanCell(row["Alt. Spelling"]);
    const type = cleanCell(row["Type"]);
    const country = cleanCell(row["Country"]);
    const fifa = cleanCell(row["FIFA Member"]);
    const capital = cleanCell(row["Capital"]);
    const capitalAlt = cleanCell(row["Capital Alt. Spelling"]);
    const population = cleanCell(row["Population"] || row["Population_2026"]);
    const code = cleanCell(row["Code"]);
    const link = cleanCell(row["Link"]);

    const imageUrl = normalizeDriveImageUrl(link);

    return {
      name,
      alt,
      type,
      country,
      fifa,
      capital,
      capitalAlt,
      population,
      code,
      imageUrl
    };
  }

  function cleanCell(value) {
    return String(value ?? "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeDriveImageUrl(url) {
    let text = cleanCell(url);

    if (!text) return "";

    text = text
      .replace(/&amp;/g, "&")
      .replace(/\\&/g, "&");

    const markdownMatch = text.match(/\((https:\/\/drive\.google\.com\/[^)]+)\)/);
    if (markdownMatch) {
      text = markdownMatch[1];
    }

    const hrefMatch = text.match(/href=["']([^"']+)["']/);
    if (hrefMatch) {
      text = hrefMatch[1];
    }

    const fileIdMatch =
      text.match(/\/d\/([A-Za-z0-9_-]+)/) ||
      text.match(/[?&]id=([A-Za-z0-9_-]+)/);

    if (fileIdMatch) {
      return "https://drive.google.com/thumbnail?id=" + fileIdMatch[1] + "&sz=w1000";
    }

    return text;
  }

  function showStartScreen() {
    activeModeId = "";
    activeFlags = [];
    currentIndex = 0;
    score = 0;
    attempts = 0;
    streak = 0;
    hintsUsed = 0;
    answeredCurrent = false;

    startScreen.hidden = false;
    playScreen.hidden = true;

    playScreen.classList.remove("flags-grid-layout-active");
    playScreen.classList.remove("flags-large-grid-feedback");

    if (gridEl) {
      gridEl.hidden = true;
      gridEl.innerHTML = "";
    }

    if (flagImage) {
      flagImage.removeAttribute("src");
    }

    if (feedbackEl) {
      feedbackEl.textContent = "";
      feedbackEl.className = "flags-feedback";
    }

    if (detailsEl) {
      detailsEl.innerHTML = "";
    }
    
    if (highScoreEl) {
      highScoreEl.textContent = "High Score: --";
    }
    
    updateScore();
  }

  function startGame(modeId) {
    const config = gameModes[modeId];

    if (!config) return;

    if (!csvLoaded) {
      if (debugEl) {
        debugEl.textContent = "Flags CSV is still loading. Try again in a moment.";
      }

      return;
    }

    activeModeId = modeId;
    activeSortId = sortSelect ? sortSelect.value : "random";
    activePlayStyle = playStyleToggle ? playStyleToggle.dataset.playStyle || "information" : "information";
    activeLayoutStyle = layoutToggle ? layoutToggle.dataset.layoutStyle || "single" : "single";
    activeSuggestions = suggestionsToggle ? suggestionsToggle.dataset.suggestions || "off" : "off";
    const selectedTimerValue = timerSelect ? timerSelect.value || "0" : "0";

      activeTimerLimitSeconds = selectedTimerValue === "stopwatch"
        ? -1
        : Number(selectedTimerValue || 0);

    gameStartTimestamp = Date.now();
    gameEndTimestamp = 0;
    gameEndedByGiveUp = false;
    gamePaused = false;
    pauseStartTimestamp = 0;
    totalPausedMilliseconds = 0;
    
    if (playScreen) {
      playScreen.classList.remove("flags-game-paused");
      playScreen.classList.remove("flags-game-ended");
    }
    
    if (pauseOverlay) {
      pauseOverlay.hidden = true;
    }

    activeFlags = allFlags
      .filter(row => config.filter(row))
      .filter(row => {
        if (config.questionType === "flag") {
          return row.imageUrl !== "";
        }

        return row.capital !== "";
      })
      .map(row => ({
        ...row,
        completed: false,
        correct: false,
        revealed: false,
        skipped: false,
        hintUsed: false,
        attemptCount: 0
      }));

    activeFlags = sortGameRows(activeFlags, activeSortId);
    updateAnswerSuggestions();

    currentIndex = 0;
    score = 0;
    attempts = 0;
    streak = 0;
    hintsUsed = 0;
    answeredCurrent = false;

    startScreen.hidden = true;
    playScreen.hidden = false;
    
    playScreen.classList.toggle("flags-grid-layout-active", activeLayoutStyle === "grid");

    playScreen.classList.toggle(
      "flags-large-grid-feedback",
      activeLayoutStyle === "grid" && activeFlags.length >= 50
    );

    currentModeLabel.innerHTML = `
      <span class="flags-current-mode-name">${escapeHTML(config.label)}</span>
      <span class="flags-current-mode-settings">
        ${escapeHTML(getPlayStyleLabel(activePlayStyle))} • ${escapeHTML(getLayoutStyleLabel(activeLayoutStyle))}
      </span>
    `;
    
    answerInput.placeholder = config.answerPlaceholder;
    answerInput.disabled = false;

    if (debugEl) {
      debugEl.textContent = `Game mode: ${config.label} | Order: ${getSortLabel(activeSortId)} | Layout: ${getLayoutStyleLabel(activeLayoutStyle)} | Play: ${getPlayStyleLabel(activePlayStyle)} | Playable rows: ${activeFlags.length}`;
    }

    startTimer();
    loadHighScore();
    showCurrentQuestion();
    updateScore();
  }

  function changeGameMode() {
    const confirmed = window.confirm(
      "Are you sure you want to change your game mode? Games in progress will be lost."
    );

    if (confirmed) {
      showStartScreen();
    }
  }

  function resetCurrentGame() {
    if (!activeModeId) return;

    const confirmed = window.confirm(
      "Are you sure you want to stop? Unfinished game progress will be lost."
    );

    if (confirmed) {
      startGame(activeModeId);
    }
  }

  function showCurrentQuestion() {
   setGameplayControlsVisible(true);
    
    const config = gameModes[activeModeId];

    answeredCurrent = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "flags-feedback";
    detailsEl.innerHTML = "";
    answerInput.value = "";

    if (!config) {
      showStartScreen();
      return;
    }

    if (!activeFlags.length) {
      showNoRowsFound();
      return;
    }

    if (allQuestionsCompleted()) {
      showGameComplete();
      return;
    }

    if (activeLayoutStyle === "grid") {
      showGridQuestion();
    } else {
      showSingleQuestion();
    }

    updateScore();

    setTimeout(() => {
      answerInput.focus();
    }, 50);
  }

  function showNoRowsFound() {
    setGameplayControlsVisible(false);
    
    if (gridEl) {
      gridEl.hidden = true;
      gridEl.innerHTML = "";
    }

    flagImage.removeAttribute("src");
    flagImageWrap.hidden = true;
    promptText.hidden = true;

    feedbackEl.textContent = "No playable rows found for this game mode yet.";
    updateScore();
  }

 function setGameplayControlsVisible(isVisible) {
  if (answerArea) {
    answerArea.hidden = !isVisible;
  }

  if (actionRow) {
    actionRow.hidden = !isVisible;
  }
}
  
 function showGameComplete(gaveUp = false, timedOut = false) {
      stopTimer();
      setGameplayControlsVisible(false);
    
      if (playScreen) {
        playScreen.classList.add("flags-game-ended");
      }
    
      if (infoPanel) {
        infoPanel.classList.remove("flags-info-panel-minimized");
        updateInfoPanelToggle();
      }
    
      if (!gameEndTimestamp) {
        gameEndTimestamp = Date.now();
      }
    
      gameEndedByGiveUp = gaveUp;
    
      if (gridEl) {
          gridEl.hidden = true;
          gridEl.innerHTML = "";
        }
    
      flagImage.removeAttribute("src");
      flagImageWrap.hidden = true;
      promptText.hidden = true;
    
     const eligibility = getLeaderboardEligibility();

      const totalQuestions = eligibility.totalQuestions;
      const completed = eligibility.completed;
      const completionPercent = eligibility.completionPercent;
      const minimumRequired = eligibility.minimumRequired;
      const leaderboardEligible = eligibility.isEligible;
    
      const accuracyPercent = attempts > 0
        ? Math.round((score / attempts) * 100)
        : 0;
    
      const statusText = timedOut
        ? "Time is up."
        : gaveUp
          ? "Game ended."
          : "Game complete.";
    
      feedbackEl.textContent = statusText;
    
      detailsEl.innerHTML = `
        <div><strong>Final score:</strong> ${score} / ${totalQuestions}</div>
        <div><strong>Accuracy:</strong> ${score} / ${attempts} attempts (${accuracyPercent}%)</div>
        <div><strong>Completed:</strong> ${completed} / ${totalQuestions} (${completionPercent}%)</div>
        <div><strong>Hints used:</strong> ${hintsUsed}</div>
        ${activeTimerLimitSeconds > 0 ? `<div><strong>Time remaining:</strong> ${formatClockTime(getTimeRemainingSeconds())}</div>` : ""}
        <div><strong>Minimum required for leaderboard:</strong> ${minimumRequired} completed</div>
        <div><strong>Leaderboard eligible:</strong> ${leaderboardEligible ? "Yes" : "No"}</div>
        ${getScoreSubmissionHTML()}
      `;
   
   detailsEl.insertAdjacentHTML("beforeend", `
      <div class="flags-end-options-row">
        <button id="flagsPlayAgainButton" class="flags-end-option-button" type="button">
          Play Again
        </button>
    
        <button id="flagsChangeGameEndButton" class="flags-end-option-button flags-change-game-end-button" type="button">
          Change Game
        </button>
      </div>
    `);
    
    const playAgainButton = document.getElementById("flagsPlayAgainButton");
    const changeGameEndButton = document.getElementById("flagsChangeGameEndButton");
    
    if (playAgainButton) {
      playAgainButton.addEventListener("click", function () {
        if (!activeModeId) return;
        startGame(activeModeId);
      });
    }
    
    if (changeGameEndButton) {
      changeGameEndButton.addEventListener("click", function () {
        changeGameMode();
      });
    }
    
      setupScoreSubmissionForm();
      updateScore();
    }
function getCompletedCount() {
  return activeFlags.filter(row => row.completed).length;
}

  const infoPanel = document.getElementById("flagsInfoPanel");
  const infoToggleButton = document.getElementById("flagsInfoToggleButton");

  function updateInfoPanelToggle() {
  if (!infoPanel || !infoToggleButton) return;

  const isMinimized = infoPanel.classList.contains("flags-info-panel-minimized");

  infoToggleButton.textContent = isMinimized ? "Show Info" : "Minimize";
  infoToggleButton.setAttribute("aria-expanded", isMinimized ? "false" : "true");
}
  
function getLeaderboardEligibility() {
  const completed = getCompletedCount();
  const totalQuestions = activeFlags.length;

  const minimumRequired = totalQuestions > 0
    ? Math.ceil(totalQuestions * 0.5)
    : 0;

  const completionPercent = totalQuestions > 0
    ? Math.round((completed / totalQuestions) * 100)
    : 0;

  return {
    completed,
    totalQuestions,
    minimumRequired,
    completionPercent,
    isEligible: totalQuestions > 0 && completed >= minimumRequired
  };
}

function getCompletionPercent() {
  return getLeaderboardEligibility().completionPercent;
}

function isLeaderboardEligible() {
  return getLeaderboardEligibility().isEligible;
}
  
function endCurrentGame() {
  if (!activeModeId || !activeFlags.length) return;

  const confirmed = window.confirm(
    "End this game and submit your current score?"
  );

  if (!confirmed) return;

  showGameComplete(true, false);
}
  
function getScoreSubmissionHTML() {
  if (!leaderboardUrl || !activeModeId) {
    return "";
  }

  const eligibility = getLeaderboardEligibility();

  if (!eligibility.isEligible) {
    return `
      <div class="flags-score-submit-panel">
        <div class="flags-score-submit-title">Public Leaderboard</div>
        <div class="flags-score-submit-status">
          You completed ${eligibility.completed} / ${eligibility.totalQuestions}.
          You need at least ${eligibility.minimumRequired} completed questions to submit a public score.
        </div>
      </div>
    `;
  }

  return `
    <div class="flags-score-submit-panel">
      <div class="flags-score-submit-title">Submit Your Score</div>

      <div class="flags-score-submit-row">
        <input
          id="flagsScoreInitials"
          type="text"
          maxlength="4"
          placeholder="ABCD"
          autocomplete="off"
        >

        <button id="flagsSubmitScoreButton" type="button">
          Submit Score
        </button>
      </div>

      <div id="flagsSubmitScoreStatus" class="flags-score-submit-status"></div>
    </div>
  `;
}

function setupScoreSubmissionForm() {
  const initialsInput = document.getElementById("flagsScoreInitials");
  const submitScoreButton = document.getElementById("flagsSubmitScoreButton");
  const submitScoreStatus = document.getElementById("flagsSubmitScoreStatus");

  if (!initialsInput || !submitScoreButton || !submitScoreStatus) return;

  initialsInput.addEventListener("input", function () {
    initialsInput.value = cleanScoreInitials(initialsInput.value);
  });

  initialsInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitScoreButton.click();
    }
  });

  submitScoreButton.addEventListener("click", function () {
    const initials = cleanScoreInitials(initialsInput.value);

    if (initials.length !== 4) {
      submitScoreStatus.textContent = "Enter exactly 4 letters.";
      return;
    }

    submitPublicScore(initials, submitScoreStatus, submitScoreButton);
  });

  setTimeout(() => {
    initialsInput.focus();
  }, 50);
}

function cleanScoreInitials(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 4);
}

function submitPublicScore(initials, statusEl, buttonEl) {
  if (!leaderboardUrl) {
    statusEl.textContent = "Leaderboard is not connected.";
    return;
  }

  if (!isLeaderboardEligible()) {
    const eligibility = getLeaderboardEligibility();

    statusEl.textContent = `Score not submitted. You completed ${eligibility.completed} / ${eligibility.totalQuestions}, but need ${eligibility.minimumRequired}.`;

    return;
  }

  const config = gameModes[activeModeId];

  if (!config) {
    statusEl.textContent = "Game mode not found.";
    return;
  }

  const completed = getCompletedCount();
  const totalQuestions = activeFlags.length;

  const payload = {
    initials,
    modeId: activeModeId,
    modeLabel: config.label,
    playStyle: getPlayStyleLabel(activePlayStyle),
    layoutStyle: getLayoutStyleLabel(activeLayoutStyle),
    sortOrder: getSortLabel(activeSortId),
    suggestions: getSuggestionsLabel(activeSuggestions),
    score,
    attempts,
    hintsUsed,
    completed,
    totalQuestions,
    gaveUp: gameEndedByGiveUp ? "YES" : "NO",
    timerLimitSeconds: activeTimerLimitSeconds,
    timeUsedSeconds: getTimeUsedSeconds(),
    timeRemainingSeconds: activeTimerLimitSeconds > 0 ? getTimeRemainingSeconds() : "N/A"
  };

  buttonEl.disabled = true;
  statusEl.textContent = "Submitting score...";

  console.log("Submitting leaderboard payload:", payload);

  fetch(leaderboardUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
    .then(() => {
      statusEl.textContent = "Score submitted. Refreshing high score...";
      setTimeout(loadHighScore, 2000);
    })
    .catch(error => {
      console.error("Score submission failed:", error);
      statusEl.textContent = "Score submission failed. Try again.";
      buttonEl.disabled = false;
    });
}

function formatHighScoreTime(record) {
  const timerLimitSeconds = Number(record.timerLimitSeconds || 0);

  const timeUsedSeconds = Number(
    record.timeUsedSeconds ||
    record.timerUsedSeconds ||
    record["Timer Used Seconds"] ||
    0
  );

  const timeRemainingSeconds = Number(
    record.timeRemainingSeconds ||
    record["Time Remaining Seconds"] ||
    0
  );

  if (timerLimitSeconds < 0) {
    return `N/A (${formatClockTime(timeUsedSeconds)})`;
  }

  if (timerLimitSeconds > 0) {
    return `${formatClockTime(timeRemainingSeconds)} (${formatClockTime(timeUsedSeconds)})`;
  }

  return "N/A";
}

function loadHighScore() {
  if (!leaderboardUrl || !highScoreEl || !activeModeId) {
    if (highScoreEl) {
      highScoreEl.textContent = "High Score: --";
    }

    return;
  }

  highScoreEl.textContent = "High Score: Loading...";

  const callbackName = "flagsHighScoreCallback_" + Date.now();

  const url = new URL(leaderboardUrl);
  url.searchParams.set("callback", callbackName);
  url.searchParams.set("modeId", activeModeId);
  url.searchParams.set("playStyle", getPlayStyleLabel(activePlayStyle));
  url.searchParams.set("layoutStyle", getLayoutStyleLabel(activeLayoutStyle));
  url.searchParams.set("suggestions", getSuggestionsLabel(activeSuggestions));
  url.searchParams.set("timerLimitSeconds", String(activeTimerLimitSeconds));
  url.searchParams.set("_", Date.now());

  const script = document.createElement("script");

window[callbackName] = function (data) {
    const highScore = data && data.highScore;
    const topScores = data && data.topScores;
  
    if (highScore) {
      const total = highScore.totalQuestions || highScore.attempts || 0;
      const highScoreTimeText = formatHighScoreTime(highScore);
  
      highScoreEl.textContent = `High Score: ${highScore.initials} ${highScore.score}/${total}, ${highScoreTimeText}`;
    } else {
      highScoreEl.textContent = "High Score: None yet";
    }
  
    renderTopScores(topScores || (highScore ? [highScore] : []));
  
    delete window[callbackName];
    script.remove();
  };

  script.onerror = function () {
    highScoreEl.textContent = "High Score: unavailable";

    delete window[callbackName];
    script.remove();
  };

  script.src = url.toString();
  document.body.appendChild(script);
}

function renderTopScores(scores) {
  if (!topScoresList) return;

  if (!scores || !scores.length) {
    topScoresList.innerHTML = "No scores yet";
    return;
  }

  topScoresList.innerHTML = scores
    .slice(0, 10)
    .map((record, index) => {
      const total = record.totalQuestions || record.attempts || 0;
      const timeText = formatHighScoreTime(record);

      return `
        <div class="flags-top-score-row">
          <span class="flags-top-score-rank">${index + 1}.</span>
          <span class="flags-top-score-name">${escapeHTML(record.initials || "----")}</span>
          <span class="flags-top-score-score">${record.score}/${total}</span>
          <span class="flags-top-score-time">${escapeHTML(timeText)}</span>
        </div>
      `;
    })
    .join("");
}
  
function startTimer() {
  stopTimer();
  updateTimerDisplay();

  if (activeTimerLimitSeconds === 0) return;

  timerIntervalId = window.setInterval(function () {
    updateTimerDisplay();

    if (activeTimerLimitSeconds > 0 && getTimeRemainingSeconds() <= 0) {
      stopTimer();
      showGameComplete(false, true);
    }
  }, 500);
}

function stopTimer() {
  if (timerIntervalId) {
    window.clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}

function getTimeUsedSeconds() {
  if (!gameStartTimestamp) return 0;

  const effectiveNow = gamePaused && pauseStartTimestamp
    ? pauseStartTimestamp
    : gameEndTimestamp || Date.now();

  const elapsedMilliseconds = Math.max(
    0,
    effectiveNow - gameStartTimestamp - totalPausedMilliseconds
  );

  return Math.floor(elapsedMilliseconds / 1000);
}

function getTimeRemainingSeconds() {
  if (activeTimerLimitSeconds <= 0) return 0;

  return Math.max(0, activeTimerLimitSeconds - getTimeUsedSeconds());
}

function updateTimerDisplay() {
  const timerIsOn = activeTimerLimitSeconds !== 0;
  const isStopwatch = activeTimerLimitSeconds < 0;

  const visibleTime = isStopwatch
    ? formatClockTime(getTimeUsedSeconds())
    : formatClockTime(getTimeRemainingSeconds());

  if (timerEl) {
    timerEl.textContent = isStopwatch
      ? `Stopwatch: ${visibleTime}`
      : timerIsOn
        ? `Timer: ${visibleTime}`
        : "Timer: Off";
  }

  if (timerFloatingEl) {
    timerFloatingEl.textContent = timerIsOn ? visibleTime : "";
    timerFloatingEl.hidden = !timerIsOn;
  }

  if (pauseButton) {
    pauseButton.hidden = !timerIsOn;
    pauseButton.textContent = gamePaused ? "Paused" : "Pause";
  }
}

function formatClockTime(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds || 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function pauseGame() {
  if (activeTimerLimitSeconds === 0) return;
  if (gamePaused) return;
  if (gameEndTimestamp) return;

  gamePaused = true;
  pauseStartTimestamp = Date.now();

  stopTimer();

  if (playScreen) {
    playScreen.classList.add("flags-game-paused");
  }

  if (pauseModeLabel) {
      const config = gameModes[activeModeId];
    
      pauseModeLabel.textContent = config
        ? config.label
        : "Current Game";
    }
  
  if (pauseOverlay) {
    pauseOverlay.hidden = false;
  }

  updateTimerDisplay();
}

function resumeGame() {
  if (!gamePaused) return;

  const now = Date.now();

  totalPausedMilliseconds += now - pauseStartTimestamp;
  pauseStartTimestamp = 0;
  gamePaused = false;

  if (playScreen) {
    playScreen.classList.remove("flags-game-paused");
  }

  if (pauseOverlay) {
    pauseOverlay.hidden = true;
  }

  startTimer();

  setTimeout(() => {
    if (answerInput) {
      answerInput.focus();
    }
  }, 50);
}

function setupScoreSubmissionForm() {
  const initialsInput = document.getElementById("flagsScoreInitials");
  const submitScoreButton = document.getElementById("flagsSubmitScoreButton");
  const submitScoreStatus = document.getElementById("flagsSubmitScoreStatus");

  if (!initialsInput || !submitScoreButton || !submitScoreStatus) return;

  initialsInput.addEventListener("input", function () {
    initialsInput.value = cleanScoreInitials(initialsInput.value);
  });

  initialsInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitScoreButton.click();
    }
  });

  submitScoreButton.addEventListener("click", function () {
    const initials = cleanScoreInitials(initialsInput.value);

    if (initials.length !== 4) {
      submitScoreStatus.textContent = "Enter exactly 4 letters.";
      return;
    }

    submitPublicScore(initials, submitScoreStatus, submitScoreButton);
  });

  setTimeout(() => {
    initialsInput.focus();
  }, 50);
}

function cleanScoreInitials(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 4);
}
  
  function showSingleQuestion() {
    if (gridEl) {
      gridEl.hidden = true;
      gridEl.innerHTML = "";
    }

    const current = activeFlags[currentIndex];

    if (!current) {
      showGameComplete();
      return;
    }

    const config = gameModes[activeModeId];

    if (config.questionType === "flag") {
      promptText.hidden = true;
      flagImageWrap.hidden = false;

      flagImage.onerror = function () {
        console.error("Flag image failed:", current.name, current.imageUrl);
        feedbackEl.textContent = "Image failed to load for: " + current.name;
      };

      flagImage.onload = function () {
        feedbackEl.textContent = "";
      };

      flagImage.src = current.imageUrl;
      flagImage.alt = current.name + " flag";
    }

    if (config.questionType === "capital-to-country") {
      flagImage.removeAttribute("src");
      flagImageWrap.hidden = true;
      promptText.hidden = false;
      promptText.textContent = current.capital;
    }

    if (config.questionType === "country-to-capital") {
      flagImage.removeAttribute("src");
      flagImageWrap.hidden = true;
      promptText.hidden = false;
      promptText.textContent = current.name;
    }
  }

  function showGridQuestion() {
    flagImage.removeAttribute("src");
    flagImageWrap.hidden = true;
    promptText.hidden = true;

    if (!gridEl) return;

    gridEl.hidden = false;

    if (!activeFlags[currentIndex] || activeFlags[currentIndex].completed) {
      const nextPending = getNextPendingIndex(currentIndex);

      if (nextPending !== -1) {
        currentIndex = nextPending;
      }
    }

    renderGrid();
  }

  function renderGrid() {
    const config = gameModes[activeModeId];

    if (!gridEl || !config) return;

    gridEl.innerHTML = activeFlags
      .map((row, index) => {
        const classes = ["flags-grid-tile"];

        if (index === currentIndex) {
          classes.push("flags-grid-current");
        }

        if (row.correct) {
          classes.push("flags-grid-correct");
        }

        if (row.revealed) {
          classes.push("flags-grid-revealed");
        }

        if (row.skipped) {
          classes.push("flags-grid-skipped");
        }

        return `
          <button class="${classes.join(" ")}" type="button" data-grid-index="${index}">
            ${getGridTileContent(row, config)}
          </button>
        `;
      })
      .join("");

    gridEl.querySelectorAll(".flags-grid-tile").forEach(tile => {
      tile.addEventListener("click", function () {
        const selectedIndex = Number(tile.dataset.gridIndex);

        if (!Number.isNaN(selectedIndex)) {
          selectGridIndex(selectedIndex);
        }
      });
    });
  }

  function getGridTileContent(row, config) {
    if (config.questionType === "flag") {
      return `<img src="${escapeHTML(row.imageUrl)}" alt="${escapeHTML(row.name)} flag">`;
    }

    return `<div class="flags-grid-prompt">${escapeHTML(getPromptForRow(row, config))}</div>`;
  }

  function getPromptForRow(row, config) {
    if (config.questionType === "capital-to-country") {
      return row.capital;
    }

    if (config.questionType === "country-to-capital") {
      return row.name;
    }

    return row.name;
  }

  function selectGridIndex(index) {
    if (index < 0 || index >= activeFlags.length) return;

    currentIndex = index;
    answerInput.value = "";
    feedbackEl.textContent = "";
    feedbackEl.className = "flags-feedback";
    detailsEl.innerHTML = "";

    const current = activeFlags[currentIndex];

    if (current && current.completed) {
      answeredCurrent = true;

      if (current.correct) {
        feedbackEl.textContent = "Already correct.";
        feedbackEl.className = "flags-feedback flags-feedback-correct";
      } else if (current.revealed) {
        feedbackEl.textContent = "Already revealed.";
        feedbackEl.className = "flags-feedback flags-feedback-reveal";
      } else if (current.skipped) {
        feedbackEl.textContent = "Already skipped.";
      }

      showDetails(current);
    } else {
      answeredCurrent = false;
    }

    renderGrid();
    updateScore();

    setTimeout(() => {
      answerInput.focus();
    }, 30);
  }

  function submitAnswer() {
      if (answeredCurrent) {
        nextQuestion();
        return;
      }
    
      const current = activeFlags[currentIndex];
    
      if (!current) return;
    
      if (current.completed) {
        feedbackEl.textContent = "This one is already complete. Press Tab or click another one.";
        return;
      }
    
      const guess = answerInput.value;
    
      if (!guess.trim()) {
        feedbackEl.textContent = "Type an answer first.";
        return;
      }
    
      const acceptedAnswers = getAcceptedAnswers(current);
    
      attempts += 1;
      current.attemptCount = Number(current.attemptCount || 0) + 1;
    
      if (acceptedAnswers.includes(normalizeAnswer(guess))) {
        handleCorrectAnswer(current);
      } else {
        streak = 0;
    
        feedbackEl.textContent = "Not quite. Try again, or reveal the answer.";
        feedbackEl.className = "flags-feedback flags-feedback-wrong";
    
        updateScore();
      }
    }

  function handleCorrectAnswer(row) {
    score += 1;
    streak += 1;

    row.completed = true;
    row.correct = true;
    row.revealed = false;
    row.skipped = false;

    feedbackEl.textContent = "Correct.";
    feedbackEl.className = "flags-feedback flags-feedback-correct";

    if (activePlayStyle === "speed") {
      answeredCurrent = false;
      detailsEl.innerHTML = "";
      answerInput.value = "";

      if (activeLayoutStyle === "grid") {
        renderGrid();
      }

      updateScore();
      nextQuestion();
      return;
    }

    answeredCurrent = true;
    showDetails(row);

    if (activeLayoutStyle === "grid") {
      renderGrid();
    }

    updateScore();
  }

  function getAcceptedAnswers(row) {
        const config = gameModes[activeModeId];
        const values = [];
      
        if (!config) return [];
      
        if (config.answerKind === "capital") {
          values.push(row.capital);
      
          getAlternateAnswerValues(row.capitalAlt).forEach(item => {
            values.push(item);
          });
        } else {
          values.push(row.name);
      
          getAlternateAnswerValues(row.alt).forEach(item => {
            values.push(item);
          });
      
          if (row.code) {
            values.push(row.code);
          }
        }
      
        return values
          .map(normalizeAnswer)
          .filter(Boolean);
  }

  function getAlternateAnswerValues(value) {
        const text = String(value ?? "").trim();
      
        if (!text) return [];
      
        const delimiter = text.includes(";") ? ";" : ",";
      
        return text
          .split(delimiter)
          .map(item => item.trim())
          .filter(Boolean);
}  
  function normalizeAnswer(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\bthe\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function showHint() {
    const current = activeFlags[currentIndex];
    const config = gameModes[activeModeId];

    if (!current || !config) return;

    if (current.completed) {
      feedbackEl.textContent = "This one is already complete.";
      return;
    }

    const answer = config.answerKind === "capital" ? current.capital : current.name;
    const firstTwoLetters = answer.slice(0, 2);
    const length = answer.length;

    if (!current.hintUsed) {
      current.hintUsed = true;
      hintsUsed += 1;
    }

    feedbackEl.textContent = `Hint: starts with "${firstTwoLetters}" and has ${length} characters including spaces.`;
    feedbackEl.className = "flags-feedback";

    updateScore();
  }

  function revealAnswer() {
        const current = activeFlags[currentIndex];
        const config = gameModes[activeModeId];
      
        if (!current || !config) return;
      
        if (current.completed) {
          feedbackEl.textContent = "This one is already complete.";
          showDetails(current);
          return;
        }
      
        const typedAttemptsForThisItem = Number(current.attemptCount || 0);
      
        if (typedAttemptsForThisItem === 0) {
          attempts += 1;
          current.attemptCount = 1;
        }
      
        streak = 0;
        answeredCurrent = true;
      
        current.completed = true;
        current.correct = false;
        current.revealed = true;
        current.skipped = false;
      
        const answer = config.answerKind === "capital" ? current.capital : current.name;
      
        feedbackEl.textContent = `Answer: ${answer}`;
        feedbackEl.className = "flags-feedback flags-feedback-reveal";
      
        showDetails(current);
      
        if (activeLayoutStyle === "grid") {
          renderGrid();
        }
      
        updateScore();
  }

 function skipQuestion() {
      const current = activeFlags[currentIndex];
    
      if (!current) return;
    
      if (current.completed) {
        nextQuestion();
        return;
      }
    
      streak = 0;
    
      current.skipped = true;
      current.completed = false;
      current.correct = false;
      current.revealed = false;
    
      feedbackEl.textContent = "Skipped. This one will come back later.";
      feedbackEl.className = "flags-feedback";
      detailsEl.innerHTML = "";
      answerInput.value = "";
      answeredCurrent = false;
    
      if (activeLayoutStyle === "grid") {
        renderGrid();
      }
    
      const nextIndex = getNextOtherUncompletedIndex(currentIndex);
    
      if (nextIndex === -1) {
        feedbackEl.textContent = "This is the last unfinished item.";
        updateScore();
        return;
      }
    
      currentIndex = nextIndex;
      showCurrentQuestion();
  }

 function nextQuestion() {
      const nextPending = getNextPendingIndex(currentIndex + 1);
    
        if (nextPending === -1) {
          showGameComplete();
          return;
        }
      
        if (nextPending === currentIndex && activeFlags[currentIndex] && !activeFlags[currentIndex].completed) {
          feedbackEl.textContent = "This is the last unfinished item.";
          updateScore();
          return;
        }
      
        if (activeLayoutStyle === "grid") {
          selectGridIndex(nextPending);
          return;
        }
      
        currentIndex = nextPending;
        showCurrentQuestion();
  }

  function selectNextGridTile() {
    if (activeLayoutStyle !== "grid" || !activeFlags.length) return;

    const nextIndex = (currentIndex + 1) % activeFlags.length;

    selectGridIndex(nextIndex);
  }

  function getNextPendingIndex(startIndex) {
    if (!activeFlags.length) return -1;

    for (let step = 0; step < activeFlags.length; step++) {
      const index = (startIndex + step) % activeFlags.length;

      if (!activeFlags[index].completed) {
        return index;
      }
    }

    return -1;
  }

  function getNextOtherUncompletedIndex(startIndex) {
      if (!activeFlags.length) return -1;
    
      for (let step = 1; step < activeFlags.length; step += 1) {
        const index = (startIndex + step) % activeFlags.length;
        const row = activeFlags[index];
    
        if (row && !row.completed) {
          return index;
        }
      }
    
      return -1;
}
  
  function allQuestionsCompleted() {
    return activeFlags.length > 0 && activeFlags.every(row => row.completed);
  }

  function showDetails(row) {
    const population = row.population ? formatPopulation(row.population) : "";

    detailsEl.innerHTML = `
      <div><strong>Flag Name:</strong> ${escapeHTML(row.name)}</div>
      ${row.type ? `<div><strong>Type:</strong> ${escapeHTML(row.type)}</div>` : ""}
      ${row.capital ? `<div><strong>Capital:</strong> ${escapeHTML(row.capital)}</div>` : ""}
      ${population ? `<div><strong>Population:</strong> ${population}</div>` : ""}
      ${row.code ? `<div><strong>Code:</strong> ${escapeHTML(row.code)}</div>` : ""}
      ${row.fifa ? `<div><strong>FIFA Member:</strong> ${escapeHTML(row.fifa)}</div>` : ""}
    `;
  }

  function formatPopulation(value) {
    const number = Number(
      String(value)
        .replace(/,/g, "")
        .trim()
    );

    if (isNaN(number)) return escapeHTML(value);

    return number.toLocaleString("en-US");
  }

  function updateScore() {
    if (!scoreEl || !streakEl || !remainingEl) return;

    const accuracyPercent = attempts > 0
      ? Math.round((score / attempts) * 100)
      : 0;

    const completed = activeFlags.filter(row => row.completed).length;

    const progressPercent = activeFlags.length > 0
      ? Math.round((completed / activeFlags.length) * 100)
      : 0;

    const remaining = Math.max(activeFlags.length - completed, 0);

    scoreEl.textContent = `Score: ${score} / ${attempts} (${accuracyPercent}%)`;
    streakEl.textContent = `Streak: ${streak}`;

    if (hintsEl) {
      hintsEl.textContent = `Hints: ${hintsUsed}`;
    }

    remainingEl.textContent = `Remaining: ${remaining}`;

    if (progressTextEl) {
      progressTextEl.textContent = `${progressPercent}%`;
    }

    if (progressFillEl) {
      progressFillEl.style.width = `${progressPercent}%`;
    }

    updateTimerDisplay();
  }

  function sortGameRows(rows, sortId) {
    const copied = [...rows];

    if (sortId === "random") {
      return shuffleArray(copied);
    }

    if (sortId === "name-az") {
      return copied.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortId === "name-za") {
      return copied.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortId === "population-high-low") {
      return copied.sort((a, b) => getPopulationNumber(b.population) - getPopulationNumber(a.population));
    }

    if (sortId === "population-low-high") {
      return copied.sort((a, b) => getPopulationNumber(a.population) - getPopulationNumber(b.population));
    }

    return shuffleArray(copied);
  }

  function getPopulationNumber(value) {
    const number = Number(
      String(value ?? "")
        .replace(/,/g, "")
        .trim()
    );

    return isNaN(number) ? 0 : number;
  }

  function getSortLabel(sortId) {
    const labels = {
      "random": "Random",
      "name-az": "Name A-Z",
      "name-za": "Name Z-A",
      "population-high-low": "Population High-to-Low",
      "population-low-high": "Population Low-to-High"
    };

    return labels[sortId] || "Random";
  }

  function getPlayStyleLabel(playStyle) {
    if (playStyle === "speed") return "Speed Play";

    return "Information Play";
  }

  function getLayoutStyleLabel(layoutStyle) {
    if (layoutStyle === "grid") return "Full Grid";

    return "One at a Time";
  }
  
  function getSuggestionsLabel(suggestionsValue) {
      if (suggestionsValue === "on") return "Suggestions On";
    
      return "Suggestions Off";
    }

function getTimerLabel(timerValue) {
      if (timerValue === "stopwatch") return "Stopwatch";
    
      const seconds = Number(timerValue || 0);
    
      if (seconds <= 0) return "Timer Off";
    
      return formatClockTime(seconds);
}
  
  function updateSuggestionsToggle() {
      if (!suggestionsToggle) return;
    
      const currentValue = suggestionsToggle.dataset.suggestions || "off";
    
      suggestionsToggle.classList.remove("suggestions-on", "suggestions-off");
    
      if (currentValue === "on") {
        suggestionsToggle.textContent = "Suggestions On";
        suggestionsToggle.classList.add("suggestions-on");
      } else {
        suggestionsToggle.textContent = "Suggestions Off";
        suggestionsToggle.classList.add("suggestions-off");
      }
    }
    
    function updateAnswerSuggestions() {
      if (!answerSuggestions) return;
    
      answerSuggestions.innerHTML = "";
    
      if (activeSuggestions !== "on") return;
    
      const config = gameModes[activeModeId];
    
      if (!config) return;
    
      const suggestionValues = activeFlags
        .map(row => config.answerKind === "capital" ? row.capital : row.name)
        .filter(value => value && value.trim() !== "");
    
      const uniqueSuggestions = [...new Set(suggestionValues)]
        .sort((a, b) => a.localeCompare(b));
    
      answerSuggestions.innerHTML = uniqueSuggestions
        .map(value => `<option value="${escapeHTML(value)}"></option>`)
        .join("");
    }

  function updatePlayStyleDescription() {
            if (!playStyleDescriptionEl || !playStyleToggle) return;
          
            const playStyle = playStyleToggle.dataset.playStyle || "information";
          
            if (playStyle === "speed") {
              playStyleToggle.textContent = "Speed Play";
              playStyleToggle.classList.remove("information-play");
              playStyleToggle.classList.add("speed-play");
          
              playStyleDescriptionEl.textContent =
                "A correct guess automatically goes to the next item, without showing correct answer details.";
          
              return;
            }
          
            playStyleToggle.textContent = "Information Play";
            playStyleToggle.classList.remove("speed-play");
            playStyleToggle.classList.add("information-play");
          
            playStyleDescriptionEl.textContent =
              "See information for each correct answer, which requires an additional click to go to the next guess.";
}
  
  function updateGameSetupSummary() {
    if (!setupSummaryEl) return;
  
    const sortId = sortSelect ? sortSelect.value : "random";
  
    const layoutStyle = layoutToggle
      ? layoutToggle.dataset.layoutStyle || "single"
      : "single";
  
    const playStyle = playStyleToggle
      ? playStyleToggle.dataset.playStyle || "information"
      : "information";
   
    const suggestionsValue = suggestionsToggle
      ? suggestionsToggle.dataset.suggestions || "off"
      : "off";
    
    const timerValue = timerSelect ? timerSelect.value || "0" : "0";
    
    const sortLabel = getSortLabel(sortId);
    const layoutLabel = getLayoutStyleLabel(layoutStyle);
    const playLabel = getPlayStyleLabel(playStyle);
    const suggestionsLabel = getSuggestionsLabel(suggestionsValue);

    const timerLabel = getTimerLabel(timerValue);
  
    const isDefault =
        sortId === "random" &&
        layoutStyle === "single" &&
        playStyle === "information" &&
        suggestionsValue === "off" &&
        timerValue === "stopwatch";
      
      setupSummaryEl.textContent = isDefault
        ? "Default: Random order, One at a time, Information Play, Suggestions Off, Stopwatch"
        : `${sortLabel}, ${layoutLabel}, ${playLabel}, ${suggestionsLabel}, ${timerLabel}`;
  }
  
  function shuffleArray(array) {
    const copied = [...array];

    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copied[i], copied[j]] = [copied[j], copied[i]];
    }

    return copied;
  }

  function isYes(value) {
    const normalized = normalizeAnswer(value);

    return normalized === "yes" || normalized === "true";
  }

  function isUSState(row) {
    const type = normalizeAnswer(row.type);
    const code = normalizeAnswer(row.code);

    return (
      type.includes("u s state") ||
      type.includes("us state") ||
      code.startsWith("us ")
    );
  }

  function isCanadianProvinceOrTerritory(row) {
    const type = normalizeAnswer(row.type);
    const code = normalizeAnswer(row.code);

    return (
      type.includes("canadian province") ||
      type.includes("canadian territory") ||
      type.includes("canadian province territory") ||
      code.startsWith("ca ")
    );
  }

  function isNorthAmericanSubnational(row) {
    return isUSState(row) || isCanadianProvinceOrTerritory(row);
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function updatePlayStyleToggle() {
    if (!playStyleToggle) return;

    const currentStyle = playStyleToggle.dataset.playStyle || "information";

    playStyleToggle.classList.remove("speed-play", "information-play");

    if (currentStyle === "speed") {
      playStyleToggle.textContent = "Speed Play";
      playStyleToggle.classList.add("speed-play");
    } else {
      playStyleToggle.textContent = "Information Play";
      playStyleToggle.classList.add("information-play");
    }
  }

  function updateLayoutToggle() {
    if (!layoutToggle) return;

    const currentLayout = layoutToggle.dataset.layoutStyle || "single";

    layoutToggle.classList.remove("one-at-a-time", "grid-mode");

    if (currentLayout === "grid") {
      layoutToggle.textContent = "Full Grid";
      layoutToggle.classList.add("grid-mode");
    } else {
      layoutToggle.textContent = "One at a Time";
      layoutToggle.classList.add("one-at-a-time");
    }
  }

  if (playStyleToggle) {
      playStyleToggle.addEventListener("click", function () {
        const currentStyle = playStyleToggle.dataset.playStyle || "information";
    
        playStyleToggle.dataset.playStyle = currentStyle === "information"
          ? "speed"
          : "information";
    
        updatePlayStyleToggle();
        updatePlayStyleDescription();
        updateGameSetupSummary();
      });
}

  if (infoToggleButton && infoPanel) {
  infoToggleButton.addEventListener("click", function () {
    infoPanel.classList.toggle("flags-info-panel-minimized");
    updateInfoPanelToggle();
  });

  updateInfoPanelToggle();
}
  
if (layoutToggle) {
  layoutToggle.addEventListener("click", function () {
    const currentLayout = layoutToggle.dataset.layoutStyle || "single";

    layoutToggle.dataset.layoutStyle = currentLayout === "single"
      ? "grid"
      : "single";

    updateLayoutToggle();
    updateGameSetupSummary();
  });
}

  if (suggestionsToggle) {
      suggestionsToggle.addEventListener("click", function () {
        const currentValue = suggestionsToggle.dataset.suggestions || "off";
    
        suggestionsToggle.dataset.suggestions = currentValue === "off"
          ? "on"
          : "off";
    
        updateSuggestionsToggle();
        updateGameSetupSummary();
      });
    }
  
  if (sortSelect) {
    sortSelect.addEventListener("change", updateGameSetupSummary);
    }
    
  updatePlayStyleToggle();
  updateLayoutToggle();
  updateSuggestionsToggle();
  updateGameSetupSummary();

modeButtons.forEach(button => {
  button.addEventListener("click", function () {
    selectedModeId = button.dataset.gameMode || "";

    console.log("Selected game mode:", selectedModeId);

    modeButtons.forEach(otherButton => {
      otherButton.classList.remove("flags-mode-selected");
    });

    button.classList.add("flags-mode-selected");

    const config = gameModes[selectedModeId];

    if (selectedGameSummaryEl && config) {
      selectedGameSummaryEl.textContent = `Selected: ${config.label}`;
    }

    if (startGameButton) {
      startGameButton.disabled = false;
      startGameButton.removeAttribute("disabled");
    }
  });
});

if (startGameButton) {
  startGameButton.addEventListener("click", function () {
    console.log("Start Game clicked. selectedModeId:", selectedModeId);

    if (!selectedModeId) {
      console.warn("No game mode selected.");
      return;
    }

    startGame(selectedModeId);
  });
}

if (changeGameButton) {
  changeGameButton.addEventListener("click", changeGameMode);
}

if (resetButton) {
  resetButton.addEventListener("click", resetCurrentGame);
}

if (submitButton) {
  submitButton.addEventListener("click", submitAnswer);
}

if (hintButton) {
  hintButton.addEventListener("click", showHint);
}

if (revealButton) {
  revealButton.addEventListener("click", revealAnswer);
}

if (skipButton) {
  skipButton.addEventListener("click", skipQuestion);
}

if (endGameButton) {
  endGameButton.addEventListener("click", endCurrentGame);
}

if (pauseButton) {
  pauseButton.addEventListener("click", pauseGame);
}

if (resumeButton) {
  resumeButton.addEventListener("click", resumeGame);
}

if (answerInput) {
  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (answeredCurrent && activePlayStyle === "information") {
        nextQuestion();
      } else {
        submitAnswer();
      }
    }
  });
}

console.log("Flags game listeners loaded.");
};

window.loadHomeTierSummary = async function loadHomeTierSummary() {
  const table = document.getElementById("home-tier-table");
  const select = document.getElementById("home-tier-dataset");
  const nrSummary = document.getElementById("home-tier-nr-summary");

  if (!table || !select) return;

  const tierOrder = [
    "S",
    "(S)",
    "A1",
    "A2",
    "A3",
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
    "D"
  ];

  const configs = {
    albums: {
      label: "Albums",
      url: window.ALBUMS_CSV_URL,
      tierColumns: ["Tier", "Album Tier"],
      titleColumns: ["Album", "Album Title", "Project", "Project Name", "Name"],
      scoreColumns: ["My Rating", "Rating", "Score"]
    },
    movies: {
      label: "Movies",
      url: window.MOVIES_CSV_URL,
      tierColumns: ["Tier"],
      titleColumns: ["Movie Title", "Name", "Title"],
      scoreColumns: ["My Rating", "Rating", "Score"]
    },
    tvshows: {
      label: "TV Shows",
      url: window.TVSHOWS_CSV_URL,
      tierColumns: ["Tier", "TV SHOW TIER", "TV Show Tier"],
      titleColumns: ["TV Show", "Tv Show", "Name", "Title"],
      scoreColumns: ["My Rating", "Rating", "Score"]
    }
  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getFirstExistingColumn(headers, candidates) {
    return candidates.find(column => headers.includes(column)) || null;
  }

  function getNumericScore(row, scoreColumn) {
    if (!scoreColumn) return null;

    const value = String(row[scoreColumn] ?? "").replace(/,/g, "").trim();
    const number = Number(value);

    return isNaN(number) ? null : number;
  }

  function getTierSortIndex(tier) {
    const index = tierOrder.indexOf(tier);

    return index === -1 ? 999 : index;
  }

  function getTierStyle(tier) {
    if (typeof getTierColor !== "function") return "";

    const colors = getTierColor(tier);

    if (!colors || !colors.bg || !colors.text) return "";

    return `
      background-color: ${colors.bg};
      color: ${colors.text};
      font-weight: bold;
    `;
  }

  function showLoading(label) {
    table.innerHTML = `
      <tbody>
        <tr>
          <td class="rankings-loading-cell">Loading ${escapeHTML(label)} tier summary...</td>
        </tr>
      </tbody>
    `;
  }

  function showError(label) {
    table.innerHTML = `
      <tbody>
        <tr>
          <td class="home-tier-empty">
            Could not load ${escapeHTML(label)} tier summary.
          </td>
        </tr>
      </tbody>
    `;
  }

  async function loadDataset(datasetKey) {
    const config = configs[datasetKey];

    if (!config || !config.url) {
      showError(config ? config.label : "selected");
      return;
    }

    showLoading(config.label);

    try {
      const text = await getCSVText(config.url);

      const parsed = Papa.parse(text.trim(), {
        header: true,
        skipEmptyLines: true
      });

      const headers = parsed.meta.fields || [];
      const rows = parsed.data || [];

      const tierColumn = getFirstExistingColumn(headers, config.tierColumns);
      const titleColumn = getFirstExistingColumn(headers, config.titleColumns);
      const scoreColumn = getFirstExistingColumn(headers, config.scoreColumns);

      if (!tierColumn) {
        table.innerHTML = `
          <tbody>
            <tr>
              <td class="home-tier-empty">
                No tier column found for ${escapeHTML(config.label)}.
              </td>
            </tr>
          </tbody>
        `;
        return;
      }

      const groups = new Map();

      rows.forEach(row => {
        const tier = String(row[tierColumn] ?? "").trim();

        if (tier === "") return;

        if (!groups.has(tier)) {
          groups.set(tier, {
            tier,
            count: 0,
            examples: [],
            scores: []
          });
        }

        const group = groups.get(tier);
        const title = titleColumn ? String(row[titleColumn] ?? "").trim() : "";
        const score = getNumericScore(row, scoreColumn);

        group.count++;

        if (title !== "") {
          group.examples.push({
            title,
            score
          });
        }

        if (score !== null) {
          group.scores.push(score);
        }
      });

      const nrCount = Array.from(groups.values())
        .filter(row => String(row.tier ?? "").trim().toUpperCase() === "NR")
        .reduce((sum, row) => sum + row.count, 0);
      
      if (nrSummary) {
        nrSummary.textContent = `Not Ranked (NR) = ${nrCount}`;
      }
      
      const summaryRows = Array.from(groups.values())
        .filter(row => String(row.tier ?? "").trim().toUpperCase() !== "NR")
        .sort((a, b) => {
          const tierCompare = getTierSortIndex(a.tier) - getTierSortIndex(b.tier);
      
          if (tierCompare !== 0) return tierCompare;
      
          return a.tier.localeCompare(b.tier);
        });

      const maxCount = Math.max(...summaryRows.map(row => row.count), 1);
      const totalCount = summaryRows.reduce((sum, row) => sum + row.count, 0);

      if (summaryRows.length === 0) {
        table.innerHTML = `
          <tbody>
            <tr>
              <td class="home-tier-empty">
                No tier data found for ${escapeHTML(config.label)}.
              </td>
            </tr>
          </tbody>
        `;
        return;
      }

      let html = `
        <thead>
          <tr>
            <th>Tier</th>
            <th>Count</th>
            <th>Spread</th>
            <th>Example</th>
            <th>Score Range</th>
          </tr>
        </thead>
        <tbody>
      `;

      summaryRows.forEach(row => {
        const percentageOfTotal = totalCount > 0
          ? Math.round((row.count / totalCount) * 100)
          : 0;

        const barWidth = Math.max(3, Math.round((row.count / maxCount) * 100));

        const bestExample = row.examples
          .sort((a, b) => {
            if (a.score === null && b.score === null) return 0;
            if (a.score === null) return 1;
            if (b.score === null) return -1;

            return b.score - a.score;
          })[0];

        const exampleText = bestExample ? bestExample.title : "—";

        const scoreRange = row.scores.length
          ? `${Math.min(...row.scores)}–${Math.max(...row.scores)}`
          : "—";

        html += `
          <tr>
            <td style="${getTierStyle(row.tier)}">${escapeHTML(row.tier)}</td>
            <td>${escapeHTML(row.count)}</td>
            <td class="home-tier-bar-cell">
              <div class="home-tier-bar-track">
                <div class="home-tier-bar-fill" style="width: ${barWidth}%;"></div>
                <div class="home-tier-bar-label">${percentageOfTotal}%</div>
              </div>
            </td>
            <td class="home-tier-example">${escapeHTML(exampleText)}</td>
            <td>${escapeHTML(scoreRange)}</td>
          </tr>
        `;
      });

      html += `
        </tbody>
      `;

      table.innerHTML = html;
    } catch (error) {
      console.error(error);
      showError(config.label);
    }
  }

  select.addEventListener("change", function () {
    loadDataset(select.value);
  });

  loadDataset(select.value);
};

window.loadHomeTop10Summaries = async function loadHomeTop10Summaries() {
  const configs = {
   albums: {
      listId: "home-top10-albums",
      label: "albums",
      url: window.ALBUMS_CSV_URL,
    
      titleColumns: ["Album", "Album Title", "Project", "Project Name", "Name", "Title"],
    
      rankColumns: ["Ranking"],
      scoreColumns: [],
    
      metaColumns: ["Year", "Genres"],
    
      sortColumns: ["Ranking"],
      sortDirection: "asc",
      sortType: "text",
    
      showRank: false,
      showScore: false
    },
   
   artists: {
          listId: "home-top10-artists",
          label: "artists",
          url: window.ARTISTS_CSV_URL,
        
          titleColumns: ["Artist"],
          rankColumns: ["Rk", "Artist Rank", "Rank"],
          scoreColumns: ["Artist Score", "Score"],
        
          metaColumns: ["Tier"],
        
          sortColumns: ["Rk", "Artist Rank", "Rank"],
          sortDirection: "asc",
          sortType: "number",
        
          showRank: false,
          showScore: false,
          useArtistSongCount: true
        },
    
    songs: {
          listId: "home-top10-songs",
          label: "songs",
          url: window.FAV_SONGS_CSV_URL,
        
          titleColumns: ["Song Title"],
          rankColumns: ["Rank"],
          scoreColumns: [],
        
          metaColumns: ["Artist-Group", "Tier"],
        
          sortColumns: ["Rank"],
          sortDirection: "asc",
          sortType: "number",
        
          showRank: false,
          showScore: false
        },

    movies: {
          listId: "home-top10-movies",
          label: "movies",
          url: window.MOVIES_CSV_URL,
        
          titleColumns: ["Movie Title", "Name", "Title"],
          rankColumns: [],
          scoreColumns: [],
        
          metaColumns: [],
        
          sortColumns: ["SORT"],
          sortDirection: "desc",
          sortType: "text",
        
          showRank: false,
          showScore: false,
          customMeta: "movies"
        },
    
   tvshows: {
        listId: "home-top10-tvshows",
        label: "TV shows",
        url: window.TVSHOWS_CSV_URL,
      
        titleColumns: ["TV Show", "Tv Show", "Name", "Title"],
        rankColumns: [],
        scoreColumns: [],
      
        metaColumns: [],
      
        sortColumns: ["/100"],
        sortDirection: "desc",
        sortType: "number",
      
        showRank: false,
        showScore: false,
        customMeta: "tvshows"
    }
  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getFirstExistingColumn(headers, candidates) {
    return candidates.find(column => headers.includes(column)) || null;
  }

  function getNumber(row, column) {
    if (!column) return null;

    const text = String(row[column] ?? "")
      .replace(/[#,\s]/g, "")
      .trim();

    const number = Number(text);

    return isNaN(number) ? null : number;
  }

  function getText(row, column) {
    if (!column) return "";

    return String(row[column] ?? "").trim();
  }

  function getBestMeta(row, metaColumns) {
    const values = metaColumns
      .map(column => getText(row, column))
      .filter(value => value !== "");

    return values.slice(0, 2).join(" • ");
  }

  function formatMovieTop10Meta(row) {
        const year = getText(row, "Year");
        const mins = getText(row, "Mins.");
        const rating = getText(row, "My Rating");
      
        const minsText = mins !== "" ? `${mins} Mins.` : "";
        const ratingText = rating !== "" ? rating : "";      
    
        return [year, minsText, ratingText]
          .filter(Boolean)
          .join(" • ");
  }

function formatTVShowTop10Meta(row) {
  const years = getText(row, "Years");
  const seasons = getText(row, "Seasons");
  const episodes = getText(row, "Episodes");
  const rating = getText(row, "My Rating");

  const seasonsText = seasons !== "" && episodes !== ""
    ? `${seasons} (${episodes})`
    : seasons || episodes;

  const ratingText = rating !== "" ? `Score: ${rating}` : "";

  return [years, seasonsText, ratingText]
    .filter(Boolean)
    .join(" • ");
}
  
  function rowHasContent(row, headers) {
    return headers.some(header => {
      return String(row[header] ?? "").trim() !== "";
    });
  }

  async function getArtistSongCounts() {
  const counts = new Map();

  if (!window.ARTIST_SONGS_CSV_URL) {
    return counts;
  }

  try {
    const text = await getCSVText(window.ARTIST_SONGS_CSV_URL);

    const parsed = Papa.parse(text.trim(), {
      header: true,
      skipEmptyLines: true
    });

    const headers = parsed.meta.fields || [];
    const rows = parsed.data || [];

    const artistColumn = getFirstExistingColumn(headers, ["Artist"]);
    const songColumn = getFirstExistingColumn(headers, ["Song Title", "Song", "Title"]);

    if (!artistColumn || !songColumn) {
      return counts;
    }

    rows.forEach(row => {
      const artist = getText(row, artistColumn);
      const songTitle = getText(row, songColumn);

      if (artist === "" || songTitle === "") return;

      counts.set(artist, (counts.get(artist) || 0) + 1);
    });

    return counts;
  } catch (error) {
    console.error("Could not load artist song counts:", error);
    return counts;
  }
}

  const artistSongCounts = await getArtistSongCounts();
  
  function showCardMessage(list, message) {
    list.innerHTML = `<li class="home-top10-empty">${escapeHTML(message)}</li>`;
  }

  async function loadTop10(config) {
    const list = document.getElementById(config.listId);

    if (!list) return;

    list.innerHTML = `<li class="home-top10-loading">Loading ${escapeHTML(config.label)}...</li>`;

    if (!config.url) {
      showCardMessage(list, `No CSV URL found for ${config.label}.`);
      return;
    }

    try {
      const text = await getCSVText(config.url);

      const parsed = Papa.parse(text.trim(), {
        header: true,
        skipEmptyLines: true
      });

      const headers = parsed.meta.fields || [];
      const rows = (parsed.data || []).filter(row => rowHasContent(row, headers));

      const titleColumn = getFirstExistingColumn(headers, config.titleColumns);
      const rankColumn = getFirstExistingColumn(headers, config.rankColumns);
      const scoreColumn = getFirstExistingColumn(headers, config.scoreColumns);

      if (!titleColumn) {
        console.warn(`No title column found for ${config.label}. Headers found:`, headers);
        showCardMessage(list, `No title column found for ${config.label}.`);
        return;
      }

      const rankedRows = rows
        .map(row => {
                    const title = getText(row, titleColumn);
          let meta = getBestMeta(row, config.metaColumns);

            if (config.customMeta === "movies") {
              meta = formatMovieTop10Meta(row);
            }
            
            if (config.customMeta === "tvshows") {
              meta = formatTVShowTop10Meta(row);
            }
          
          if (config.useArtistSongCount) {
            const count = artistSongCounts.get(title) || 0;
            const countText = `${count} ranked song${count === 1 ? "" : "s"}`;
          
            meta = [meta, countText].filter(Boolean).join(" • ");
          }
          
          return {
            title,
            rank: getNumber(row, rankColumn),
            score: getNumber(row, scoreColumn),
            meta,
            sortValue
          };
        })
        .filter(item => item.title !== "")
        .filter(item => item.rank !== null || item.score !== null)
        .sort((a, b) => {
          if (a.rank !== null && b.rank !== null) {
            return a.rank - b.rank;
          }

          if (a.rank !== null && b.rank === null) return -1;
          if (a.rank === null && b.rank !== null) return 1;

          if (a.score !== null && b.score !== null) {
            return b.score - a.score;
          }

          return a.title.localeCompare(b.title);
        })
        .slice(0, 10);

      if (rankedRows.length === 0) {
        showCardMessage(list, `No ranked ${config.label} found.`);
        return;
      }

      list.innerHTML = rankedRows.map(item => {
        const rankText = config.showRank === false
            ? ""
            : item.rank !== null
              ? `#${item.rank}`
              : "";
          
          const scoreText = config.showScore === false
            ? ""
            : item.score !== null
              ? `${item.score}`
              : "";
          
          const metaText = [rankText, scoreText, item.meta].filter(Boolean).join(" • ");

        return `
          <li>
            <span class="home-top10-item-title">${escapeHTML(item.title)}</span>
            ${metaText ? `<span class="home-top10-item-meta">${escapeHTML(metaText)}</span>` : ""}
          </li>
        `;
      }).join("");
    } catch (error) {
      console.error(`Could not load ${config.label}:`, error);
      showCardMessage(list, `Could not load ${config.label}.`);
    }
  }

  loadTop10(configs.albums);
  loadTop10(configs.artists);
  loadTop10(configs.songs);
  loadTop10(configs.movies);
  loadTop10(configs.tvshows);
};


