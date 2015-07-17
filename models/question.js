var mongoose = require('mongoose'),
  async = require('async'),
  Schema = mongoose.Schema;

var question = mongoose.Schema(
  {
    data: String,
    metadata: String,
    name: String,
    folder: {type: String, required: true, ref: 'folder'},
    delete: Boolean
  }
);

question.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v;
    delete folder;
  }
});

question.methods.create = function (cb) {
  var Folder = require('./folder'),
    self = this;

  async.waterfall(
    [
      function (next) {

        self.save(function (err, question) {
          next(err, question);
        });
      },
      function (question, next) {

        Folder.addQuestion(question.folder, question._id, function (err, rows) {
          next(err, question);
        });
      }
    ],
    cb
  )
};

question.statics.updateName = function (questionId, name, cb) {
  var conditions = {
      _id: questionId
    },
    update = {
      "$set": {
        "name": name
      }
    };

  this.update(conditions, update, cb);
};

question.statics.deleteById = function (questionId, cb) {
  var conditions = {
      _id: questionId
    },
    update = {
      "$set": {
        "delete": true
      }
    };

  this.update(conditions, update, cb);
};

module.exports = mongoose.model('question', question);
