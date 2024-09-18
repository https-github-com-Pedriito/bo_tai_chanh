const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const MenuItem = require('./models/menuItem'); // Assurez-vous que le modèle existe

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [MenuItem],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);

module.exports = router;