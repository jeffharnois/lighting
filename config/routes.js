var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , util = require('util')
  , fs = require('fs');

module.exports = function (app, passport, auth, config, hoganTemplateRenderer) {

  // user routes
  // var users = require('../app/controllers/users');

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

  app.post('/create', function(req, res) {
    res.contentType('json');
    res.send({ success: true });
  });

  // leave this commented
  // app.post('/signup', users.create);

  app.get("/bracket", function(req, res) {
    res.locals = {
      features: [
        {
          feature: "Dimming",
          pick: [
            {id: 1, type: "No Dimming", desc: false},
            {id: 2, type: "0-10 Dimming", desc: "Basic analog dimming"},
            {id: 3, type: "Phase Cut Triac", desc: "Residential wall mounted dimming"},
            {id: 4, type: "SMARTY phone dimming", desc: "Remove control wiht SMART phone"}
          ]
        },
        {
          feature: "Sensor and Technology",
          pick: [
            {id: 5, type: "Occupancy Motion Sensor", desc: "Monitor movement and people in area of light"},
            {id: 6, type: "Environmental Sensor CO2", desc: "Monitor local environmental factors"},
            {id: 7, type: "Ambient Light Sensor", desc: "Monitor ambient light levels and adjust light output for  constant illumination"},
            {id: 8, type: "Daylight Harvesting", desc: "Redice lighting when daylight gets brighter to save energy"}
          ]
        },
        {
          feature: "Control Features",
          pick: [
            {id: 9, type: "Diagnostic Health Check", desc: "Light system function self-check"},
            {id: 10, type: "Color Tuning", desc: "User can adjust light color (CCT)"},
            {id: 11, type: "Fire Police Emergency Control", desc: "Emergency responders control lighting"},
            {id: 12, type: "Scheduled Dimming", desc: "Pre-set periods of dimming to save energy"}
          ]
        },
        {
          feature: "Communication",
          pick: [
            {id: 13, type: "DALI", desc: "Software configurable broadband configurable radio protocol"},
            {id: 14, type: "ZigBee", desc: "Mesh wireless based on low power IEEE 80 2wireless"},
            {id: 15, type: "Zwave", desc: "Wireless mesh networking"},
            {id: 16, type: "6LoWPAN", desc: "Internet protocol over low power wireless"}
          ]
        }
      ]
    };
    res.render("layout", {
      partials: {
        header: "partials/header",
        partial: "partials/bracket"
      }
    });
  });

  app.get("/", function(req, res) {
    res.render("layout", {
      partials: {
        header: "partials/header",
        partial: "partials/index"
      }
    });
  });
};