(function () {
  const base = "/nick-site/";
  const headerTarget = document.getElementById("site-header");

  if (!headerTarget) return;

  headerTarget.innerHTML = `
    <header>
      <h1>
        <a class="site-title" href="${base}">Nick Lacoste's Portfolio</a>
      </h1>

      <nav class="site-nav">
        <a class="nav-link" href="${base}">Home</a>

        <div class="nav-menu">
          <a class="nav-menu-title" href="${base}music/">Music</a>
          <div class="nav-dropdown">
            <a href="${base}music/">Home: Music</a>
          </div>
        </div>

        <div class="nav-menu">
          <a class="nav-menu-title" href="${base}movies/">Movies</a>
          <div class="nav-dropdown">
            <a href="${base}movies/">Home: Movies</a>
            <a href="${base}movies/comparison.html">Movie Comparison</a>
            <a href="${base}movies/rankings.html">Movie Rankings</a>
            <a href="${base}movies/watch-history.html">Watch History</a>
          </div>
        </div>

        <div class="nav-menu">
          <a class="nav-menu-title" href="${base}tvshows/">TV Shows</a>
          <div class="nav-dropdown">
            <a href="${base}tvshows/">Home: TV Shows</a>
            <a href="${base}tvshows/episode-rankings.html">Episode Rankings</a>
            <a href="${base}tvshows/tvshowcard.html">TV Show Cards</a>
            <a href="${base}tvshows/rankings.html">TV Show Rankings</a>
          </div>
        </div>
         
         <div class="nav-menu">
          <a class="nav-menu-title" href="${base}esports/">Esports</a>
          <div class="nav-dropdown">
            <a href="${base}esports/">Home: Esports</a>
          </div>
        </div>
        
        <div class="nav-menu">
          <a class="nav-menu-title" href="${base}geo/">Geo</a>
          <div class="nav-dropdown">
            <a href="${base}geo/">Home: Geo</a>
            <a href="${base}geo/flags.html">Flags Game</a>
          </div>
        </div>

        <div class="nav-menu">
          <a class="nav-menu-title" href="${base}professional/">Professional Work</a>
          <div class="nav-dropdown">
            <a href="${base}professional/">Home: Professional Work</a>
          </div>
        </div>
      </nav>
    </header>
  `;
})();
