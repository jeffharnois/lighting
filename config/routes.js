var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , _ = require('underscore')
  , util = require('util')
  , fs = require('fs');

module.exports = function (app, passport, auth, config, hoganTemplateRenderer) {

  // user routes
  var users = require(config.root + '/app/controllers/users')
    , picks = require(config.root+ '/app/controllers/picks')
    // , csvParse = require(config.root + '/app/controllers/csv')
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

//   var csv = [{
//     "user": "4567",
//     "finalPick": "Daylight Driven Lighting",
//     "bracketFinal": {
//         "firstRound": {
//             "first": "Daylight Driven Lighting",
//             "second": "Fire Police Emergeny Control"
//         }
//     },
//     "bracketFour": {
//         "secondRound": "Daylight Driven Lighting",
//         "firstRound": {
//             "first": "DALI",
//             "second": "ZWave"
//         }
//     },
//     "bracketThree": {
//         "secondRound": "Fire Police Emergeny Control",
//         "firstRound": {
//             "first": "Diagnostic Health Check",
//             "second": "Fire Police Emergeny Control"
//         }
//     },
//     "bracketTwo": {
//         "secondRound": "DALI",
//         "firstRound": {
//             "first": "Occupancy Motion Sensor",
//             "second": "Daylight Driven Lighting"
//         }
//     },
//     "bracketOne": {
//         "secondRound": "Smart Phone Dimming",
//         "firstRound": {
//             "first": "No Dimming",
//             "second": "Smart Phone Dimming"
//         }
//     }
// }];

//   app.get('/csv', function(req, res) {
//     csvParse.convert(csv, function(resp) {
//       res.locals = {
//         data: resp
//       };
//       res.render("layout", {
//         partials: {
//           partial: "partials/csv"
//         }
//       });
//     });
    
//   });

  app.get("/", function(req, res) {
    res.render("layout", {
      partials: {
        partial: "partials/index"
      }
    });
  });
};