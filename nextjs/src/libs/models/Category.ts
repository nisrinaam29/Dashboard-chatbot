import { DataTypes, Model } from "sequelize";

import { sequelize } from "../sequelize";
import type { CategoryTypes } from "@/types/CategoryTypes";

class Category extends Model<CategoryTypes> {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
  }
)

export default Category;
