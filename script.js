const baseURL = 'https://images-api.nasa.gov/';
var url;

// Restrict searches to images
const searchURL = 'search?media_type=image';

const searchButton = document.querySelector("button");
const inputBoxes = document.querySelectorAll("input");
const displayPanel = document.querySelector("#results");

searchButton.addEventListener('click', fetchResults);

function createSearchAddress() {
  // Creates search address for GET request
  url = baseURL+searchURL;
  inputBoxes.forEach(function(element){
    if(element.value){
      url += ("&"+element.id+"="+encodeURIComponent(element.value));
    }
  })
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
