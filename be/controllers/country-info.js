import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config();

const countriesNowUrl = process.env.COUNTRIES_NOW_API;
const nagerUrl = process.env.NAGER_API;

export const getCountryInfo = async (req, res) => {
    const { code } = req.query;
    try {
        const response = await fetch(`${nagerUrl}/CountryInfo/${code}`);

        const countryInfo = await response.json();
        res.status(200).json({ data: countryInfo });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getCountryPopulation = async (req, res) => {
    const { code } = req.query;
    try {
        const response = await fetch(`${countriesNowUrl}/countries/population`, {
            method: 'POST',
            body: JSON.stringify({
                country: code
            }),
            headers: {'Content-Type': 'application/json'}
        });

        const countryPopulation = await response.json();
        res.status(200).json({ data: countryPopulation });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getCountryFlag = async (req, res) => {
    const { code } = req.query;
    try {
        const response = await fetch(`${countriesNowUrl}/countries/flag/images`, {
            method: 'POST',
            body: JSON.stringify({
                iso2: code
            }),
            headers: {'Content-Type': 'application/json'}
        });

        const countryFlag = await response.json();
        res.status(200).json({ data: countryFlag });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}