import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import countriesRoutes from './routes/countries.js'
import countryInfoRoutes from './routes/country-info.js'

const app = express();
dotenv.config();

app.use((express.json({ limit: "30mb", extended: true })));
app.use((express.urlencoded({ limit: "30mb", extended: true })));
app.use((cors()));

app.use('/countries', countriesRoutes);
app.use('/country-info', countryInfoRoutes);

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
})

app.listen(5000, () => console.log(`Server running on port: 5000`))
