module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    name: DataTypes.STRING
  },{
    paranoid: true,
    underscore: true,
    freezeTableName: true,
    tableName: 'room',
    classMethods: {
      associate: function(model) {
        Room.hasMany(model.User, { as: 'admins',  through: RoomAdmin })
        Room.hasMany(model.User, { as: 'members', through: RoomMember })
      }
    }
  })
  return Room
}
