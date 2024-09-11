import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'commentsApp.db', location: 'default'},
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error: ' + error);
  },
);
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL
      );
    `);
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        comment TEXT NOT NULL,
        parent_id INTEGER DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (parent_id) REFERENCES Comments(id)
      );
    `);
  });
};

export default db;
