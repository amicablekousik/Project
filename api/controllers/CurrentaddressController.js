module.exports = {
      //Get the Curentaddress
	/*index: function (req, res) {
		Currentaddress.index(req.body, function (err, data) {
			if (!err) {
				res.json(data);
			} else {
				res.negotiate(err);
			}
		});
	},*/




	index: function (req, res) {
		var user = req.session.user;
		Currentaddress.index(user, function (err, caddress) {
			if (!err) {
				res.json(caddress);
			} else {
				res.negotiate(err);
			}
		});
	},



	// Add Currentaddress
	add: function (req, res) {
		Currentaddress.add(req.body, function (err, data) {
			if (!err) {
				res.json(data);
			} else {
				res.negotiate(err);
			}
		});
	},

	//Edit the Currentaddress details
	edit: function (req, res) {
		var currentaddressId = req.param('id');
		Currentaddress.edit(currentaddressId, req.body, function (err, data) {
			if (!err) {
				res.json(data);
			} else {
				res.negotiate(err);
			}
		});
	},

	//Delete Currentaddress
	delete: function (req, res){
		var currentaddressId = req.param('id');
		if (currentaddressId) {
			Currentaddress.delete(currentaddressId, function (err, data) {
				if (!err) {
					res.json("Deleted Successfully");
				} else { 
					res.negotiate(err);
				}
			});
		} else {
			res.status(400).json({message: "ID is missing"});
		}
	}
};