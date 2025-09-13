import { Sequelize, Model } from "sequelize";
import bcrypt from 'bcrypt'

/**O modelo User:
Representa a tabela de usuários.
Armazena senha de forma segura usando hash (bcrypt).
Permite verificar a senha fornecida com CheckPassword.
Suporta identificar administradores (admin: true/false).
Usa campos virtuais (password) para segurança, sem armazenar a senha em texto puro. */

class User extends Model{
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user)=>{
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });
    return this;
  } 
  
  async CheckPassword(password){
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;