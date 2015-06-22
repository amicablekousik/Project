/*module.exports = {
	tableName: "businesscard",
  
  	attributes: {
		name: {
			type: "string"
			
		},

		email: {
			type: "email",
			required : true,
			unique: true,
			size: 100
		},

		phone: {
			type: "int",
			size: 10
		},
      designation: {
			type: "string"
		},

		websiteUrl : {
			type : "string"
		},

		
		users: {
			collection: 'user',
			via: 'businesscards'
		}
		

	}


};*/