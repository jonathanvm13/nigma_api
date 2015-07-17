var Scorm = require('../controllers/scorm'),
    UserCtrl = require('../controllers/user'),
    QuestionCtrl = require('../controllers/question'),
    FolderCtrl = require('../controllers/folder');

var routes = [

  //Scorm
  {path: '/scorms/',                 httpMethod: 'POST',   middleware: [Scorm.zipAndDownloadFile]},
  {path: '/scorms/',                 httpMethod: 'PUT',    middleware: [Scorm.update]},
  {path: '/scorms/download',         httpMethod: 'GET',    middleware: [Scorm.Download]},
  {path: '/scorms/uploadfiles',      httpMethod: 'POST',   middleware: [Scorm.uploadFiles]},

  // Folder
  {path: '/folders',                 httpMethod: 'POST',   middleware: [FolderCtrl.create]},
  {path: '/folders/:folderid',             httpMethod: 'PUT',    middleware: [FolderCtrl.update]},
  {path: '/folders/:folderid',             httpMethod: 'DELETE', middleware: [FolderCtrl.delete]},
  {path: '/folders',                 httpMethod: 'GET',    middleware: [FolderCtrl.list]},

  //Question
  {path: '/folders/:folderid/questions',httpMethod: 'POST',   middleware: [QuestionCtrl.createQuestion]},
  {path: '/questions/:questionid',           httpMethod: 'PUT',    middleware: [QuestionCtrl.updateQuestion]},
  {path: '/questions/:questionid',           httpMethod: 'DELETE', middleware: [QuestionCtrl.deleteQuestion]},

  //User
  {path: '/users',                   httpMethod: 'POST',   middleware: [UserCtrl.create]},
  {path: '/users/login',             httpMethod: 'POST',   middleware: [UserCtrl.login]},

];

module.exports = routes;