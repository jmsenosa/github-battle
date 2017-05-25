var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
  var languages = ['All', 'Javascript', 'PHP', 'Java', 'Python', 'Ruby'];
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

function RepositoryGrid (props) {
  return (
    <div className="repo-wrapper">
      <ul className="popular-list">
        {
          props.repos.map(function (repo, index){
           return (
              <li key={repo.name} className="popular-item">
                <div className="popular-rank">#{index + 1}</div>
                  <ul className="space-list-items">
                    <li>
                      <img 
                        className="avatar"
                        src={repo.owner.avatar_url} 
                        alt={'Avatar for '+repo.owner.login}
                      />
                    </li>
                    <li><a href={repo.html_url} target={"_blank"}>{repo.name}</a></li>
                    <li>@{repo.owner.login}</li>
                    <li>{repo.stargazers_count}</li>
                  </ul>
              </li>
           )
          },this)
        }
      </ul>
    </div>
  )
}

SelectLanguage.PropTypes = {
  selectedLanguage : PropTypes.string.isRequired,
  onSelect : PropTypes.func.isRequired
}

RepositoryGrid.Prototypes = {
  repos : PropTypes.array.isRequired
}

class Popular extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos : null
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

    api.fetchPopularRepos(lang)
    .then(function (repos) {
      this.setState(function(){
        return {
          repos : repos
        }
      })
    }.bind(this))
  }

  componentDidMount () {
   this.updateLanguage(this.state.selectedLanguage)
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? <div className="text-center">loading...</div> : <RepositoryGrid repos={this.state.repos} />}
        
      </div>   
    )
  }
} 

module.exports = Popular;

