const fs = require('fs');
const path = require('path');
const db = require('./models');

// Lire les données du fichier JSON
const dataPath = path.join(__dirname, 'data.json');
const vehiclesData = JSON.parse(fs.readFileSync(dataPath, 'utf8')).vehicles;

async function insertData() {
  try {
    // Insérer les données dans la base de données
    await db.Vehicle.bulkCreate(vehiclesData);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Synchronize the database and insert data
db.sequelize.sync({ force: true }).then(() => {
  insertData().then(() => {
    db.sequelize.close();
  });
});
