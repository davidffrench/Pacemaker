var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest api server', function(){
  var id;

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

  it('retrieves a collection of users', function(done){
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