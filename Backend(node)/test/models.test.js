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
  var currentRoute = null;

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

  it('creates a new activity', function(done){
    activity.create({ activityType: 'walking', activityDate: '2015-01-04T00:00:00' }, function(e, activity){
      expect(activity.activityType).to.eql('walking');
      currentActivity = activity;
      done();
		});
  });

  it('fetches activity by id', function(done){
    activity.findById(currentActivity._id, function(e, activity){
      expect(activity._id).to.eql(currentActivity._id);
      done();
    });
  });

  it('creates a new route', function(done){
    route.create({ latitude: 52.2626943830317, longitude: -7.131071090698242 }, function(e, route){
      expect(route.latitude).to.eql(52.2626943830317);
      currentRoute = route;
      done();
		});
  });

  it('fetches route by id', function(done){
    route.findById(currentRoute._id, function(e, route){
      expect(route._id).to.eql(currentRoute._id);
      done();
    });
  });
});