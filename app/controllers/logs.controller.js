const Log = require("../models/log.model.js");

exports.getLogs = (req, res) => {

    if (!req.body) {

        res.status(400).send({

           message: "Request body cannot be empty." 
        });
    }

    Log.getLogs(req.body.date, (err, data) => {

        if (err) {

            res.status(500).send({

                message: "Error finding logs for your specified date."
            });
        }
        else {

            res.send(data);
        }
    });
};

exports.createLog = (req, res) => {

    if (!req.body) {

        res.status(400).send({

           message: "Request body cannot be empty." 
        });
    }

    //get date and time in mysql format
    const dateAndTime = new Date().toLocaleString().replace(/\//g, "-").replace(/,/g, "");

    const log = new Log({

        date: dateAndTime,
        exercise: req.body.exercise,
        sets: req.body.sets,
        reps: req.body.reps,
        weight: req.body.weight
    });

    Log.createLog(log, (err, data) => {

        if (err) {

            res.status(500).send({

                message: "Error creating log."
            });
        }
        else {

            res.send(data);
        }
    });
};

exports.updateLog = (req, res) => {

    if (!req.body) {

        res.status(400).send({

           message: "Request body cannot be empty." 
        });
    }

    const log = new Log({

        id: req.body.id,
        date: req.body.date,
        exercise: req.body.exercise,
        sets: req.body.sets,
        reps: req.body.reps,
        weight: req.body.weight
    });

    Log.updateLog(log, (err, data) => {

        if (err) {

            if (err.kind == "not_found") {
                
                res.status(404).send({

                    message: "Invalid log id."
                });
            }
            else {
                
                res.status(500).send({

                    message: "Error updating log."
                });
            }
        }
        else {

            res.send(data);
        }
    });
};

exports.deleteLog = (req, res) => {

    if (!req.body) {

        res.status(400).send({

           message: "Request body cannot be empty." 
        });
    }

    Log.deleteLog(req.body.id, (err, data) => {

        if (err) {

            res.status(500).send({

                message: "Error deleting log."
            });
        }
        else {

            res.send(data);
        }
    });
};