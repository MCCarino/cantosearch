const {app} = require('electron');
const Datastore = require('nedb-promises');
const dbFactory = (fileName) => Datastore.create({
  filename: `../data/${fileName}`,
  timestampData: true,
  autoload: true
});

const db = {
  wordDb: dbFactory('words.db')
};

module.exports = db;
