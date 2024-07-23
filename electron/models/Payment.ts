import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Payment extends BaseEntity {
    description: string;
    alias: string;
    issue: number;
    value: number;
    date: Date;

    static readonly tableName: string = 'payments';
    static readonly fields = [
        { name: 'description', type: 'TEXT NOT NULL' },
        { name: 'alias', type: 'TEXT NOT NULL' },
        { name: 'issue', type: 'INTEGER' },
        { name: 'value', type: 'REAL NOT NULL' },
        { name: 'data', type: 'TEXT NOT NULL' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number;
        description: string;
        alias: string;
        issue: number;
        value: number;
        date: Date;
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Payment.tableName;
    }

}
