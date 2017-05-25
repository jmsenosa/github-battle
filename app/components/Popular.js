var React = require('react');

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
    var languages = ['All', 'Javascript', 'PHP', 'Java', 'Python'];

    return (
      <div className="main-menu">         
        <ul className="ul">
          {
            languages.map(function(lang){
              return (
                <li 
                  style={lang === this.state.selectedLanguage ? { color : '#d0021b'} : null}
                  onClick={this.updateLanguage.bind(null,lang)}
                  key={lang}>
                  {lang}
                </li>
              )
            },this)
          }
        </ul>
        <h3>
          <p className="center">{this.state.selectedLanguage}</p>
        </h3>
      </div>
      
    )
  }
} 

module.exports = Popular;

