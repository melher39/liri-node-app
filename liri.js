// loads evironment variables from .env file and add them to the process.env so they are not tracked by git
require("dotenv").config();

// import spotify api keys
const apiKeys = require("./keys.js");

// Grab the axios package...
const axios = require("axios");

// grab the moment js package
const moment = require("moment");

// testing if the keys are being read
// console.log(apiKeys);

// command to let program know what content user is looking for
const userCommand = process.argv[2];

// after the command line index of 2, look up those terms and separate them by a space
const userSearch = process.argv.slice(3).join(" ");

console.log("test test test test " + userSearch);

// if the user wants to know of upcoming artists for a band or artist, then look it up using the bands in town API
if (userCommand === "concert-this") {
    axios
        .get(`https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`)
        .then(function (response) {

            // if the axios is successful, assign the data to a variable
            let info = response.data;

            // check first if the info array has data (if it does not, it means there are no upcoming events)
            if (info.length === 0) {

                // let the user know there are no upcoming events for the selected artist
                console.log("Sorry, no upcoming events for this artist. Check back later!");
                console.log("You can also search another artist or band!");
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
                        // write to the console log the results in this order 
                        console.log(name + "\n" + city + ", " + region + ", " + country + "\n" + date + "\n");
                    }
                    // else if the region is blank, then only log these results so there won't be an empty space in between
                    // commmas in the results
                    else {
                        console.log(name + "\n" + city + ", " + country + "\n" + date + "\n");
                    }
                }
            }
        })
}