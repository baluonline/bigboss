import * as SQLite from "expo-sqlite";
import * as _ from "lodash";
import { Kid } from "../model/Kid"
import { KidObject } from "..//utils/objects";
import { Habit } from "model/Habit";

// Open the SQLite database
const kidsDb = SQLite.openDatabase("kids.db");
const db = SQLite.openDatabase("habits.db");

export const isTableExists = async (tableName: string) => {
  console.log("isTable exists")
  return new Promise((resolve, reject) => {
    kidsDb.transaction(tx => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name=?',
        [tableName],
        (_, { rows }) => {

          const tableNames = rows._array.map(row => row.name);
          console.log("tableNames" + rows + "- " + (tableNames.length < 1))
          if (tableNames.length < 1) {
            resolve(false);
          } else {
            const tableExists = tableNames.includes(tableName);
            resolve(tableExists + "--" + tableNames);
          }
        },
        (tx, error): boolean | any => {
          reject("error table" + error); // Reject with error if there's an SQL error
        }
      );
    });
  });
  /*  console.log('table exists ' + JSON.stringify(promise))
   return promise; */
};

export const initKidsDb = () => {
  const promise = new Promise((resolve, reject) => {
    let kidsTableIsExisted = false
    isTableExists("kids").then((results) => {
      const val: boolean = results ? true : false;
      console.log('isTableexists return ' + val)
      kidsTableIsExisted = val
      console.log('kids table ' + kidsTableIsExisted)
    })

    if (!kidsTableIsExisted) {
      console.log("db creating")
      kidsDb.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS kids 
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL, 
          emailAddress TEXT NOT NULL,
          age NUMBER NOT NULL,
          gender TEXT NOT NULL,
          zipcode NUMBER NOT NULL,
          favoriteFood TEXT NOT NULL
        )`,
          [],
          (tx, results) => {
            console.log('kids Table created successfully');
            resolve(true);
          },
          (_, err): boolean | any => {
            console.error('Error creating table:', err);
            reject(false);
          }
        );
      });
    }
  })

  // })
  return promise;
}


export const addNewKid = async (kid: Kid): Promise<void> => {

  return new Promise<void>((resolve, reject) => {
    kidsDb.transaction((tx) => {
      console.log('kid object ' + JSON.stringify(kid))
      tx.executeSql(
        `INSERT INTO kids (fullName,emailAddress,age,zipcode,gender,favoriteFood) VALUES (?,?,?,?,?,?)`,
        [kid.fullName, kid.emailAddress, kid.age, kid.zipcode, kid.gender, kid.favoriteFood],
        (_, results) => {
          console.log('Data inserted successfully');
          resolve();
        },
        (_, err): boolean | any => {
          console.error('Error inserting data:', err);
          reject(err);
        }
      );
    });
  });
};

export const fetchKidList = async (): Promise<Kid[]> => {

  return new Promise<Kid[]>((resolve, reject) => {
    console.log('fetching kids list')
    kidsDb.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM kids',
        [],
        (tx, results) => {
          console.log("List 2", JSON.stringify(results))
          const rows = results.rows;
          const kids: Kid[] = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const kid: Kid = {
              id: row.id,
              fullName: row.fullName,
              emailAddress: row.emailAddress,
              age: row.age,
              gender: row.gender,
              zipcode: row.zipcode,
              favoriteFood: row.favoriteFood
            };
            kids.push(kid);
          }
          resolve(kids); // Resolve with the fetched kids
        },
        (_, err): boolean | any => {
          console.error('Error fetching data :', err);
          reject(err);
        }
      );
    });
  });
};

export const fetchKidDetails = async (id: number) => {

  const promise = new Promise((resolve, reject) => {
    kidsDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM kids WHERE id=?",
        [id],
        (tx, results) => {
          const rows = results.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (_, err): boolean | any => {
          reject(err);
        }
      );
    });
  });
  return promise;
}



export const initHabitDb = () => {
  return new Promise((resolve, reject) => {
    // Create a table (if it doesn't exist)
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Habit (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, points NUMBER )',
        [],
        (tx, results) => {
          console.log('Habit table created successfully');
          resolve(true)
        },
        (_, err): boolean | any => {
          console.error('Habit table Error creating table:', err);
          reject(err)
        }
      );
    });
  })
}


export const addHabit = async (habit: Habit) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Habit (name,points) VALUES (?,?)',
        [habit.name, habit.points],
        (tx, results) => {
          console.log('Data inserted successfully');
          resolve(true)
        },
        (_, err): boolean | any => {
          console.error('Error inserting dataF:', err);
          reject(err)
        }
      );
    });
  });
}


export const fetchHabit = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Habit',
        [],
        (tx, results) => {
          const data = [];
          const rows = results.rows;
          const habits: Habit[] = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const Habit: Habit = {
              id: row.id,
              name: row.points,
              points: row.points
            };
            habits.push(Habit);
          }
          resolve(habits); // Resolve with the fetched kids
        }
        , (_, err): boolean | any => {
          console.error('Error fetching habits:', err);
          reject(err)
        }
      );
    });
  });
}

