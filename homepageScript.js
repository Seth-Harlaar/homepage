
// * * * * * * * * * 
//   bookmarks
// * * * * * * * * * 
const bookmarkData = [
  {
    //LABEL - LINK - ICON
    'label':  'courselink',
    'link':   'https://courselink.uoguelph.ca/d2l/home',
    'icon':   'fa-solid fa-book-open'
  },
  {
    'label':  'outlook',
    'link':   'https://outlook.office.com/mail/',
    'icon':   'fa-solid fa-inbox'
  },
  {
    'label':  'onedrive',
    'link':   'https://uoguelphca-my.sharepoint.com/personal/sharlaar_uoguelph_ca/_layouts/15/onedrive.aspx',
    'icon':   'fa-solid fa-cloud'
  },
  {
    'label':  'youtube',
    'link':   'https://www.youtube.com/',
    'icon':   'fa-brands fa-youtube'
  },
  {
    'label':  'netflix',
    'link':   'https://www.netflix.com/ca/',
    'icon':   'fa-solid fa-n'
  },
  {
    'label':  'sportsnet',
    'link':   'https://watch.sportsnet.ca/',
    'icon':   'fa-solid fa-hockey-puck'
  },
  {
    'label':  'disney+',
    'link':   'https://www.disneyplus.com/en-ca',
    'icon':   'fa-solid fa-plus'
  },
  {
    'label':  'prime video',
    'link':   'https://www.primevideo.com/hp/video/offers/nonprimehomepage/ref=dv_web_force_root?_encoding=UTF8&dvah=nonprimehomepage',
    'icon':   'fa-solid fa-circle-play'
  },
  {
    'label':  'gmail',
    'link':   'https://uoguelphca-my.sharepoint.com/personal/sharlaar_uoguelph_ca/_layouts/15/onedrive.aspx',
    'icon':   'fa-solid fa-envelope'
  },
  {
    'label':  'gdrive',
    'link':   'https://drive.google.com/drive/u/0/my-drive',
    'icon':   'fa-brands fa-google-drive'
  },
  {
    'label':  'ffe',
    'link':   'https://freefrontend.com/',
    'icon':   'fa-brands fa-css3'
  },
  {
    'label':  'reddit',
    'link':   'https://www.reddit.com/',
    'icon':   'fa-brands fa-reddit'
  },
  {
    'label':  'fantrax',
    'link':   'https://www.fantrax.com/fantasy/league/lx1p8w7ml782vjf4/home',
    'icon':   'fa-brands fa-fantasy-flight-games'
  },
  {
    'label':  'discord',
    'link':   'https://discord.com/channels/@me',
    'icon':   'fa-brands fa-discord'
  },
];

// turn html string to html element
function elementFromHtml(htmlString){
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
}

function bookmarkToString(bookmark){
  returnString = '<div class="bookmarkContainer"><a href="' +
  bookmark.link +
  '" class="bookmarkLink"><span class="bookmarkIcon"><i class="' + 
  bookmark.icon +
  '"></i> </span> <h3 class="bookmarkLabel">' +
  bookmark.label +
  '</h3> </a> </div>'

  return returnString;
}


function placeBookmarks(bookmarks){
  bmDiv = document.getElementById('bookmarkDivider');

  // for each bookmark
  bookmarks.map(bookmarkToString).forEach(bmString => {

    // turn to html and append
    bmDiv.append(elementFromHtml(bmString));
  });
}


placeBookmarks(bookmarkData);






// * * * * * * * * * 
// date and time
// * * * * * * * * * 
function date() {
  const d = new Date();
  // set date
  const weekday = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
  const months = ["Jan","Feb","Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  document.getElementById('dateDay').innerHTML = weekday[d.getDay()];
  document.getElementById('dateMonth').innerHTML = months[d.getMonth()];
  document.getElementById('dateDate').innerHTML = d.getDate();
}

date();

function time(){
  const d = new Date();
 
  // set time
  const hours = ((d.getHours() + 11) % 12 + 1);
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  const hoursPadded   = (hours + "").padStart(2, "0");
  const minutesPadded = (minutes + "").padStart(2, "0");
  const secondsPadded = (seconds + "").padStart(2, "0");


  document.getElementById('timeHour').innerHTML = hoursPadded + ':';
  document.getElementById('timeMinute').innerHTML = minutesPadded;
  document.getElementById('timeSecond').innerHTML = secondsPadded;
}

var inc = 100;
setInterval(time, inc);






// * * * * * * * * * 
// search handling
// * * * * * * * * * 
// search engines
const engines = {"google":"https://www.google.com/search?q=", "duckduckgo":"https://duckduckgo.com/?q=", "youtube":"https://www.youtube.com/results?q=", "scholar":"https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q="}

// custom shortform searches
const lookup = {"imdb":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/", "nhl":"https://www.google.com/search?client=firefox-b-d&q=nhl+", 
                "tunes":"https://www.youtube.com/playlist?list=PL9Om1_yOEPtgBu5JpxiEgHssbGjWCxwxJ", "goalies":"https://www.dailyfaceoff.com/starting-goalies/",
                }

// search functionality
const isWebUrl = value => {
  try {
    // attempt to make new url with the input
    // if this fails its not a url
    const url = new URL(value)
    // return a check to seet if the protocol is one of the two:
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function getTargetUrl(value, engine){
  // check to see if input is already a valid URL
  if (isWebUrl(value)) return value
  // check for a custom shortform input
  if (lookup[value]) return lookup[value]
  // else search it on engine -> google default
  return engines[engine] + value
}

function search(ctrl){
  const searchBar = document.getElementById('searchWord');
  
  // get searchword
  const searchWord = searchBar.value;

  // check for no input
  if ( !(searchWord == "" || searchWord == null) ){
    // get selected search engine
    const highButton = document.getElementById("highlightedButton");
    const searchEngine = highButton.innerHTML;

    // get url
    const targetUrl = getTargetUrl(searchWord, searchEngine);

    // navigate to new search
    if(ctrl){
      window.open(targetUrl, "_blank")
    } else {
      window.open(targetUrl, "_self")
    }
    
    // clear search bar
    searchBar.value = '';
  }
}





// * * * * * * * * * 
// listeners
// * * * * * * * * * 

// set listeners of button and enter 
const searchButton = document.getElementById('searchButton');
searchButton.onclick = search;

const searchBar = document.getElementById('searchWord');
searchBar.onkeyup = (event) => {
  if( event.key === "Enter" ){
    search(event.ctrlKey);
  }
}

// set listener for every button
const buttons = document.getElementsByClassName('engineButton');
for(let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', highlight);
}

// highlight the selected button
function highlight(event) {
  // if there is no input yet change the search engine
  const buttons = document.getElementsByClassName('engineButton');
  for(let i = 0; i < buttons.length; i++){
    buttons[i].removeAttribute('id');
  }
  event.target.setAttribute('id', 'highlightedButton');

  search(event.ctrlKey);
}

// listen for 's' key
document.addEventListener('keyup', (event) => {
  
  if(event.key == 's'){
    document.getElementById('searchWord').focus();  
  }
});


