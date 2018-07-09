module.exports = function(app) {
	var Schema = require('mongoose').Schema;
	var produto = Schema({
		descricao: String
		, quantidade: Number
	});
	var usuario = Schema({
		nome: {type: String, required: true}
		, email: {type: String, required: true
		, index: {unique: true}}
		, produtos: [produto]
	});
	return db.model('usuarios', usuario);
};