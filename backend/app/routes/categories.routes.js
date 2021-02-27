
module.exports = (app, methods) => {
    
    const Categories = methods.loadController('categories');

    Categories.methods.get('list', Categories.listCategories, { auth: true });
    
    Categories.methods.post('create', Categories.createCategories, { auth: true });
 
    Categories.methods.delete(':id', Categories.deleteCategories, { auth: true });

}