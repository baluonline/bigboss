import * as SQLite from "expo-sqlite";
import * as _ from "lodash";
import { Kid } from "../model/Kid"
import { KidObject } from "..//utils/objects";
import { Habit } from "model/Habit";

const database = SQLite.openDatabase("kids.db");

// Open the SQLite database
const kidsDb = SQLite.openDatabase("kids.db");

export const isTableExists = async (tableName: string) => {
  const promise = new Promise((resolve, reject) => {
    kidsDb.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name=?',
        [tableName],
        (tx, results) => {
          if (results.rows.length < 1) {
            resolve(false); // Return false if no rows found
          } else {
            // Convert result to an array of table names
            const tableNames = Array.from(results.rows).map(row => row.name);
            // Check if the target table name is in the array
            const tableExists = tableNames.includes(tableName);
            resolve(tableExists);
          }
        },
        (tx, error): boolean | any => {
          console.log("error ")
          reject(error); // Reject promise if there is an error
        }
      );
    });
  });
  return promise;
};

export const initKidsDb = () => {
  const promise = new Promise((resolve, reject) => {
    // Create a table (if kids table doesn't exist)
    isTableExists("kids").then(() => {
      kidsDb.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS kids 
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL, 
          emailAddress TEXT NOT NULL,
          age NUMBER NOT NULL,
          gender TEXT NOT NULL,
          zipcode NUMBER NOT NULL)`,
          [],
          (tx, results) => {
            console.log('kids Table created successfully');
            resolve(results);
          },
          (_, err): boolean | any => {
            // console.error('Error creating table:', err);
            reject(false);
          }
        );
      });
    }).catch(() => {
      console.log("Kids table is already created")
      return false;
    })
  })
  return promise;
}

export const addNewKid = async (kidObj: any) => {
  await kidsDb.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO kids (fullName, emailAddress, age, gender, zipcode) VALUES (?,?,?,?,?)`, [kidObj.fullName, kidObj.emailAddress, kidObj.age,
      kidObj.gender, kidObj.zipcode
    ],
      (tx, results) => {
        console.log('Data inserted successfully');
      },
      (_, err): boolean | any => {
        console.error('Error inserting dataF:', err);
      }
    );
  });
}
export const fetchKidList = async () => {
  return new Promise((resolve, reject) => {
    kidsDb.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM kids',
        [],
        (tx, results) => {
          const rows = results.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          console.log('Fetched kids:', data);
          resolve(data); // Resolve with the fetched data
        },
        (_, err): boolean | any => {
          console.error('Error fetching data:', err);
          reject(err)
        }
      );
    });
  })
}

export const fetchKidDetails = async (id: number) => {

  const promise: [] = new Promise((resolve, reject) => {
    kidsDb.transaction((tx) => {
      tx.executeSql("SELECT * FROM kids WHERE id=?", [id],
        (tx, results) => {
          const rows = results.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          console.log(`Fetched kid with id : ${id} `, data);
          resolve(data)
        },
        (_, err): boolean | any => {
          reject(err)
        }
      )
    })
  })
  return promise;
}


const db = SQLite.openDatabase("habits.db");
export const initHabitDb = () => {
  const promise = new Promise<void>((resolve, reject) => {
    // Create a table (if it doesn't exist)
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, points NUMBER )',
        [],
        (tx, results) => {
          console.log('Table created successfully');
        },
        (_, err): boolean | any => {
          console.error('Error creating table:', err);
        }
      );
    });
  })
}


export const AddHabit = async (habit: Habit) => {
  await db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO MyTable (name,points) VALUES (?,?)',
      [habit.fullName, habit.points],
      (tx, results) => {
        console.log('Data inserted successfully');
      },
      (_, err): boolean | any => {
        console.error('Error inserting dataF:', err);
      }
    );
  });
}


export const fetchHabit = async () => {
  await db.transaction((tx) => {

    tx.executeSql(
      'SELECT * FROM MyTable',
      [],
      (tx, results) => {
        const rows = results.rows;
        const data = [];
        for (let i = 0; i < rows.length; i++) {
          data.push(rows.item(i));
        }
        console.log('Fetched data:', data);
      },
      (_, err): boolean | any => {
        console.error('Error fetching data:', err);
      }
    );
  });
}

