// Include React
var React = require("react");
var Scrape = React.createClass({
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