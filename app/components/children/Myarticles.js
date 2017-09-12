// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

// This is the History component. It will be used to show a log of  recent searches.
var History = React.createClass({


getInitialState: function() {
    return { searchTerm: "", results: "", history: [], articles: [] };
  },


// The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getMyArticles().then(function(response) {
      console.log(response);
      if (response !== this.state.articles) {
        console.log("Articles", response.data);
        this.setState({ articles: response.data });
      }
    }.bind(this));
  },  
  

  // This function will respond to the user input
  handleChange: function(event) {

    this.setState({ term: event.target.value });

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
  },

  // get saved articles from Mongo
  getMyArticles: function() {
    helpers.runArticleQuery().then(function(response) {
      console.log(response);
      if (response !== this.state.articles) {
        console.log("Articles", response.data);
        this.setState({ articles: response.data });
      }
    }.bind(this));
  },


  // Here we describe this component's render method
  render: function() {
    console.log("the Articles props ====>");
    console.log(this.state.articles);
    return (
      <div className="panel panel-default ">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
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
                    <div className="col-xs-2"><button id="deleteArticleBtn" >delete article</button></div>
                    </div>
                    </div>
                    <div className="panel-body primePanel">




                {/*}    <form onSubmit={this.handleSubmit}> */}
                    <form >
            <div className="form-group">
              
          {/*      Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event. 


value={this.state.term}      onChange={this.handleChange}


              */}
              
              <input
                placeholder="enter new note here"
                value= ""
                type="text"
                className="form-control"
                id="term"
                
                required
              />
              <button
                className="btn btn-primary"
                type="submit"
              >
                add Note
              </button>
            </div>
          </form>  










                    <div>Notes:</div>                   
                      {article.note.map(function(row) {
                      return(                     
                          <div  key={row._id}>
                            <div id="noteTxt" className="row">
                            <div className="col-xs-4">-  {row.info}</div>
                            <div className="col-xs-6"></div>
                            <div className="col-xs-2"><button className="delNoteBtn">delete note</button></div>
                            </div>
                          </div>
                          );
                      })}                    
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

// Export the component back for use in other files
module.exports = History;
