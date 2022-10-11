import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../sequelize/sequelize.js'
import { v4 as uuidv4 } from 'uuid';

export class Users extends Model { }

Users.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    userName: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING(64) },
    salt: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    image:{type:DataTypes.STRING},
    activationLink: DataTypes.STRING,
    isActivated:{type:DataTypes.BOOLEAN,default:false}

}, { sequelize, modelName: 'users', timestamps: false })


 //await Users.sync({ alter: true });
//  await Posts.sync({ force: true });
