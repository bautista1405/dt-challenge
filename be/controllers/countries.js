import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config();

const nagerUrl = process.env.NAGER_API;

export const getCountries = async (req, res) => {
    try {
        const response = await fetch(`${nagerUrl}/AvailableCountries`);
        const countries = await response.json();
        res.status(200).json({ data: countries });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}