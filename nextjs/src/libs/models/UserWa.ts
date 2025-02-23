import { DataTypes, Model } from "sequelize";

import { sequelize } from "../sequelize";
import type { UserWaTypes } from "@/types/UserTypes";

class UserWa extends Model<UserWaTypes> {}

UserWa.init(
  {
    id: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },phone_number:{
      type: DataTypes.STRING,
      allowNull:false
    },
    status:{
      type:DataTypes.STRING,
      allowNull:false
    },
    category_id:{
        type:DataTypes.STRING,
        allowNull:true
    }
  },
  {
    sequelize,
    modelName: 'UserWa',
    tableName: 'table_users',
    timestamps: false
  }
)
export default UserWa;
