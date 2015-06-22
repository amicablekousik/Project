/*module.exports = {

     //Get list of income
	index: function (req, res) {
		Income.index(req.body, function (err, data) {
			if (!err) {
				res.json(data);
			} else {
				res.negotiate(err);
			}
		});
	},



	// Add income
	add: function (req, res) {
		var user = req.session.user;
		req.body.user = user.id;
		Income.add(req.body, function (err, income) {
			if (!err) {
				res.json(income);
			} else {
				res.negotiate(err);
			}
		});
	},

	//Edit the income details
	edit: function (req, res) {
		var incomeId = req.param('id');
		Income.edit(incomeId, req.body, function (err, income) {
			if (!err) {
				res.json(income);
			} else {
				res.negotiate(err);
			}
		});
	},

	//Delete income
	delete: function (req, res){
		var incomeId = req.param('id');
		if (incomeId) {
			income.delete(incomeId, function (err, income) {
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
}*/