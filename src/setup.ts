import { config } from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';
const envPath = path.join(__dirname, `../.env.${env}`);
config({ path: envPath });
