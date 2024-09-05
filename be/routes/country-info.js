import express from 'express'
import { getCountryFlag, getCountryInfo, getCountryPopulation } from '../controllers/country-info.js'

const router = express.Router();

router.get('/', getCountryInfo);
router.get('/population', getCountryPopulation);
router.get('/flag', getCountryFlag);

export default router;