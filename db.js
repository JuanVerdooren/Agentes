const sql = require('mssql');
require('dotenv').config();

const [serverName, instanceName] = process.env.DB_SERVER.split('\\');

const config = {
  user: 'admin2',
  password: 'Juanbarra1',
  server: '192.168.1.68', 
  database: 'Agentes',
  options: {
    instanceName: 'SQLEXPRESS', 
    encrypt: false,
    trustServerCertificate: true
  },
  port: 1433
};


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('🟢 Conectado a SQL Server');
    return pool;
  })
  .catch(err => console.error('❌ Error al conectar a la base de datos:', err));

module.exports = {
  sql, poolPromise
};
