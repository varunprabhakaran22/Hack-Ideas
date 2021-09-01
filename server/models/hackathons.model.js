const { connection_firebase } = require("../config/connection.firebase");

module.exports = hackathonsModel = connection_firebase.collection("hackathons");
