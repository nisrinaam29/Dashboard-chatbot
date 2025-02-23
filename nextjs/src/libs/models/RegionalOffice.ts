import { BelongsTo, DataTypes, Model } from "sequelize";

import { sequelize } from "../sequelize";
import User from "./User";


class RegionalOffice extends Model {}

RegionalOffice.init(
  {
    id: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    ro:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize,
    modelName: 'RegionalOffice',
    tableName: 'table_regional_office',
    timestamps: false
  }
  
)

export default RegionalOffice;
