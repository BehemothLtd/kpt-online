var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// database : kpt -- table : boards , user, kpt
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("kpt");
  dbo.createCollection("board", function(err, res) {
    if (err) throw err;
    console.log("Table board created!");
    db.close();
  });
});

