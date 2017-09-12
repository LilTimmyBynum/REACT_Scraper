// Include React
var React = require("react");

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

var Myarticles = require("./children/Myarticles");
var Scrape = require("./children/Scrape");
// var Myarticles = require("./children/Myarticles");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [], articles: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getMyArticles().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("Articles", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  // componentDidUpdate: function() {

  //   // Run the query for the address
  //   helpers.runQuery(this.state.searchTerm).then(function(data) {
  //     if (data !== this.state.results) {
  //       console.log("Address", data);
  //       this.setState({ results: data });

  //       // After we've received the result... then post the search term to our history.
  //       helpers.postHistory(this.state.searchTerm).then(function() {
  //         console.log("Updated!");

  //         // After we've done the post... then get the updated history
  //         helpers.getHistory().then(function(response) {
  //           console.log("Current History", response.data);

  //           console.log("History", response.data);

  //           this.setState({ history: response.data });

  //         }.bind(this));
  //       }.bind(this));
  //     }
  //   }.bind(this));
  // },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },



  // my page scraping function  ....not working
  scrapeSomething: function() {
    helpers.runArticleQuery().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // // get saved articles from Mongo
  // getMyArticles: function() {
  //   helpers.runArticleQuery().then(function(response) {
  //     console.log(response);
  //     if (response !== this.state.articles) {
  //       console.log("Articles", response.data);
  //       this.setState({ articles: response.data });
  //     }
  //   }.bind(this));
  // },

  // my page scraping function
  getSavedArticles: function() {
    
    // Run the query for the address
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(this.state.searchTerm).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));

  },

 // <Link to="/Scrape"><button className="btn btn-primary btn-lg" onClick={this.scrapeSomething}>Scrape</button></Link>
 //       <Link to="/Myarticles"><button className="btn btn-danger btn-lg" onClick={this.getSavedArticles}>Saved Articles</button></Link>

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">

        <div className="page-header text-center myHeader">
        <h1>NYC REACT Scraper</h1>
        <p>
        <Link to="/Scrape"><button className="btn btn-primary btn-lg">Scrape</button></Link>
        <Link to="/Myarticles"><button className="btn btn-danger btn-lg">Myarticles</button></Link> 
     {/*} <Link to="/Myarticles"><button className="btn btn-danger btn-lg" onClick={this.getMyArticles}>Myarticles</button></Link> */}
        </p>       
        </div>

        
        <div>Tim</div>

    {/*    <History history={this.state.history}/>
           This code will dump the correct Child Component    */}
          {this.props.children} 

          <div>Bynum</div>

          

     {/*    <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>  */}

        </div>

    {/*    <div className="row">

          <History history={this.state.history} /> 

        </div>    */}

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
