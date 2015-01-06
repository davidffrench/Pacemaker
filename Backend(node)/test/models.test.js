var expect = require('expect.js');

var mongoose = require('mongoose');
var user = require('./../app/models/user');
var activity = require('./../app/models/activity');
var route = require('./../app/models/route');
var feed = require('./../app/models/feed');

// Connecting to a test database
mongoose.connect('mongodb://devuser:password@ds039447.mongolab.com:39447/pacemaker-dev');

describe('Models', function(){
  var currentUser = null;
  var currentActivity = null;

  /*
   * beforeEach Method
   *
   * The before each method will execute every time Mocha is run. This
   * code will not run every time an individual test is run.
   */
  beforeEach(function(done){
    user.create({ local: { email: 'test@test.com', password: 'password' }}, function(e, user){
			currentUser = user;
      done();
		});
  });

  /*
   * afterEach Method
   *
   * Just like the beforeEach, afterEach is run after Mocha has completed
   * running it's queue.
   */
  afterEach(function(done){
    user.remove({_id: currentUser._id}, function(){
      done();
    });
  });

  it('creates a new user', function(done){
    user.create({ local: { email: 'test2@test.com', password: 'password' }}, function(e, user){
      expect(user.local.email).to.eql('test2@test.com');
      done();
		});
  });

  it('fetches user by id', function(done){
    user.findById(currentUser._id, function(e, user){
      expect(user._id).to.eql(currentUser._id);
      done();
    });
  });
});