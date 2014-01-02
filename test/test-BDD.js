var async = require('async'),
    request = require('supertest'),
    should = require('should'),
    app = require('../server'),
    connection = require('../database');


describe('Landing page functionality', function(){
  before(function (done) {
    this.timeout(5000);
    async.series([
      function (cb) {
        connection.query('INSERT INTO mocha_test_table '+
          'VALUE("TEST","TEST","","");',function(err){
            done();
          });
      },
      function (cb) {
        connection.query('SELECT * FROM mocha_test_table WHERE user_name="TEST"'+
          ' AND email="TEST";',function(err,results){
            results.length.should.not.equal(0);
            done();
          });
      }
    ], done);
  });
  it('Text of landing page', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('Home');
        done();
      });
  });
  it('Link to the login page', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('/login');
        done();
      });
  });
});

describe('Login page functionality', function(){
  before(function (done) {
    this.timeout(5000);
    async.series([
      function (cb) {
        connection.query(
          'SELECT * FROM mocha_test_table WHERE user_name="TEST'+
          '" AND email="TEST";',function(err,results){
            results.length.should.not.equal(0);
            done();
          });
      }
    ], done);
  });

  it('Text on login page', function(done){
    request(app)
      .get('/login')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('Login');
        done();
      });
  });

  it('Able to login with user/email “TEST”/”TEST”', function(done){
    request(app)
      .post('/login')
      .expect(200)
      .send({ user_name: 'TEST', email: 'TEST'})
      .end(function (err, res) {
        res.text.should.include('Form');
        done();
      });
  });

  it('Not be able to login with user/email not “TEST”/”TEST”', function(done){
    request(app)
      .post('/login')
      .expect(200)
      .send({ user_name: 'TEST1', email: 'TEST1'})
      .end(function (err, res) {
        res.text.should.not.include('Form');
          console.log('here');
        it('Not be able to login with user/email not “TEST”/”TEST”', function(done){
          res.text.should.include('Login');
          done();
        });
        done();
      });
  });

});

describe('Form page functionality', function(){
  before(function (done) {
    this.timeout(5000);
    async.series([
      function (cb) {
        connection.query(
          'SELECT * FROM mocha_test_table WHERE fname="TEST'+
          '" AND lname="TEST";',function(err,results){
            done();
          });
      }
    ], done);
  });

  it('Text on form page', function(done){
    request(app)
      .post('/login')
      .expect(200)
      .send({ user_name: 'TEST', email: 'TEST'})
      .end(function (err, res) {
        res.text.should.include('Form');
        it('Need to be able to see the text for input box', function(done){
          res.text.should.include('<input type="text" name="fname">');
          done();
        });
        it('Need to be able to see all the previous inputs listed', function(done){
          res.text.should.include('<div> TEST TEST TEST TEST </div>');
          done();
        });
        done();
      });
  });
  
  it('Need to be able enter lname/fname values', function(done){
    request(app)
      .post('/form')
      .expect(200)
      .send({ user_name: 'TEST', email: 'TEST', fname: 'TEST1', lname: 'TEST1'})
      .end(function (err, res) {
        it('Need to be able to see entry in the database', function(done){
          connection.query(
            'SELECT * FROM mocha_test_table WHERE fname="TEST'+
            '" AND lname="TEST";',function(err,results){
              results.length.should.not.equal(0);
        console.log('here');
              done();
            });
        });
        it('Need to be able to see entry on the page', function(done){
          res.text.should.include('<div> TEST TEST TEST1 TEST1 </div>');
          done();
        });

        it('Need to see the link to the login page', function(done){
          res.text.should.include('<a href="/login">Exit</a>');
          done();
        });
        done();
      });
    });
});