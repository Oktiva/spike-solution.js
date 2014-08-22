module.exports = function(sequelize, DataTypes) {
  var RoomMember = sequelize.define('RoomMember', {
  }, {
    paranoid: true,
    underscore: true,
    freezeTableName: true,
    tableName: 'room_member',
  })
  return RoomMember
}
