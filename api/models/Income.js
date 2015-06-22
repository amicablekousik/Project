/*module.exports = {
	tableName: "income",
  
  	attributes: {
		FirstMonth: {
			type: "int"
			
		},

		SecondMonth: {
			type: "int"

			
		},

		ThirdMonth: {
			type : "int"
			
		},

		
		users: {
			collection: 'user',
			via: 'incomes'
		}
		

	},

	index: function (data, callback) {
		Income.find().populateAll().exec(function (err, data) {
			if (!err) {
				callback(null, data);
			} else {
				callback(err);
			}
		});
	},

	 add: function (data, callback) {
		Income.create(data).exec(function (err, income) {
			if(!err) {
				var response = {};
				response = income;
				
					
						User.findOne(income.user, function(err, user){
							if(!err){
								response.user = user;
								callback(null, response);
							} else {
								callback({status: 400, message: "User not found"});	
							}
						});
					} 
				
			else {
				callback(err);
			}
		});
	},
	edit: function (incomeId, req, callback) {
		Income.update({id : incomeId}, req, function (err, data) {
			if (!err) {
				if (data.length == 0) {
					callback({status: 400, message: "income not found"});
				} else {
					callback(null, data);
				}
			} else {
				callback(err);
			}
		});
	},
	delete: function (incomeId, callback) {
		Income.destroy({id : incomeId}).exec( function (err, data) {
			if (!err) {
				if (data.length == 0) {
					return callback({status: 400, message: "income not found"});
				} else {
					return callback(null, data.id);
				}
			} else {
				return callback(err);
			}
		});
    }


};*/