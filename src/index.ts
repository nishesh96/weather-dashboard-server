import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.use(cors());

app.get("/weather", async (req: Request, res: Response) => {
  const zipCode = req.query.zip;
  if (!zipCode) {
    return res
      .status(400)
      .send({ error: "Please provide a city zip code as a query parameter." });
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},IN&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error fetching weather data." });
  }
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
