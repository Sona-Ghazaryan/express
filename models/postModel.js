import {  DataTypes, Model } from 'sequelize'
import {sequelize} from '../sequelize/sequelize.js'
import {Users} from './userModel.js'
import { v4 as uuidv4 } from 'uuid';

 export const Posts = sequelize.define('posts', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: uuidv4(),
    },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: true },
    time: { type: 'TIMESTAMP', defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }

}, { timestamps: false }, { freezeTableName: true })

Posts.belongsTo(Users, {
    foreignKey: 'Created_by',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Users.hasMany(Posts,{
    foreignKey: 'Created_by',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
// await Users.sync({ force: true });
//  await Posts.sync({ force: true });
