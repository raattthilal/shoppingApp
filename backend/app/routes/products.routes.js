
module.exports = (app, methods) => {
    
    const Products = methods.loadController('products');

    Products.methods.get('list', Products.listPost, { auth: true });
    Products.methods.get(':id', Products.getPost, { auth: true });
    Products.methods.post('create', Products.createPost, { auth: true });
    Products.methods.delete(':id', Products.deletePost, { auth: true });

}