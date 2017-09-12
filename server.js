// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var History = require("./models/History");

// Require the Article schema
var Article = require("./models/Article");

// Require the Note schema
var Note = require("./models/Note");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var scraper = require("scraper");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/landmarkDb");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
// app.get("/api", function(req, res) {

//   // We will find all the records, sort it in descending order, then limit the records to 5
//   History.find({}).sort([
//     ["date", "descending"]
//   ]).limit(5).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });




app.get("/news", function(req,res) {

  var timo = ["ice", "cream", "dream"];

  console.log("tim has data !!!!!!!!!!!!!!!!");

  var scrapedStuff = [];

  request("http://abc7ny.com/news//", function(error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        console.log("am i working ?!?!?!?!?!");
        var $ = cheerio.load(html);
        $(".headline-list-item").each(function(i, element) {
            var headlineScrape = $(element).children("a").children(".headline").text();
            var imageScrape = $(element).children("a").children(".image").children("img").attr("src");
            var prelinkScrape = $(element).children("a").attr("href");

            var linkScrape = "http://abc7ny.com";

            if (headlineScrape && prelinkScrape && imageScrape) {
                linkScrape += prelinkScrape;

                var news = { headline: headlineScrape, image: imageScrape, link: linkScrape };
                scrapedStuff.push(news);
            };
        });
        var newsObject = { newNews: scrapedStuff };
        // res.render("index", newsObject);
        res.send(newsObject);
    });



// res.send(timo);
});
     // console.log("Getting scrape data =========================>");
    // // First, we grab the body of the html with request

    // scraper("http://abc7ny.com/news//", function(err, data) {
    //   if(err) {
    //     console.log(err)
    //   };

    //   data('.msg').each(function() {
    //     console.log(data(this).text().trim()+'\n');
    //   });


    // var timo = "TimBynum";

    // return timo;
    // });






// route to get my articles from Mongo
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});




// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
  console.log("BODY: " + req.body.location);

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  History.create({
    location: req.body.location,
    date: Date.now()
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
