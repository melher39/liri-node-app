# LIRI
## Language Interpretation and Recogniton Interface

The purpose of this program is to give you information on artists, movies, and songs of your choice.

Before you begin, make sure you install the proper packages (these can be found via npm):
* axios 
* node-spotify-api
* moment.js
* DotEnv

*You will also need an `.env` file containing your own spotify API keys.*

## Rundown

In order to start a search, begin by typing  **`node liri`**
followed by: `first argument` (space) `second argument`

First Argument (case sensitive) | Second Argument (spelling counts)
-------------- | ---------------
concert-this | *artist / band name*
spotify-this-song | *song name*
movie-this | *movie name*
do-what-it-says | *blank*

Function of the commands:
* **concert-this**: will search the Bands In Town API and provide you with upcoming show information including the venue name, venue location and the date of the show.
    * This will return as many results available for the selected band/artist.
    * If your band/artist does not have any upcoming shows, you will receive a message with such information.

* **spotify-this-song**: will search the Spotify API and provide you with the song information including its artists, title, a preview link and what album the song is in. 
    * This will return a maxiumm of 10 results.
    * If you don't specify a song, you will receive results for "The Sign" by Ace of Base.

* **movie-this**: will search the IMDB API and provide you with the movie information including its title, release year, various ratings, production country, language, plot and the cast.
    * If you don't specify a movie, you will receive results for "Mr. Nobody"

* **do-what-it-says**: will choose a predefined search term written within the `random.txt` file.

Once you have requested for the information you want, you will receive this information. The information will be displayed in the terminal and also in a `log.txt` file. Every search you make will be logged to said file so you can quickly view your search history.

Follow this link to see a video demo of this program fully working: https://drive.google.com/open?id=1OfyzrwG4mEmWeYx7YRu17nIN962LPBWM

Make sure to watch the video in 1080p HD quality so you can clearly see the text on the screen.

Thanks for your time! Hope you enjoyed this project.



