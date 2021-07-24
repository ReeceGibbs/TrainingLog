module.exports = app => {

    const Logs = require("../controllers/logs.controller");

    app.get("/logs/getLogs", Logs.getLogs);

    app.post("/logs/createLog", Logs.createLog);

    app.put("/logs/updateLog", Logs.updateLog);

    app.delete("/logs/deleteLog", Logs.deleteLog);
};