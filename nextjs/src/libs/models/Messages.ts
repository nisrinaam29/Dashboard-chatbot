import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { MessageTypes } from "@/types/TicketTypes";
import Ticket from "./Ticket";
class Messages extends Model<MessageTypes> { }

Messages.init(
    {
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }, 
        ticket_id:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        updated_at:{
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Messages',
        tableName: 'messages',
        timestamps: false
    }
)

Messages.belongsTo(Ticket, {
    foreignKey: 'ticket_id',
    targetKey: 'id',
    as: 'ticket'
})

export default Messages;
