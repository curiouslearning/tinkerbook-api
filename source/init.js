const db = require('./util/db');

const tasks = {
    db: new Promise((resolve, reject) => {
        db.get((err, connection) => {
            if(err) {
                console.error('AWS MySQL database connection failed.');

                reject(err);
            } else {
               console.log('AWS MySQL database connection successful.');

                connection.release();
                resolve();
            }
        });
    })
};

module.exports = () => {
    return tasks.db;
};
