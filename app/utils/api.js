var axios = require('axios');
var clientid = "YOUR_CLIENT_ID";
var secret   = "YOUR_CLIENT_ID";
var params   = "?client_id="+ clientid +"&client_secret" + secret;

function getProfile (username) {
  return axios.get(window.encodeURI('https://api.github.com/users/' + username + params))
    .then(function (user) {
      return user.data;
  });
}
function getRepost (username) {
   return axios.get(window.encodeURI('https://api.github.com/users/' + username +"/repos"+ params + "&per_page=100"))
    .then(function (user) {
      return user.data;
  });
}
function getStarCount (repos) {
  return repos.data.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore (profile, repos) {
  var followers = profile.followers;
  // var totalStars = getStarCount(repos);
  var totalStars = 100;

  return ((followers+ profile.public_repos) * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepost(player)
  ]).then(function(data){
    var profile = data[0];
    var repos = data[0];
    
    return {
      profile: profile,
      score : calculateScore(profile, repos)
    }
  });
}

function sortPlayers (players) {
  return players.sort(function (a, b) {
    return b.score - a.score;
  });
} 

module.exports = {

  battle: function (players) {
    return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError);
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};