// import fs from "fs";
// import path from "path";
// import { fileURLToPath, pathToFileURL } from "url";
// import Sequelize from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const basename = path.basename(__filename);

// const db = {};


// // Sequelize connection
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT || "mysql",
//     logging: false,
//   }
// );


// // Load models
// const files = fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.endsWith(".js") &&
//       !file.includes(".test.js")
//     );
//   });


// for (const file of files) {
//   const module = await import(
//     pathToFileURL(path.join(__dirname, file)).href
//   );

//   const model = module.default(
//     sequelize,
//     Sequelize.DataTypes
//   );

//   db[model.name] = model;
// }


// // Setup associations
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


// db.sequelize = sequelize;
// db.Sequelize = Sequelize;


// export default db;

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const basename = path.basename(__filename);


// Load models
const files = fs.readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    file.endsWith(".js")
  );


for (const file of files) {

  const module = await import(
    pathToFileURL(
      path.join(__dirname, file)
    ).href
  );


  const model = module.default;


  if (model && model.name) {
    db[model.name] = model;
  }
}


// Attach associations
Object.keys(db).forEach((modelName) => {

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

});


export default db;