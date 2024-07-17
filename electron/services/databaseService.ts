import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

import { User } from '../models/User';
import { Store } from '../models/Store';
import { Cashier } from '../models/Cashier';
import { Payment } from '../models/Payment';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Cupom } from '../models/Cupom';
import { Discount } from '../models/Discount';
import { PaymentMethod } from '../models/PaymentMethod';
import { Sale } from '../models/Sale';
import { Person } from '../models/Person';

const dbFilePath = path.join(process.cwd(), 'db.sqlite');
const sqlite = sqlite3.verbose();
let db: sqlite3.Database;

export class DatabaseService {
    static initialize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!fs.existsSync(dbFilePath)) {
                fs.writeFileSync(dbFilePath, '');
            }

            db = new sqlite.Database(dbFilePath);

            db.serialize(() => {
                db.run(User.createSQLCreateTable(User.tableName, User.fields));
                db.run(Store.createSQLCreateTable(Store.tableName, Store.fields));
                db.run(Cashier.createSQLCreateTable(Cashier.tableName, Cashier.fields));
                db.run(Payment.createSQLCreateTable(Payment.tableName, Payment.fields));
                db.run(Product.createSQLCreateTable(Product.tableName, Product.fields));
                db.run(Category.createSQLCreateTable(Category.tableName, Category.fields));
                db.run(Cupom.createSQLCreateTable(Cupom.tableName, Cupom.fields));
                db.run(Discount.createSQLCreateTable(Discount.tableName, Discount.fields));
                db.run(PaymentMethod.createSQLCreateTable(PaymentMethod.tableName, PaymentMethod.fields));
                db.run(Sale.createSQLCreateTable(Sale.tableName, Sale.fields));
                db.run(Person.createSQLCreateTable(Person.tableName, Person.fields), () => {
                    console.log('SQLite database initialized.');
                    resolve(); 
                });
            });
        });
    }

    static getDBInstance(): sqlite3.Database {
        return db;
    }

    static closeDB(): void {
        if (db) {
            db.close(err => {
                if (err) {
                    console.error('Error closing database', err);
                } else {
                    console.log('Closed the SQLite database connection');
                }
            });
        }
    }
}

// Inicializa o serviço de banco de dados ao carregar este módulo
DatabaseService.initialize();

export default DatabaseService;
