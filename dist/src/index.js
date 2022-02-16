"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRatio = void 0;
const fs_1 = require("fs");
const App_1 = require("./App");
if (require.main === module) {
    const file = (0, fs_1.readFileSync)('./config.json', 'utf-8');
    const options = JSON.parse(file);
    const app = new App_1.App(options);
    app.calculate().then((output) => {
        console.log(app.stringify(output, false));
    });
}
const calculateRatio = async (options) => {
    const app = new App_1.App(options);
    return await app.calculate();
};
exports.calculateRatio = calculateRatio;
