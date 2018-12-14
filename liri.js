// loads evironment variables from .env file and add them to the process.env so they are not tracked by git
require("dotenv").config();

// import spotify api keys
const apiKeys = require("./keys.js");

// grab the spotify api package
var Spotify = require('node-spotify-api');

// add the spotify apiKeys from our excluded file to the package
var spotify = new Spotify(apiKeys.spotify);

// Grab the axios package...
const axios = require("axios");

// grab the moment js package
const moment = require("moment");

// grab the fs node package to read and write files
const fs = require("fs");

// command to let program know what type of content user is looking for
let userCommand = process.argv[2];

// after the command line index of 2, look up those terms and separate them by a space
// let because it may be reassigned due to certain user inputs
let userSearch = process.argv.slice(3).join(" ");

// results variable where the info is stored so it can be logged
let results;

// if the user wants to look up a song, use the spotify-api to do so...
function songSearch() {

    // check first if the user typed in a song name, if they did not, then use the default search term...
    if(userSearch===""){
        userSearch="The Sign";
    }

    // search in the spotify api by track name and limit the results to 10 
    spotify
        .search({ type: "track", query: userSearch, limit: "10" })
        .then(function (response) {
            // store the results in a variable for easier reference
            let info = response.tracks.items;

            // if the user search term (song) was set to the default, then only display this result
            if(userSearch==="The Sign"){
                info = response.tracks.items[8];

                let artist = info.artists[0].name;
                let songName = info.name;
                let link = info.preview_url;
                let album = info.album.name;

                // save the results in the global variable so it can be logged in the log.txt file
                results = "Artist name: " + artist + "\nSong Name: " + songName
                + "\nPreview Link: " + link + "\nAlbum Name: " + album + "\n";

                // display it nicely spaced out on the terminal
                console.log(results);
                
                log();
            }

            // if the user did type in a song name, then display these results
            else{

                // loop through the results and gather the information we need for each listing
            for (let j=0; j<info.length; j++){
                // artist(s) name
                let artist = info[j].artists[0].name;
                // song name
                let songName = info[j].name;
                // link to a preview of the song, some may not have one(usually older songs)
                let link = info[j].preview_url;
                // album that this song is from
                let album = info[j].album.name;

                
                // save the results in the global variable so it can be logged in the log.txt file
                results = "Artist name: " + artist + "\nSong Name: " + songName

                + "\nPreview Link: " + link + "\nAlbum Name: " + album + "\n";
                // display it nicely spaced out on the terminal
                console.log(results);
                
                log();
            }
            
        }
        })
        // if there is an error, then display the error message
        .catch(function (err) {
            console.log(err);
        });
};

// if the user wants to know of upcoming artists for a band or artist, then look it up using the bands in town API
function concert() {
    axios
        .get(`https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`)
        .then(function (response) {

            // if the axios is successful, assign the data to a variable
            let info = response.data;

            // check first if the info array has data (if it does not, it means there are no upcoming events)
            if (info.length === 0) {

                // let the user know there are no upcoming events for the selected artist
                // save the results in the global variable so it can be logged in the log.txt file
                results = "Sorry, no upcoming events for " + userSearch + ". Check back later!" + "\nYou can also search another artist or band!\n";
            
                console.log(results);

                log();
            }

            // if the info array does have data (meaning there are upcoming events), then...
            else {

                // loop through the number of results to filter the info we need
                for (let i = 0; i < info.length; i++) {

                    // assign the data to their respective variables 
                    let name = info[i].venue.name;
                    let city = info[i].venue.city;
                    let region = info[i].venue.region;
                    let country = info[i].venue.country;
                    // convert the date to (MM/DD/YYYY)
                    let date = moment(info[i].datetime).format("L");

                    // some venues have a "blank" region, so check first if it's not blank
                    if (region != "") {
                        
                        // save the results in the global variable so it can be logged in the log.txt file
                        results = name + "\n" + city + ", " + region + ", " + country + "\n" + date + "\n";
                        // write to the console log the results in this order 
                        console.log(results);

                        log();
                    }
                    // else if the region is blank, then only log these results so there won't be an empty space in between
                    // commmas in the results
                    else {
                        // save the results in the global variable so it can be logged in the log.txt file
                        results = name + "\n" + city + ", " + country + "\n" + date + "\n";

                        console.log(results);

                        log();
                    }
                }
            }
        });
};

// if the user wants to know about movies, they will type the command "movie-this" followed by the title
function movie() {
    // if the user search is blank, the movie title will default to Mr. Nobody
    if (userSearch === "") {
        userSearch = "Mr. Nobody";
    }
    // once we know the movie title the user wants to gather information for, then we begin our axios call
    axios
        // omdb api with default api key "trilogy"
        .get(`http://www.omdbapi.com/?t=${userSearch}&apikey=trilogy`)
        .then(function (response) {
            // if the axio is successful, then store the data in a variable
            let info = response.data;
            // check if the movie is valid according to response by the omdb api
            if (info.Response === "False") {
                // save the results in the global variable so it can be logged in the log.txt file
                results = "Please check your spelling or type in a valid movie title and try again!";
                console.log(results);
                log();
            }
            // if the movie title is valid, then...
            else {
                // gather movie information
                let title = info.Title;
                let year = info.Year;
                let imbdRating = info.imdbRating;
                let tomatoesRating = info.Ratings[1].Value;
                let country = info.Country;
                let language = info.Language;
                let plot = info.Plot;
                let actors = info.Actors;

                // save the results in the global variable so it can be logged in the log.txt file
                results = title + "\nRelease Date: " + year + "\nimdbRating: " + imbdRating + "\nRotten Tomatoes Rating: " +
                tomatoesRating + "\nProduction Country: " + country + "\nLanguage: " + language + "\nPlot: " + plot
                + "\nActors: " + actors +"\n";

                // and write it to the console in a readble presentation
                console.log(results);

                log();

            }
        });

};

// if the command is do-what-it-says
function random() {
    // read from the random.txt file and decode the data to english
    // store the info read inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {
        // if the code runs into any errors, it will log the error to the console
        if (error) {
            return console.log(error);
        }

        // splitting the data into an array for access
        let dataArr = data.split(",");

        // re-assigning these values with what the random.txt holds
        userCommand = dataArr[0];
        userSearch = dataArr[1];

        // checking conditions to see which function to run
        if (userCommand == "movie-this") {
            movie();
        }
        else if (userCommand == "concert-this") {
            concert();
        }
        else if (userCommand === "spotify-this-song") {
            songSearch();
        }
    });
};

function log(){
    fs.appendFile("log.txt", results, function(err) {

        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
      
      });
}

// this will be how the program decides what function above to run
function runProgram() {
    // check the conditions and run that function
    if (userCommand === "concert-this") {
        concert();
    }
    else if (userCommand === "spotify-this-song") {
        songSearch();
    }
    else if (userCommand === "movie-this") {
        movie();
    }
    else if (userCommand === "do-what-it-says") {
        random();
    }

};

// call the runProgram() function and start the program
runProgram();
