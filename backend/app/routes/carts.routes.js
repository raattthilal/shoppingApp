
module.exports = (app, methods) => {
    const Carts = methods.loadController('carts');
    Carts.methods.get('list', Carts.listCarts, { auth: true });
    Carts.methods.get('count', Carts.countCarts, { auth: true });
    Carts.methods.post('create', Carts.addCarts, { auth: true });
    Carts.methods.put(':id', Carts.updateCarts, { auth: true });
    Carts.methods.delete(':id', Carts.deleteCarts, { auth: true });
    Carts.methods.get('clear', Carts.clearAll, { auth: true });

}