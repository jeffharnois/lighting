
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , path = require('path');

module.exports = function (app, config, passport, HoganTemplateRenderer) {
  var cons = require('consolidate');

  app.set('showStackError', true);
  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  app.engine('html', cons.hogan);
  app.enable('view cache');

  app.set('layout','layout');

  app.enable('view cache');

  app.configure(function () {

    app.set('views', config.root + "/app/views");
    // Set the default template extension to .mustache
    app.set('view engine', 'html');

    app.use(express.logger('dev'));

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // cookieParser should be above session
    app.use(express.cookieParser());

    // express/mongo session storage
    app.use(express.session({
      secret: 'noobjs',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // connect flash for flash messages
    app.use(flash());

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.favicon());

    // routes should be at the last
    app.use(app.router);

    app.use(express.static(path.join(config.root + '/public')));

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')){ return next(); }

      // log it
      console.error(err.stack);

      // error page
      res.status(500).render('500', { error: err.stack });
    });

    // // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl });
    });

  });
};
