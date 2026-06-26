import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class MvgReport extends Model {
  public id!: number;
  public name!: string;
  public tgrName!: string;
  public unitCode!: string;
  public weaponType!: string;
  public targetNumber!: string;
  public targetDestroyed!: boolean;
  public engagementAt!: Date;
  public operationType!: string;
  public mvgMovement!: string;
  public mvgLeader!: string;
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
    TgrName: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    UnitCode: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    WeaponType: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    TargetNumber: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    TargetDestroyed: {
      type: new DataTypes.BOOLEAN,
      defaultValue: false
    },
    EngagementAt: {
      type: new DataTypes.DATE,
      allowNull: false
    },
    OperationType: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    MvgMovement: {
      type: new DataTypes.TEXT,
      allowNull: true
    },
    MvgLeader: {
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
