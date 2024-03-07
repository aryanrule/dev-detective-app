//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);  //same hi hai getelementbyid and usually bss ek function create krdliya to make it easy 
const url = "https://api.github.com/users/";
// if somehow you get confuse just do jsonformatting of username to understand it 


const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");

let darkMode = false; //initialized with false 

// Event Listeners
//1.) when you click on the submit button /search button 
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
    //https://api.github.com/users/(input.value) //jo bhi username mein pass krunga vo mujhe uss gohub profile pr lejaega 

  }
});

//2.) the keydown feature -- when 
input.addEventListener("keydown",function (e) {
    if (e.key == "Enter") {    //agr jo key mene press ki hai vo enter kii hai then again getuser wale function ko call krdena 
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

//3.) input field eventlisteners whwneeverr there is no data found here then dont show it 
input.addEventListener("input", function () { //whatever the value that is changed in the input field then 
  noresults.style.display = "none";      //jese hi mein input mein khuch search krr rha honga toh yeh noresult show krdena 
});


//4.)to set the darkmode and lightmode as per clicked events  
btnmode.addEventListener("click", function () {
  //if you see initially the dark mode is false 
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Functions

//API CALL
function getUserData(gitUrl) {
  fetch(gitUrl)  //fetching the url or information 

     /*the only diff between await and then is that the function will not go further untill you get some promise from the respose means the code after the await will not reads 
      but in then the response may return some response or may be not but the  other code return in the function will definately execute for sure */
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);   //to render it on ui 
    })
    .catch((error) => {   //to catch error if some 
      throw error;
    });
}


//rendering the data or to show it on UI 
function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";

    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {  
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      } 
    }

    //here i am just parsing the json one by one --- MDN if stuck 
    avatar.src = `${data.avatar_url}`;  //img 
    userName.innerText = data.name === null ? data.login : data.name;   //using ternary operator 
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}



//SWITCH TO DARK MODE - activateDarkMode()
//the other way to change the theme is to make you own classess and then style it but it will take lot of time also 
function darkModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");   //jese here you can see that lm bg ka color hi change krdiyaa mene 
  root.setProperty("--lm-bg", "#141D2F");   
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");

  console.log("setting dark mode to true");

} 

//SWITCH TO LIGHT MODE - activateLightMode - mene apne global variables ki properties hii chnge krdi iss function mein 
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");     //but jese hi  mein vps aata hu toh tum observe kro kii values vps phle jasii hogyi 
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}


//INITIALISE UI
function init() {
  //initialise dark-mode variable to false;
  //darkMode = true -> dark mode enable karna h 
  //darMode = false -> light mode enable karna h 
  darkMode = false;

  //HW
// const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const value = localStorage.getItem("dark-mode");

  if(value === null) {
    console.log("null k andar");
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  }
  else if(value == "true") {
    console.log("truer k andar");
    darkModeProperties();
  }
  else if(value == "false") {
    console.log("false k andar");
    lightModeProperties();
  }


  //by default, pranaygupta ki info show krre h UI pr
  getUserData(url + "aryanrule");
}

init();