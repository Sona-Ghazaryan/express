import { Sequelize, DataTypes, Model } from 'sequelize'
export const sequelize = new Sequelize('postgres', 'postgres', 'postgre', {
    host: 'localhost',
    dialect: 'postgres',
})


// await users.sync({ force: true });
//  await Posts.sync({ force: true });
