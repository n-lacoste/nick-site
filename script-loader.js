(function () {
  const existingScript = document.querySelector('script[data-nick-main-script="true"]');

  if (existingScript) return;

  const script = document.createElement("script");

  script.dataset.nickMainScript = "true";

  // During active building, this always loads the freshest script.js.
  script.src = "/nick-site/script.js?v=" + Date.now();

  script.onload = function () {
    if (typeof window.NICK_SITE_INIT === "function") {
      window.NICK_SITE_INIT();
    }
  };

  script.onerror = function () {
    console.error("Could not load /nick-site/script.js");
  };

  document.head.appendChild(script);
})();
