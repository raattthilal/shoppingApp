module.exports = (app, methods) => {
    const user = methods.loadController('authenticate');
    user.methods.post('login', user.authenticate, { auth: false });
    user.methods.post('create', user.adduser, { auth: false });
}
