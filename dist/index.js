"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;
app.use((0, cors_1.default)());
app.get("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zipCode = req.query.zip;
    if (!zipCode) {
        return res
            .status(400)
            .send({ error: "Please provide a city zip code as a query parameter." });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},IN&units=metric&appid=${API_KEY}`;
    try {
        const response = yield axios_1.default.get(url);
        res.send(response.data);
    }
    catch (error) {
        res.status(500).send({ error: "Error fetching weather data." });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
