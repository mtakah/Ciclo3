const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models'); 

const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;
let compra=models.Compra;
let itemcompra=models.ItemCompra;
let produto=models.Produto;

app.get('/', function(req, res){
    res.send('Olá, mundo!')
});

app.post('/servicos', async(req, res) =>{
    await servico.create(
        req.body 
    ).then(function(){
        return res.json({
            error: false,
            message: "O serviço foi criado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar"
        }) 
    });
});

app.post('/clientes', async(req, res) =>{
    await cliente.create(
            req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    })
});

app.post('/pedidos', async(req, res) =>{
    await pedido.create(
            req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    })
});

app.post('/itenspedido', async(req, res) =>{
    await itempedido.create(
            req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    })
});

app.post('/compras', async(req, res) =>{
    await compra.create(
            req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra realizada com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    })
});

app.post('/produtos', async(req, res) =>{
    await produto.create(
        req.body 
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar"
        }) 
    });
});

app.post('/itenscompra', async(req, res) =>{
    await itemcompra.create(
            req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    })
});

//////////////

app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        raw: true,
        order: [['createdAt', 'ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listapedidos', async(req, res)=>{
    await pedido.findAll({
        raw: true,
        order: [['id', 'ASC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

app.get('/listaitenspedido', async(req, res)=>{
    await itempedido.findAll({
        //raw: true,
        order: [['valor', 'ASC']]
    }).then(function(itenspedido){
        res.json({itenspedido})
    });
});

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        //raw: true,
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/listacompras', async(req, res)=>{
    await compra.findAll({
        raw: true,
        order: [['data', 'ASC']]
    }).then(function(compras){
        res.json({compras})
    });
});

app.get('/listaprodutos', async(req, res)=>{
    await produto.findAll({
        //raw: true,
        order: [['nome', 'ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});

app.get('/listaitenscompra', async(req, res)=>{
    await itemcompra.findAll({
        //raw: true,
        order: [['valor', 'ASC']]
    }).then(function(itenscompra){
        res.json({itenscompra})
    });
});

/////////////////

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/ofertaclientes', async(req, res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

app.get('/ofertapedidos', async(req, res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    });
});

//////////////////

app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then(servico =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível conectar!"
        });
    });
});

/////////////////////

app.put('/atualizaservico', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração do serviço."
            });
        });
    });
});

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id, {include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    })
})

app.put('/pedidos/:id/editaritempedido', async(req, res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    
    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso!",
            itens 
        }); 
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro não foi possível alterar."
        });
    });
});

app.put('/compras/:id/editaritemcompra', async(req, res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    
    if (!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'A compra não foi encontrada.'
        });
    };

    if (!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'O produto não foi encontrado.'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "A compra foi alterada com sucesso!",
            itens 
        }); 
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro não foi possível alterar."
        });
    });
});

/////////////////

app.get('/clientes/:id', async(req, res)=>{
    await cliente.findByPk(req.params.id, {include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    })
})

app.put('/atualizacliente', async(req, res)=>{
    await cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso!"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração do cliente."
            });
        });
    });
});

app.put('/atualizapedido', async(req, res)=>{
    await pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso!"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração do pedido."
            });
        });
    });
});

app.put('/atualizaproduto', async(req, res)=>{
    await produto.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto alterado com sucesso!"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração do produto."
            });
        });
    });
});

app.put('/atualizaitemcompra', async(req, res)=>{
    await itemcompra.update(req.body,{
        where: {compraid: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item alterado com sucesso!"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração do item."
            });
        });
    });
});

app.put('/atualizacompra', async(req, res)=>{
    await compra.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra alterada com sucesso!"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro na alteração da compra."
            });
        });
    });
});

//////////////

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        }); 
    });
});

app.get('/excluirpedido/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o pedido."
        }); 
    });
});

app.get('/excluirservico/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o serviço."
        }); 
    });
});

app.get('/excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "A compra foi excluída com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a compra."
        }); 
    });
});

app.get('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        }); 
    });
});

app.get('/excluiritempedido/:id', async(req, res)=>{
    await itempedido.destroy({
        where: {pedidoid: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o item."
        }); 
    });
});

app.get('/excluiritemcompra/:id', async(req, res)=>{
    await itemcompra.destroy({
        where: {compraid: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o item."
        }); 
    });
});

////////////

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})