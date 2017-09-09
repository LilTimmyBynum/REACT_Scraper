// Include React
var React = require("react");
var Notes = React.createClass({
  render: function() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Grandchild #1</h3>
        </div>
        <div className="panel-body">
          Notes
        </div>
      </div>
    );
  }
});
module.exports = Notes;