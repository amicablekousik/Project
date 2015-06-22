module.exports = {
	tableName: "currentaddress",
  
  	attributes: {
		street: {
			type: "string"
			
		},

		city: {
			type: "string"
			
		},

		state: {
			type : "string"
			
		},
      pincode: {
			type: "int"
		
			
		},

		isHouseRented: {
			type: "boolean"
			
		},

		own : {
			type : "string",
			enum: ['family', 'self', 'Joint']
			
		},
		users: {
			collection: 'User',
			via: 'caddress'
		}	
    
		
		

	},


	index: function (user, callback) {
		User.findOne({id: user.id}).populate('caddress').exec(function (err, user) {
				if (!err) {
					callback(null, user.caddress);
				} else {
					callback(err);
				}
			});
	},
    
    add: function (data, callback) {
		Currentaddress.create(data, function (err, data) {
			if(!err) {
				callback(null, data);
			} else {
				callback(err);
			}
		});
	},
	 
	edit: function (currentaddressId, req, callback) {
		Currentaddress.update({id : currentaddressId}, req, function (err, data) {
			if (!err) {
				if (data.length == 0) {
					callback({status: 400, message: "CurrentAddress not found"});
				} else {
					callback(null, data);
				}
			} else {
				callback(err);
			}
		});
	},
	delete: function (currentaddressId, callback) {
		Currentaddress.destroy({id : currentaddressId}).exec( function (err, data) {
			if (!err) {
				if (data.length == 0) {
					return callback({status: 400, message: "Currentaddress not found"});
				} else {
					return callback(null, data.id);
				}
			} else {
				return callback(err);
			}
		});
    }


};