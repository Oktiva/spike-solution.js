module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    paranoid: true,
    underscore: true,
    freezeTableName: true,
    tableName: 'account',
    classMethods: {
      associate: function(model) {
        Account.hasMany(model.Room, {as: 'admin_of_rooms', through: RoomAdmin})
        Account.hasMany(model.Room, {as: 'member_of_rooms', through: RoomMember})
      }
    }
  })
  return Account
}
