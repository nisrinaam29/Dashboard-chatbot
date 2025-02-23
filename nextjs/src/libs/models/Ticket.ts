import { DataTypes, Model } from "sequelize";


import { sequelize } from "../sequelize";

// import type { CategoryTypes } from "@/types/CategoryTypes";
import type { TicketTypes } from '@/types/TicketTypes'
import Category from "./Category";

class Ticket extends Model<TicketTypes>{}

  
Ticket.init(
    {
        id: {
            type:DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        request_submitted:{
            type: DataTypes.DATE,
            allowNull:false
        },
        status:{
            type: DataTypes.STRING,
            allowNull:false
        }, 
        ticket_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING,
            allowNull:false
        },
        ro :{
            type:DataTypes.STRING,
            allowNull:false
        }

    },
    {
        sequelize,
        modelName: 'Tickets',
        tableName: 'tickets',
        timestamps: false
    }
)
Ticket.belongsTo(Category, { foreignKey: 'category', targetKey: 'id', as: 'categoryDetails' });

export default Ticket
