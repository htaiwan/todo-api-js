var cryptojs = require('crypto-js');

module.exports = function(db) {

	return {
		requireAuthentication: function(req, res, next) {
			var token = req.get('Auth') || '';
			// find token in the token table
			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function(tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				// token exist
				req.token = tokenInstance;
				// search the user from token
				return db.user.findByToken(token);
			}).then(function(user) {
				// find the user
				req.user = user;
				next();
			}).catch(function() {
				res.status(401).send();
			});
		}
	};
};