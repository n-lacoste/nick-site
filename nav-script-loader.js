(function () {
  const existingScript = document.querySelector('script[data-nick-nav-script="true"]');

  if (existingScript) return;

  const script = document.createElement("script");

  script.dataset.nickNavScript = "true";

  // During active building, this always loads the freshest nav.js.
  script.src = "/nick-site/nav.js?v=" + Date.now();

  script.onerror = function () {
    console.error("Could not load /nick-site/nav.js");
  };

  document.head.appendChild(script);
})();
