module.exports = {
	port:5000,
	routes:  [
		{
			path:"authenticate",
			port:"5001"
		},
		{
			path:"carts",
			port:"5002"
		},
		{
			path:"wishlist",
			port:"5003"
		},
		{
			path:"products",
			port:"5004"
		},
		{
			path:"categories",
			port:"5005"
		},

	]

}