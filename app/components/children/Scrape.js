// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

var Scrape = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: "", history: [], articles: [] };
  },

// The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.runArticleQuery().then(function(response) {
      console.log(response);
      if (response !== this.state.articles) {
        console.log("Articles", response.data);
        this.setState({ articles: response.data });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Scraped articles</h3>
            </div>
            <div className="panel-body">
              I'm a Scraper
            </div>
            <div>{this.props.article}</div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Scrape;