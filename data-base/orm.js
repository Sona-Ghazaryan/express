
import { pool } from '../data-base/db.js'

class DatabaseORM {

    async findOne(table, id) {
        const result = await pool.query(`SELECT * FROM ${table} WHERE id = '${id}'`)
       
        return result.rows

    }
    async findByEmail(table, email) {
        const result = await pool.query(`SELECT * FROM ${table} WHERE email = '${email}'`)
      
        return result.rows

    }
    async createNewUser(table,name,email,age,username,profession){
       const result = await pool.query(`Insert into ${table}(name,email,age,username,profession)` +
               ` values ('${name}','${email}',${age},'${username}','${profession}')`)
    
       return result.rows
    }
    async updateUserInfo(table,name,age,username,profession,id){
        const result= await pool.query(`UPDATE ${table} SET name = '${name}',age=${age},
        username='${username}',profession='${profession}' WHERE id = '${id}'`)

        return result.rows
    }
    
   async deleteUserById(table,id){
    const result= await pool.query(`DELETE FROM ${table} WHERE id ='${id}'`)
    return result.rows
   }

}


export const dataBaseORM = new DatabaseORM()









