
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Pick = mongoose.model('Pick')
  , User = mongoose.model('User');

exports.getPercent = function(req, res, callback) {
  var total = 0,
      totalDone = false,
      mineDone = false,
      mine = 0,
      pick = req.query.id,
      totalCallback = function() {
        if (totalDone === true && mineDone === true) {
          if (callback && typeof(callback) === 'function') {
            callback(mine, total);
          }
        }
      };
  Pick.count({}, function(err, count) {
    if (err) {
      console.log('err',err);
    }
    total = count;
    totalDone = true;
    totalCallback();
  });
  Pick.count({ finalPick: pick }, function(err, count) {
    if (err) {
      console.log('err',err);
    }
    mine = count;
    mineDone = true;
    totalCallback();
  });
};