

module.exports = {

	// User Registration
	add: function (req, res) {
		User.add(req.body, function (err, user) {
			if (!err) {
				res.json(user);

			} else {
				res.negotiate(err);
			}
		});
	},

	//Get  user details
	index: function (req, res) {
		User.index(req.body, function (err, users) {
			if (!err) {
				users = users.map(function(obj){ 
                    delete obj.password,
                    delete obj.hashKey
                    
                    /*return obj;*/
                });
				res.json(users);
			} else {
				res.negotiate(err);
			}
		});
	},

	
	
	

	//Edit the User Detail
	edit: function (req, res) {

		var userId = req.session.user.id;

		if(userId){
			User.edit(userId, req.body, function (err, user) {
				if (!err) {
					delete user['password'];
					delete user['hashKey'];
					res.json(user);
				} else {
					res.negotiate(err);
				}
			});
		}
	},

	//Login API
    login: function(req, res){
		if (!req.body || !req.body.username || !req.body.password) {
			res.badRequest('Username or password missing in request');
		} else {
			User.login(req.body, function (err, user) {
				if (!err) {
					req.session.authenticated = true;
					
					req.session.user = user;
					res.json(user);
                } else {
					res.negotiate(err);
                }   
            });
        }
    },

    //Logout API
    logout: function (req, res) {
    	req.session.user = null;
        res.json("Logout Successfully");
    },

    //Delete user
    delete: function (req, res){
    	var userId = req.param('id');
        if (userId) {
        	User.delete(userId, function (err, user) {
        		if (!err) {
        			res.json("Deleted Successfully");
        		} else { 
        			res.negotiate(err);
        		}
        	})
        } else {
        	res.status(400).json({message: "ID is missing"});
        }
    }

    
};

