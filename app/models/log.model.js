//initialize on object of our dbcontext
const dbContext = require("./db.js");

const Log = function(log) {

    this.id = log.id;
    this.date = log.date;
    this.exercise = log.exercise;
    this.sets = log.sets;
    this.reps = log.reps;
    this.weight = log.weight;
}

//endpoint to get logs of a certain date
Log.getLogs = (date, result) => {

    dbContext.query(`select * from Logs where Date like '${date}%'`, (err, res) => {

        //handle errors
        if (err) {

            result(null, err);
            return;
        }

        //return success
        result(null, res);
    });
};

//endpoint for log creation
Log.createLog = (log, result) => {

    //defining our query (interesting syntax near insert ... set)
    dbContext.query(`insert into Logs (Date, Exercise, Sets, Reps, Weight) values ('${log.date}', '${log.exercise}', ${log.sets}, ${log.reps}, ${log.weight})`, (err, res) => {

        //handle errors
        if (err) {

            result(null, err);
            return;
        }

        //return success
        result(null, res);
    });
};

//endpoint to update a log
Log.updateLog = (log, result) => {

    dbContext.query(`update Logs set Date = '${log.date}', Exercise = '${log.exercise}', Sets = ${log.sets}, Reps = ${log.reps}, Weight = ${log.weight} where Id = ${log.id}`, (err, res) => {

            if (err) {

                result(null, err);
                return;
            }

            //if no affected rows then id doesn't exist
            if (res.affectedRows == 0) {

                result({kind: "not_found"}, null);
                return;
            }

            //return success
            result(null, res);
    });
};

//endpoint to delete a log
Log.deleteLog = (id, result) => {

    dbContext.query(`delete from Logs where Id = ${id}`,(err, res) => {

        if (err) {

            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {

            result({kind: "not_found"}, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Log;