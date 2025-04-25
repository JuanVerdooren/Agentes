const sql = require('mssql');
require('dotenv').config();

const [serverName, instanceName] = process.env.DB_SERVER.split('\\');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: serverName,
  options: {
    instanceName: instanceName || undefined,  // solo si existe
    encrypt: false,
    trustServerCertificate: true
  },
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || undefined
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
