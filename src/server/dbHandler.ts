import path = require('path');
import { DBHandlerInterface } from './db';

export const REPO_PATH = path.join(__dirname, '../../');

export class DBHandler implements DBHandlerInterface {
    public db;
    constructor() {

    }
}