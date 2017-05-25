var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props) {
  var languages = ['All', 'Javascript', 'PHP', 'Java', 'Python'];
  return (
    <div className="main-menu">   
      <ul className="ul">
        {
          languages.map(function(lang){
            return (
              <li 
                style={lang === props.selectedLanguage ? { color : '#d0021b'} : null}
                onClick={props.onSelect.bind(null,lang)}
                key={lang}>
                {lang}
              </li>
            )
          },this)
        }
      </ul>
      <h3>
        <p className="center">{props.selectedLanguage}</p>
      </h3>
    </div>
  )
} 

SelectLanguage.PropTypes = {
  selectedLanguage : PropTypes.string.isRequired,
  onSelect : PropTypes.func.isRequired
}

class Popular extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedLanguage: 'All' 
    };

    // binds the class if to be used so new functions can use updateLanguage
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) { 
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
          />
      </div>   
    )
  }
} 

module.exports = Popular;

