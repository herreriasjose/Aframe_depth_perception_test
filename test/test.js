//test.js 

const mongo = require('mongodb').MongoClient;

const dbString = 'mongodb://localhost:27017/tests';

describe("MongoDB", function () {
   beforeEach(function (done) {
      mongo.connect(dbString)
            .then(function (currentDb) {
               done()
            })
            .catch(function (e) {
               done(e)
            });
   });

   it('Is running', function () {
      return;
   });
   
});
				
				
				