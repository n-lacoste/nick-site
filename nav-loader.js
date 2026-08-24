(function () {
  function loadNavScript() {
    const headerTarget = document.getElementById("site-header");

    if (!headerTarget) {
      console.error("Could not find #site-header.");
      return;
    }

    const existingScript = document.querySelector('script[data-nick-nav-script="true"]');

    if (existingScript) return;

    const script = document.createElement("script");

    script.dataset.nickNavScript = "true";
    script.src = "/nick-site/nav.js?v=" + Date.now();

    script.onerror = function () {
      console.error("Could not load /nick-site/nav.js");
    };

    document.body.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNavScript);
  } else {
    loadNavScript();
  }
})();
