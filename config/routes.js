var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , _ = require('underscore')
  , util = require('util')
  , fs = require('fs');

module.exports = function (app, passport, auth, config, hoganTemplateRenderer) {

  // user routes
  var users = require(config.root + '/app/controllers/users')
    , picks = require(config.root+ '/app/controllers/picks')
    , features = require(config.root + '/app/models/features.json');

  // app.get('/logout', users.logout);

  app.get('/login', function(req, res) {
    res.redirect('/');
  });

  // app.post('/login', 
  //   passport.authenticate('local', 
  //     { failureRedirect: '/', 
  //       successRedirect: '/admin',
  //       failureFlash: 'Invalid password.'}
  //   ), 
  //   users.session);

  app.post('/createAndSavePicks', users.createAndSavePicks);

  app.get("/bracket", function(req, res) {
    res.locals = {
      features: features
    };
    res.render("layout", {
      partials: {
        partial: "partials/bracket"
      }
    });
  });

  app.get('/main', function(req, res) {
    res.render("layout", {
      partials: {
        partial: 'partials/main'
      }
    });
  });

  app.get("/final", function(req, res) {
    picks.getPercent(req, res, function(mine, total) {
      var i = '',
          percent = Math.floor((mine / total) * 100);
      console.log('render',mine,total);
      console.log('percent',percent);
      _.each(features, function(e) {
        _.each(e.pick, function(ele) {
          if (ele.id == req.query['id']) {
            i = ele.type;
          }
        });
      });
      res.locals = {
        yourChoice: i,
        percent: percent
      };
      res.render("layout", {
        partials: {
          partial: "partials/final"
        }
      });
    });
  });

  app.get("/", function(req, res) {
    res.render("layout", {
      partials: {
        partial: "partials/index"
      }
    });
  });
};