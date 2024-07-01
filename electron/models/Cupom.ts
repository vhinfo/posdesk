import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Cupom extends BaseEntity {
    id: number;
    label: string;
    code: string;
    value: number;
    active: boolean;
    defaultCupom: boolean; 
    description: string;
    allProducts: boolean;
    percent: boolean;
    accumulate: boolean; 
    quantity: number | null;
    withValidate: boolean;
    startDate: Date;
    endDate: Date;
    customerId: number;

    static readonly tableName: string = 'cupons';
    static readonly fields = [
        { name: 'label', type: 'TEXT NOT NULL' },
        { name: 'code', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'value', type: 'REAL NOT NULL' },
        { name: 'active', type: 'INTEGER' },
        { name: 'defaultCupom', type: 'INTEGER' },
        { name: 'description', type: 'TEXT' },
        { name: 'allProducts', type: 'INTEGER' },
        { name: 'percent', type: 'INTEGER' },
        { name: 'accumulate', type: 'INTEGER' },
        { name: 'quantity', type: 'INTEGER' },
        { name: 'withValidate', type: 'INTEGER' },
        { name: 'startDate', type: 'TEXT' },
        { name: 'endDate', type: 'TEXT' },
        { name: 'customerId', type: 'INTEGER' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        label: string,
        code: string,
        value: number,
        active: boolean,
        defaultCupom: boolean,
        description: string,
        allProducts: boolean,
        percent: boolean,
        accumulate: boolean,
        quantity: number | null,
        withValidate: boolean,
        startDate: Date,
        endDate: Date,
        customerId: number
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Cupom.tableName;
    }

}
