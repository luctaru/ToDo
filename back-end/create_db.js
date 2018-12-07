const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('web.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
    // create a new database table:
    db.run("CREATE TABLE fazer (name TEXT)");

    // insert data:
    db.run("INSERT INTO fazer VALUES ('Mercado')");
    db.run("INSERT INTO fazer VALUES ('Jogar')");
    db.run("INSERT INTO fazer VALUES ('Estudar')");

  

    console.log('successfully created the table in web.db');

});

db.close();