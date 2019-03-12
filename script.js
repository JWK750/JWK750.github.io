const baseURL = 'https://images-api.nasa.gov/';
var url;

var pageNumber = 1;

// Restrict searches to images
const searchURL = 'search?media_type=image';

const searchButton = document.querySelector("#search");
const prevButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

const inputBoxes = document.querySelectorAll("input");
const displayPanel = document.querySelector("#results");

searchButton.addEventListener('click', fetchResults);
prevButton.addEventListener('click', previousPage);
nextButton.addEventListener('click', nextPage);

function createSearchAddress() {
  // Creates search address for GET request
  url = baseURL+searchURL;
  inputBoxes.forEach(function(element){
    if(element.value){
      url += ("&"+element.id+"="+encodeURIComponent(element.value));
    }
  })
  if(pageNumber>1){
    url += "&page="+pageNumber;
  }
  return url;
}

function fetchResults(e) {
  e.preventDefault();

  fetch(createSearchAddress()).then(function(result){
    return result.json();
  }).then(function(json){
    displayResults(json);
  })
}

function displayResults(json) {
  while (displayPanel.firstChild) {
    displayPanel.removeChild(displayPanel.firstChild);
  }

  var images = json.collection.items;

  for (var i = 0; i < images.length; i++) {
    var img = document.createElement('img');
    img.src = images[i].links[0]["href"];
    displayPanel.appendChild(img);
  }
}

function nextPage(e){
  pageNumber++;
  fetchResults(e);
}

function previousPage(e){
  if (pageNumber>1){
    pageNumber--;
    fetchResults(e);
  }
}
