import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class MvgReport extends Model {
  public id!: number;
  public name!: string;
  public operationType!: string;
  public ammoType!: string;
  public ammoCount!: number;
  public remainingAmmoCount!: number;
  public responsiblePerson!: string;
}

MvgReport.init(
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Name: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    OperationType: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    AmmoType: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    AmmoCount: {
      type: new DataTypes.INTEGER
    },
    RemainingAmmoCount: {
      type: new DataTypes.INTEGER
    },
    ResponsiblePerson: {
      type: new DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'reports',
    timestamps: true,
    sequelize
  }
);

export default MvgReport;
