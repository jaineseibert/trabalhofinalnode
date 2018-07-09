module.exports = function (app) {
    var Usuario = app.models.usuario;
    var produtoController = {
        index: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var produtos = usuario.produtos;
                var resultado = {produtos: produtos};
                res.render('produtos/index', resultado);
            });
        },
        create: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var produto = req.body.produto;
                var produtos = usuario.produtos;
                produtos.push(produto);
                usuario.save(function () {
                    res.redirect('/produtos');
                });
            });
        },
        show: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var produtos = usuario.produtos;
                var resultado = {produtos: produtos};
                res.render('produtos/show', resultado);
            });
        },
        edit: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var produtoID = req.params.id;
                var produto = usuario.produtos.id(produtoID);
                var resultado = {produto: produto};
                res.render('produtos/edit', resultado);
            });
        },
        update: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var produtoID = req.params.id;
                var produto = usuario.produtos.id(produtoID);
                produto.descricao = req.body.produto.descricao;
                produto.quantidade = req.body.produto.quantidade;
                usuario.save(function () {
                    res.redirect('/produtos');
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var produtoID = req.params.id;
                usuario.produtos.id(produtoID).remove();
                usuario.save(function () {
                    res.redirect('lista');
                });
            });
        }
        // fim do controller...
    };
    return produtoController;
};