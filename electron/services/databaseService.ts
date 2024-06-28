import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { User } from '../models/User';
import { Store } from '../models/Store';
import { Cashier } from '../models/Cashier';
import { Payment } from '../models/Payment';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Cupom } from '../models/Cupom';
import { Customer } from '../models/Customer';
import { Discount } from '../models/Discount';
import { PaymentMethod } from '../models/PaymentMethod';
import { Sale } from '../models/Sale';
import { Salesman } from '../models/Salesman';

const dbFilePath = path.join(process.cwd(), 'db.sqlite');
const sqlite = sqlite3.verbose();
let db: sqlite3.Database;

export class DatabaseService {
    static initialize() {
        // Verifica se o arquivo db.sqlite existe
        if (!fs.existsSync(dbFilePath)) {
            // Se não existir, cria o arquivo
            fs.writeFileSync(dbFilePath, '');
        }

        db = new sqlite.Database(dbFilePath);

        db.serialize(() => {
            // Criação das tabelas
            db.run(User.createSQLCreateTable(User.tableName, User.fields));
            db.run(Store.createSQLCreateTable(Store.tableName, Store.fields));
            db.run(Cashier.createSQLCreateTable(Cashier.tableName, Cashier.fields));
            db.run(Payment.createSQLCreateTable(Payment.tableName, Payment.fields));
            db.run(Product.createSQLCreateTable(Product.tableName, Product.fields));
            db.run(Category.createSQLCreateTable(Category.tableName, Category.fields));
            db.run(Cupom.createSQLCreateTable(Cupom.tableName, Cupom.fields));
            db.run(Customer.createSQLCreateTable(Customer.tableName, Customer.fields));
            db.run(Discount.createSQLCreateTable(Discount.tableName, Discount.fields));
            db.run(PaymentMethod.createSQLCreateTable(PaymentMethod.tableName, PaymentMethod.fields));
            db.run(Sale.createSQLCreateTable(Sale.tableName, Sale.fields));
            db.run(Salesman.createSQLCreateTable(Salesman.tableName, Salesman.fields));
        });

        console.log('SQLite database initialized.');
    }
}

// Inicialize o banco de dados ao importar o módulo
DatabaseService.initialize();

export default DatabaseService;
