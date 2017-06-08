var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img 
          className="avatar"
          src={props.avatar} 
          alt={'avatar for '+ props.username}
        />
        <h2 className="username">
          <a href={"https://github.com/"+props.username} target="blank">@{props.username}</a>
        </h2>
        {props.children}
      </div>
    </div>
  )
}

PlayerPreview.propTypes = { 
  avatar : PropTypes.string.isRequired,
  username : PropTypes.string.isRequired, 
}


module.exports = PlayerPreview;