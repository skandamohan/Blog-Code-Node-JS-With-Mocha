module.exports = function(app, serverport) {

  app.set('view engine', 'hbs');

  var form = require('./controllers/form');
  app.get('/', form.home);
  app.get('/login', form.login);
  app.post('/login', form.loginprocess);
  app.post('/form', form.formprocess);
  app.listen(serverport);

};