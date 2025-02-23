import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../sequelize'
import type { UserTypes } from '@/types/UserTypes'
import Category from './Category'

class User extends Model<UserTypes> {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'admin',
    tableName: 'admin',
    timestamps: false
  }
)
User.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id', as: 'userCategory' })

export default User
