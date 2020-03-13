'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: DataTypes.TEXT,
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};