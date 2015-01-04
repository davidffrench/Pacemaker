var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest api server', function(){
  var id, activityId;

  it('creates a new user', function(done){
    superagent.post('http://localhost:3000/auth/signup')
      .send({ email: 'test123@test.com', password: 'password'})
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(res.body.user._id.length).to.eql(24);
        id = res.body.user._id;
        done();
      });
  });

  it('checks user login', function(done){
    superagent.post('http://localhost:3000/auth/login')
      .send({ email: 'test123@test.com', password: 'password'})
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(res.body.user._id.length).to.eql(24);
        expect(res.body.user._id).to.eql(id);
        done();
      });
  });

  it('gets a collection of users', function(done){
    superagent.get('http://localhost:3000/users')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id;})).to.contain(id);
        done();
      });
  });

  it('retrieve a single user', function(done){
    superagent.get('http://localhost:3000/users/'+id)
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('updates a single user', function(done){
    superagent.put('http://localhost:3000/users/'+id)
      .send({firstname: 'Test', lastname: 'Tester'})
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.eql('User updated!');
        done();
      });
  });

  it('creates an activity for a user', function(done){
    superagent.post('http://localhost:3000/users/'+id+'/activities')
      .send({"id":"","activityType":"walking","activityDate":"2015-01-04T00:00:00","location":"waterford","distance":1.63,"calories":35,"durationHours":0,"durationMinutes":30,"startTime":"2015-01-04T11:54:59","duration":"0hr 30m","route":[{"latitude":52.2626943830317,"longitude":-7.131071090698242},{"latitude":52.2627,"longitude":-7.1310400000000005},{"latitude":52.2633,"longitude":-7.131200000000001},{"latitude":52.26339,"longitude":-7.1312500000000005},{"latitude":52.263470000000005,"longitude":-7.131380000000001},{"latitude":52.263580000000005,"longitude":-7.13168},{"latitude":52.26364,"longitude":-7.13194},{"latitude":52.26368,"longitude":-7.132210000000001},{"latitude":52.26370000000001,"longitude":-7.13283},{"latitude":52.263740000000006,"longitude":-7.133210000000001},{"latitude":52.26397000000001,"longitude":-7.13318},{"latitude":52.26446000000001,"longitude":-7.133000000000001},{"latitude":52.26426000000001,"longitude":-7.131760000000001},{"latitude":52.26417000000001,"longitude":-7.1314},{"latitude":52.264050000000005,"longitude":-7.131080000000001},{"latitude":52.26393,"longitude":-7.130610000000001},{"latitude":52.263650000000005,"longitude":-7.129150000000001},{"latitude":52.26317,"longitude":-7.1273100000000005},{"latitude":52.26292,"longitude":-7.12647},{"latitude":52.262840000000004,"longitude":-7.12626},{"latitude":52.26277,"longitude":-7.12633},{"latitude":52.26277,"longitude":-7.12633},{"latitude":52.262840000000004,"longitude":-7.12626},{"latitude":52.26292,"longitude":-7.12647},{"latitude":52.26317,"longitude":-7.1273100000000005},{"latitude":52.263650000000005,"longitude":-7.129150000000001},{"latitude":52.26393,"longitude":-7.130610000000001},{"latitude":52.264050000000005,"longitude":-7.131080000000001},{"latitude":52.26417000000001,"longitude":-7.1314},{"latitude":52.26426000000001,"longitude":-7.131760000000001},{"latitude":52.26446000000001,"longitude":-7.133000000000001},{"latitude":52.26397000000001,"longitude":-7.13318},{"latitude":52.263740000000006,"longitude":-7.133210000000001},{"latitude":52.26370000000001,"longitude":-7.13283},{"latitude":52.26368,"longitude":-7.132210000000001},{"latitude":52.26364,"longitude":-7.13194},{"latitude":52.263580000000005,"longitude":-7.13168},{"latitude":52.263470000000005,"longitude":-7.131380000000001},{"latitude":52.26339,"longitude":-7.1312500000000005},{"latitude":52.2633,"longitude":-7.131200000000001},{"latitude":52.26254,"longitude":-7.131}]})
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.eql('Activity created!');
        expect(res.body.activityId.length).to.eql(24);
        activityId = res.body.activityId;
        done();
      });
  });

  it('gets a collection of users activities', function(done){
    superagent.get('http://localhost:3000/users/'+id+'/activities')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id;})).to.contain(activityId);
        done();
      });
  });

  it('gets a specific users activitity', function(done){
    superagent.get('http://localhost:3000/users/'+id+'/activities/'+activityId)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(activityId);
        done();
      });
  });

  it('updates a single user activity', function(done){
    superagent.put('http://localhost:3000/users/'+id+'/activities/'+activityId)
      .send({"location": "Testing"})
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.eql('Activity updated!');
        done();
      });
  });

  it('deletes a user activity', function(done){
    superagent.del('http://localhost:3000/users/'+id+'/activities/'+activityId)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.eql('Activity deleted!');
        done();
      });
  });

  it('deletes the user', function(done){
    superagent.del('http://localhost:3000/users/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.eql('Successfully deleted');
        done();
      });
  });
});