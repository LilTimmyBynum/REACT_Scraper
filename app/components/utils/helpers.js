// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Our scraping tools
// var request = require("request");
// var cheerio = require("cheerio");

var react = require("react");
var ReactCom = require("react-http-request");
// var scraper = require("scraper");


// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location) {

    console.log(location);

    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  scrapeArticles: function() {
    console.log("Getting scrape data =========================>");
    // First, we grab the body of the html with request

    // scraper("http://abc7ny.com/news//", function(err, data) {
    //   if(err) {
    //     console.log(err)
    //   };

    //   data('.msg').each(function() {
    //     console.log(data(this).text().trim()+'\n');
    //   });


    var timo = "TimBynum";

    return timo;
    // });








    // request("http://abc7ny.com/news//", function(error, response, html) {
    //     // Then, we load that into cheerio and save it to $ for a shorthand selector
    //     var $ = cheerio.load(html);
    //     $(".headline-list-item").each(function(i, element) {
    //         var headlineScrape = $(element).children("a").children(".headline").text();
    //         var imageScrape = $(element).children("a").children(".image").children("img").attr("src");
    //         var prelinkScrape = $(element).children("a").attr("href");

    //         var linkScrape = "http://abc7ny.com";

    //         if (headlineScrape && prelinkScrape && imageScrape) {
    //             linkScrape += prelinkScrape;

    //             var news = { headline: headlineScrape, image: imageScrape, link: linkScrape };
    //             scrapedStuff.push(news);
    //         };
    //     });
    //     var newsObject = { newNews: scrapedStuff };
    //     // res.render("index", newsObject);
    // });


  },

  // this get my Articles from Mongo
  runArticleQuery: function() {
    return axios.get("/api");
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;
