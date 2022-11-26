import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const SESSION_ID_SECRET = process.env.SESSION_ID_SECRET;

import yargs from 'yargs';

const args = yargs(process.argv.slice(2))
    .default('PORT', 8080)
    .alias('PORT', 'p')
    .argv;

export const PORT = args.PORT;