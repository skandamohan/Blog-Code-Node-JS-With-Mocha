var connection = require('../database');

connection.query('CREATE TABLE IF NOT EXISTS mocha_test_table(user_name varchar(10),'+
  'email varchar(10),fname varchar(10),lname varchar(10));', function(err) {if(err){console.log(err);}});

exports.home = function (req, res) {
  res.render('../views/home');
};

exports.login = function (req, res) {
  res.render('../views/login');
};

exports.loginprocess = function (req, res) {
  connection.query(
    'SELECT * FROM mocha_test_table WHERE user_name="'+req.body.user_name+
    '" AND email="'+req.body.email+'";',function(err,results){
      if(results.length===0) {
        res.render('../views/login');
      } else {
        res.render('../views/form', {
          user_name:req.body.user_name,
          email:req.body.email,
          results: results,
        });
      }
    });
};

exports.formprocess = function (req, res) {
  connection.query('INSERT INTO mocha_test_table VALUE'+
    '("'+req.body.user_name+'","'+req.body.email+'","'+req.body.fname+'","'+req.body.lname+'");',
    function(err) {
      if(err){
        console.log(err);
      }
      connection.query(
        'SELECT * FROM mocha_test_table WHERE user_name="'+req.body.user_name+
          '" AND email="'+req.body.email+'";',function(err,results){
            if(results === null) {
              res.render('../views/login');
            } else {
                console.log(results);
                res.render('../views/form', {
                user_name:req.body.user_name,
                email:req.body.email,
                results: results,
              });
            }
        });
  });

};