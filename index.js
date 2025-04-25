const express = require('express');
const app = express();
const { poolPromise } = require('./db');

app.use(express.json());

// Ruta para obtener todos los agentes
app.get('/agentes', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        a.Id AS AgenteId,
        a.Nombre AS AgenteNombre,
        r.RoleName AS Rol,
        p.Nombre AS SupervisorNombre
      FROM Agentes a
      LEFT JOIN Roles r ON a.RoleId = r.RoleId
      LEFT JOIN Agentes p ON a.ParentId = p.Id
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener los agentes:', err);
    res.status(500).send('Error interno del servidor');
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/agentes`);
});
