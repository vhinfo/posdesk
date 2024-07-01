import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Discount extends BaseEntity {
    id: number;
    withClient: string;
    code: string;
    description: string;
    value: number;
    allProducts: number;
    accumulate: number;
    percent: number;
    quantity: number | null;
    sku: string;

    static readonly tableName: string = 'discounts';
    static readonly fields = [
        { name: 'withClient', type: 'TEXT' },
        { name: 'code', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'description', type: 'TEXT' },
        { name: 'value', type: 'REAL NOT NULL' },
        { name: 'allProducts', type: 'INTEGER' },
        { name: 'accumulate', type: 'INTEGER' },
        { name: 'percent', type: 'INTEGER' },
        { name: 'quantity', type: 'INTEGER' },
        { name: 'sku', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        with_client: string,
        code: string,
        description: string,
        value: number,
        all_products: number,
        accumulate: number,
        percent: number,
        quantity: number | null,
        sku: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Discount.tableName;
    }

}
