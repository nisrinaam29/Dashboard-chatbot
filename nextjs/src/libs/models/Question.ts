import { DataTypes, Model } from "sequelize";

import { sequelize } from "../sequelize";
import type { QuestionTypes } from "@/types/QuestionTypes";
import Category from "./Category";


class Questions extends Model<QuestionTypes> {}

Questions.init(
  {
    category_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    number: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'Questions',
    tableName: 'table_questions',
    timestamps: false
  }
)

Questions.belongsTo(Category, {
  foreignKey: 'category_id',
  targetKey: 'id',
  as: 'category'
});

export default Questions;
