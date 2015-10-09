'use strict';

var helper = require('../lib/helper.js');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var QuestionHelper = helper.question;
var _ = require('lodash');
var Config = require("../config/config");

module.exports = {

  zipAndDownloadFile: function (req, res) {
    var questionId = req.params.questionid;
    var originFolderRoute = "./questions/" + questionId;
    var copyFolderRoute = "./questions/" + questionId + "-scorm";
    var zipRoute = "./questions/" + questionId + ".zip";
    var scormQuestionDataRoute = copyFolderRoute + "/js/xml-question.js";

    //Copy question folder for updated her data before zip
    helper.copyFolderQuestion(originFolderRoute, copyFolderRoute);

    QuestionHelper.getById(questionId, function (err, question) {
      if (err || !question) {
        return res.status(400).json({
          ok: false,
          message: "Oops! Something went wrong!"
        });
      }

      if (question.images && question.images.length > 0) {
        helper.copyImagesToQuestionFolder(copyFolderRoute, question.images);
      }

      var originalData = JSON.stringify(question.data);
      var modifiedData = helper.updateImagesUrls(originalData);
      var data = "var question = " + modifiedData + "; question = JSON.parse(question);window.question = window.question || question;";

      fs.writeFile(scormQuestionDataRoute, data, function (err) {
        if (err) {
          return res.status(400).jsonp({ok: false});
        }

        helper.zipFile(copyFolderRoute, zipRoute, function (ok) {
          if (!ok) {
            return res.status(400).jsonp({ok: false, message: "Oops! Something went wrong!"});
          }

          //clean if folder exist
          //helper.deleteFolder(copyFolderRoute);

          return res.status(200).jsonp({ok: true});
        });
      });
    })
  },

  update: function (req, res) {
    var question = req.body.question;
    var questionId = req.params.questionid;

    QuestionHelper.updateData(questionId, question, function (err, rows) {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: err.message
        });
      }

      //Create or update question folder with scorm template
      helper.copyScormTemplate(questionId);

      var route = "./questions/" + questionId + "/js/xml-question.js";
      var data = "var question = " + JSON.stringify(question) + "; question = JSON.parse(question);window.question = window.question || question;";

      fs.writeFile(route, data, function (err) {
        if (err) {
          return res.status(400).jsonp({ok: false});
        }

        res.status(200).jsonp({ok: true, url: Config.apiUrl + "/static/" + questionId + "/launch.html"});
      });
    });
  },

  Download: function (req, res) {
    var questionId = req.params.questionid;

    var file = "./questions/" + questionId + ".zip";

    res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(file));
    res.setHeader('Content-type', mime.lookup(file));

    fs.createReadStream(file).pipe(res);
  },

  uploadFiles: function (req, res) {
    var questionId = req.params.questionid;
    var imageFile;

    _.forIn(req.files, function (file, field) {
      imageFile = file.name;
    });

    QuestionHelper.addImage(questionId, imageFile, function (err) {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: err.message || "Oops! Something went wrong!"
        });
      }

      return res.status(200).jsonp({url: Config.apiUrl + "/static/" + imageFile});
    })
  }

};
