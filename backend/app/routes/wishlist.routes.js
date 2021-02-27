
module.exports = (app, methods) => {
    
    const Wishlist = methods.loadController('wishlist');

    Wishlist.methods.get('list', Wishlist.listWishlist, { auth: true });
    Wishlist.methods.post('create', Wishlist.addWishlist, { auth: true });
    Wishlist.methods.get('count', Wishlist.countWishlist, { auth: true });
    Wishlist.methods.delete(':id', Wishlist.deleteWishlist, { auth: true });

}