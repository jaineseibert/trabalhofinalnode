module.exports = function(app) {
	var autenticar = require('./../middleware/autenticador')
		, produtos = app.controllers.produtos;
	app.get('/produtos', autenticar, produtos.index);
	app.get('/produtos/produtos', autenticar, produtos.index);
	app.get('/produto/produtos', autenticar, produtos.index);
	app.get('/produtos/lista', autenticar, produtos.show);
	app.get('/produto/:id', autenticar, produtos.show);
	app.post('/produto', autenticar, produtos.create);
	app.get('/produto/:id/editar', autenticar, produtos.edit);
	app.put('/produto/:id', autenticar, produtos.update);
	app.delete('/produto/:id', autenticar, produtos.destroy);
};