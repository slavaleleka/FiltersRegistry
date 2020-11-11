/* globals require, __dirname, process */

let args = process.argv.slice(2);

let platforms = args[0];
if (!platforms) {
    platforms = './platforms';
}

const LOCALES_DIR_PATH = './locales';

const FILTERS_REQUIRED_AMOUNT = 80;

const path = require('path');
const compiler = require("adguard-filters-compiler");

const platformsPath = path.join(__dirname, platforms);
const validationResult = compiler.validateJSONSchema(platformsPath, FILTERS_REQUIRED_AMOUNT);
if (!validationResult) {
    throw new Error('Invalid filters json');
}

const localesDirPath = path.join(__dirname, LOCALES_DIR_PATH);
const localesValidationResult = compiler.validateLocales(localesDirPath);
if (localesValidationResult.length !== 0) {
    throw new Error('Invalid locales messages');
}
