const DewController = require("../controllers/dew.controller");
const { authenticate } = require("../config/jwt.config")


module.exports = (app) => {
    app.get("/api/dews", DewController.findAllDews);
    app.post("/api/dews", authenticate, DewController.createNewDew);
    app.get("/api/dews/:id", DewController.findOneDew);
    app.get("/api/dewsbyuser/:username", authenticate, DewController.findAllDewsByUser);
    app.delete("/api/dews/:id", DewController.deleteOneDew);
    app.put("/api/dews/:id", DewController.updateDew);
}