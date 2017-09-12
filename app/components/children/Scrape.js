// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

var Scrape = React.createClass({

  getInitialState: function() {
    return {articles: [] };
  },

// The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.runQuery().then(function(response) {
      console.log(response.data.newNews);
      if (response !== this.state.articles) {
        console.log("Articles", response.data);
        this.setState({ articles: response.data.newNews });
      }
    }.bind(this));
  },

  render: function() {
    console.log("the Articles props ====>");
    // console.log(this.state.articles);
    console.log(this.state.articles);
    return (
      <div className="panel panel-default ">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Scraped Articles</h3>
        </div>
        <div className="panel-body">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.state.articles.map(function(article, i) {
            return (
              <div key={article._id} className="row">
                <div className="panel">
                    <div className="panel-heading primePanel">
                    <div className="row">
                    <div className="col-xs-4"><img src={article.image} width="200"/></div>
                    <div className="col-xs-6">{article.headline}</div>
                    <div className="col-xs-2"><button id="deleteArticleBtn" >add article</button></div>
                    </div>
                    </div>                                        
                  </div>
                </div>                
            );
          })}
        </div>
      </div>
    );
  }
});
module.exports = Scrape;