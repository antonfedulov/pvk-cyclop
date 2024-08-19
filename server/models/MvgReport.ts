import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class MvgReport extends Model {
  public id!: number;
  public name!: string;
  public operation_type!: string;
  public ammo_type!: string;
  public ammo_count!: number;
  public responsible_person!: string;
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
    Operation_Type: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    Ammo_Type: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    Ammo_Count: {
      type: new DataTypes.NUMBER,
      allowNull: false
    },
    Responsible_Person: {
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
