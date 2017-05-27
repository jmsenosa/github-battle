var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor() {
    super(); 
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleSubmit (e) { 
    e.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username);
  }
  
  handleChange (event) {
    var value = event.target.value; 
    this.setState(function () {
      return {
        username: value
      }
    });
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="header">
          {this.props.label}
        </label>
        <img 
          className={this.props.imgClass+ " vsimg"}
          src={this.props.imgSrc}
          alt={"image for "+this.props.imgClass}
          /> 
        <input 
          type="text"
          placeholder='Github Username'
          id="username"
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired,
  onSubmit : PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username',
}

class Battle extends React.Component {

  constructor(){
    super();
    this.state = {
      playerOneName : "",
      playerTwoName : "",
      playerOneImage : null,
      playerTwoImage : null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleSubmit(id, username){

    this.setState(function () {
      
      var newState = {}, 
      imgurl = 'https://github.com/' + username + '.png?size=200'; 
      
      newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = imgurl;

      return newState;
    });
  }

  render() { 

    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    
    return (
      <div className="battle-continer">
        <div className="row">
          {!playerOneName && 
            <PlayerInput
              id='playerOne' 
              label='Player Ryu'
              onSubmit={this.handleSubmit}
              imgClass="ryu"
              imgSrc="https://apollo2.dl.playstation.net/cdn/EP0102/NPEB00554_00/VdBGeflDDEoAO6W6xoiBP6DXTWIlxll8.png"
            />
          }

          {!playerTwoName && 
            <PlayerInput
              id='playerTwo'
              label='Player Ken'
              onSubmit={this.handleSubmit}
              imgClass="ken"
              imgSrc="https://apollo2.dl.playstation.net/cdn/UP0102/CUSA01200_00/BsA1nPaNXyy4W8btydhHPzyKoGNKORNg.png"
            />
          }
        </div>
      </div>
    )
  }
} 

module.exports = Battle;