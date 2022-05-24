require("dotenv").config();

const server = require("./src/app.js");
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
