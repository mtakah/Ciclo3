'use strict';
const {
  Model
} = require('sequelize');
const pedido = require('./pedido');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Servico.belongsToMany(models.Pedido,{
        through: 'ItemPedido', as: 'serv'
      });
      Servico.hasMany(models.ItemPedido, {foreignKey: 'ServicoId', as: 'Item_servicos'});
    }
  };
  Servico.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Servico',
  });
  return Servico;
};