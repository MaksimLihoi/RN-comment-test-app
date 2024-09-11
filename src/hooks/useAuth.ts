import {useState} from 'react';
import db from '../database/database.js';

interface AuthHook {
  register: (email: string, username: string) => Promise<number>;
  login: (email: string) => Promise<number | null>;
  userId: number | null;
}

const useAuth = (): AuthHook => {
  const [userId, setUserId] = useState<number | null>(null);

  const register = (email: string, username: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users (email, username) VALUES (?, ?)',
          [email, username],
          (_, result) => {
            if (result.rowsAffected > 0) {
              const insertedId: number = result.insertId;
              setUserId(insertedId);
              resolve(insertedId);
            } else {
              reject('Регистрация не удалась');
            }
          },
          error => reject(error.message),
        );
      });
    });
  };

  const login = (email: string): Promise<number | null> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id FROM Users WHERE email = ?',
          [email],
          (_, result) => {
            if (result.rows.length > 0) {
              const foundUserId = result.rows.item(0).id;
              setUserId(foundUserId);
              resolve(foundUserId);
            } else {
              resolve(null);
            }
          },
          error => reject(error.message),
        );
      });
    });
  };

  return {register, login, userId};
};

export default useAuth;
