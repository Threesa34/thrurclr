const security = require('./config/auth');
const multer = require('multer');
var path = require('path');
const dir = './app/uploads';

var user = require('./controller/user.Ctrl');
var members = require('./controller/members.ctrl');


let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
	}
});

let upload = multer({
	storage: storage
});



module.exports = {

	configure: function (app) {
		
		app.post('/api/authUser', function (req, res) {
			user.AuthenticateUser(req, res);
		});

		app.post('/api/SetNewPassword', function (req, res) {
			security(req, res);user.SetNewPassword(req, res);
		});

		app.post('/api/ForgotPassword', function (req, res) {
			user.ForgotPassword(req, res);
		});

		app.post('/api/SaveMemberDetails', function (req, res) {
			security(req, res);members.SaveMemberDetails(req, res);
		});

		app.post('/api/ImportMemberDetails', function (req, res) {
			security(req, res);members.ImportMemberDetails(req, res);
		});

		app.get('/api/ListMembers', function (req, res) {
			security(req, res);members.ListMembers(req, res);
		});
		
		app.get('/api/ListMembersNearMe', function (req, res) {
			security(req, res);members.ListMembersNearMe(req, res);
		});

		app.get('/api/getDashboardCounts', function (req, res) {
			security(req, res);members.getDashboardCounts(req, res);
		});


    }
};