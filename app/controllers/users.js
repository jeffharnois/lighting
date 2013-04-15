
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Pick = mongoose.model('Pick')
  , User = mongoose.model('User');

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/');
};

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  });
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */

exports.session = function (req, res) {
  res.redirect('/');
};

/**
 * Create user
 */

exports.createAndSavePicks = function (req, res) {
  var newUser = { badge: req.body.user },
      user = new User(newUser);
  res.contentType('json');
  User.findOne({badge: req.body.badge}, function(err, obj) {
    if (err) {
      return res.send({ success: false, err: err});
    }
    if (!obj) {
      user.provider = 'local';
      user.save(function (err) {
        if (err) {
          return res.send({ success: false, err: err});
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          req.body.user = user._id;
          var pick = new Pick(req.body);

          pick.save(function(err) {
            if (err) {
              return res.send({ success: false, err: err});
            }
            User.findByIdAndUpdate(user._id, {picks: pick._id}, function(err, resp) {
              if (err) {
                return res.send({ success: false, err: err});
              }
              return res.send({ success: true, user: user, pick: pick });
            });
          });
        });
      });
    } else {
      return res.send({ success: false, error: "exists" });
    }
  });
};

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('Failed to load User ' + id));
      }
      req.profile = user;
      next();
    });
};
