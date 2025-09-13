/**exportando modulo para conexão com banco de dados/porta */

module.exports = {
    username:'postgres',
    password: 'postgres',
    database:'devburger',
    host:'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
  };

  
