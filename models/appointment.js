'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Dentist, {
        foreignKey: 'dentist_id'
      });

      Appointment.belongsTo(models.Pacient, {
        foreignKey: 'pacient_id'
      });

      Appointment.belongsTo(models.Treatment, {
        foreignKey: 'treatment_id'
      });
    }
  }
  Appointment.init({
    pacient_id : DataTypes.INTEGER,
    dentist_id: DataTypes.INTEGER,
    treatment_id : DataTypes.INTEGER,
    status: DataTypes.STRING,
    observations: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};