
const friends = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {


    let bestMatch = {
      name: "",
      photo: "",
      friendDifference: 100000
    };


    let userInput = req.body;
    let userScores = userInput.scores;

    let totalDifference;


    for (let i = 0; i < friends.length; i++) {
      let otherUser = friends[i];
      totalDifference = 0;



      for (let j = 0; j < otherUser.scores.length; j++) {
        let otherUserScore = otherUser.scores[j];
        let currentUserScore = userScores[j];


        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(otherUserScore));
      }


      if (totalDifference <= bestMatch.friendDifference) {

        bestMatch.name = otherUser.name;
        bestMatch.photo = otherUser.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    friends.push(userInput);

    res.json(bestMatch);
  });
};
 