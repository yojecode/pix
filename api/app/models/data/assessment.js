'use strict';

const Bookshelf = require('../../../config/bookshelf');
const User = require('./user');
const Answer = require('./answer');

module.exports = Bookshelf.Model.extend({

  tableName: 'assessments',

  answers: () => {
    return this.hasMany(Answer);
  }

});