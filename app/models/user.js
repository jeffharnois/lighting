/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , crypto = require('crypto')
  , _ = require('underscore')

/**
 * User Schema
 */

var UserSchema = new Schema({
  badge: String,
  picks: ObjectId
}, {versionKey: false});

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

/**
 * Virtuals
 */

UserSchema.path('badge').validate(function (badge) {
  return badge.length;
}, 'Badge cannot be blank');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    console.log('not a new');
    return next();
  } 

  if (!validatePresenceOf(this.badge)) {
    next(new Error('Invalid badge'));
  } else {
    next();
  }
});

/**
 * Methods
 */

mongoose.model('User', UserSchema)
