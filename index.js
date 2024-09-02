"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Replace with your MongoDB connection string
var mongoURI = 'mongodb://localhost:27017';
mongoose_1.default.connect(mongoURI, {
    dbName: 'node-typescript-app',
}).then(function () {
    console.log('database connected');
}).catch(function (error) { return console.log(error); });
app.listen(4000, function () {
    console.log("Server running on http://localhost:4000");
});
