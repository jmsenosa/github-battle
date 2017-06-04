var React = require('react');
var queryString = require('query-string');

class Results extends React.Component {

  constructor(){
    super();
  }

  render() {
    var players = queryString.parse(this.props.location.search);
    console.log(players);
    return (
      <div>Results!</div>
    );
  }
} 
module.exports = Results;