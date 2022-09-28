"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const $searchTerm = $("#search-query");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

 let shows = {};

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
  console.log(res)
  // let shows = {};
  for (let i = 0; i < res.data.length; i++) {
      shows.id = res.data[i].show.id,
      shows.name = res.data[i].show.name,
      shows.summary = res.data[i].show.summary,
      shows.image = res.data[i].show.image ? res.data[i].show.image.medium : 'https://tinyurl.com/tv-missing'
  }
  return shows;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  console.log(shows)
  for (let show in shows) {
    const $show = $(
        `<div data-show-id="${shows.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${shows.image}" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${shows.name}</h5>
             <div><small>${shows.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  // $episodesArea.hide();
  populateShows(shows);

}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

let episodes = {};

async function getEpisodesOfShow(id) { 
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  let episodes = res.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));
 
  console.log(episodes);
  return episodes;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) { }
