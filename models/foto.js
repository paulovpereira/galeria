
module.exports = function(sequelize, DataTypes) {
  var Foto = sequelize.define('Foto', {
    id: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    caminho: DataTypes.STRING
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