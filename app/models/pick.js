/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/**
 * Pick Schema
 */

var PickSchema = new Schema({
  user: ObjectId,
  bracketOne: {
    firstRound: {
      first: String,
      second: String
    },
    secondRound: String
  },
  bracketTwo: {
    firstRound: {
      first: String,
      second: String
    },
    secondRound: String
  },
  bracketThree: {
    firstRound: {
      first: String,
      second: String
    },
    secondRound: String
  },
  bracketFour: {
    firstRound: {
      first: String,
      second: String
    },
    secondRound: String
  },
  bracketFinal: {
    firstRound: {
      first: String,
      second: String
    }
  },
  finalPick: String
}, {versionKey: false});

/**
 * Pre-save hook
 */

PickSchema.pre('save', function(next) {
  if (!this.isNew) {
    console.log('not a new');
    return next();
  } 

  next();
});

/**
 * Methods
 */

mongoose.model('Pick', PickSchema)
