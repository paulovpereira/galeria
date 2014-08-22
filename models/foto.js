
module.exports = function(sequelize, DataTypes) {
  var Foto = sequelize.define('Foto', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: DataTypes.STRING,
    caminho: {type: DataTypes.STRING, allowNull: false}
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
//        Foto.hasMany(models.Task);
      }
    }
  });

  return Foto;
};