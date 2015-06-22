var crypto = require('crypto');

module.exports = {
	tableName: "user",
  
  	attributes: {
		

	   username: {
			type: "string"
			
		},
	  password: {
			type: "string",
			size: 50
		},
      hashKey : {
			type : "string"
		},				
	  caddress: {
			collection: 'Currentaddress',
			via: 'users'
		}	
		

	},


index: function (data, callback) {
		User.find().populate("caddress").exec(function (err, data) {
			if (!err) {
				callback(null, data);
			} else {
				callback(err);
			}
		});
	},

	//adding user 
	add: function (data, callback) {

		/*data.role = 'user';
		*/
          data.hashKey = generateSalt();

		   saltAndHash(data.password, function(encryptedPswd){
			data.password = encryptedPswd;

			User.create(data, function (err, user) {
				if(!err) {
					delete user['password'];
					callback(null, user);
				} else {
					callback(err);
				}
			});

		});
		
		
	},

	// edit the details
	edit: function (userId, data, callback) {
		
		if (data.password) {
			saltAndHash(data.password, function (hash) {
				data.password = hash;
			});
		};
		User.update({id : userId}, data, function (err, user) {
			if (!err) {
				if (user.length == 0) {
					callback({status: 402, message: "User not found"});
				} else {
					delete data['password'];
					callback(null, user[0]);
				}
			} else {
				callback(err);
			}
		});
	},


	

    //login 
	login: function (opts, callback) {

		User.findOne({where: {username: opts.username}}).populate("caddress").exec(function (err, user) {
			if (err) {
				callback(err);
			} else if(user) {
				
					validatePassword(opts.password, user.password, function (res) {
						if(res) {
							delete user['password'];
							callback(null,user);
						} else {
							callback({status: 402, message: "username or password does not match"});
						}
					});
				
			} else {
				callback({status: 402, message: "User does not exists"});
			} 
	    });
	},

	//For Deleting the user
	delete: function (userId, callback) {
		User.destroy({id : userId}).exec(function (err, data) {
			if (!err) {
				if (data.length == 0) {
					callback({status: 402, message: "User not found"});
				} else {
					callback(null, data.id);
				}
			} else {
				callback(err);
			}
		});
    }

    
};

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
};

var md5 = function (str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function (pass, callback) {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
};

var validatePassword = function (plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(hashedPass === validHash);
};
