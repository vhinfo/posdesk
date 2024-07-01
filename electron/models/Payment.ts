import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Payment extends BaseEntity {
    methodId: number;
    methodDescription: string;
    methodAlias: string;
    methodIssue: number;
    methodValue: number;
    methodDate: Date;

    static readonly tableName: string = 'payments';
    static readonly fields = [
        { name: 'methodId', type: 'INTEGER' },
        { name: 'methodDescription', type: 'TEXT NOT NULL' },
        { name: 'methodAlias', type: 'TEXT NOT NULL' },
        { name: 'methodIssue', type: 'INTEGER' },
        { name: 'methodValue', type: 'REAL NOT NULL' },
        { name: 'methodDate', type: 'TEXT NOT NULL' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        method_id: number;
        method_description: string;
        method_alias: string;
        method_issue: number;
        method_value: number;
        method_date: Date;
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Payment.tableName;
    }

}
