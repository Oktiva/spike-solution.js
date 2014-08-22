module.exports = function(sequelize, DataTypes) {
  var RoomAdmin = sequelize.define('RoomAdmin', {
  }, {
    paranoid: true,
    underscore: true,
    freezeTableName: true,
    tableName: 'room_admin',
  })
  return RoomAdmin
}
