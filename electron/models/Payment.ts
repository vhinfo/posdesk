import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Payment extends BaseEntity {
    methodId: number;
    methodDescription: string;
    methodAlias: string;
    methodIssue: number;
    methodValue: number;
    methodDate: Date;

    static readonly tableName = this.name;
    static readonly fields = [
        { name: 'methodId', type: 'INTEGER' },
        { name: 'methodDescription', type: 'TEXT NOT NULL' },
        { name: 'methodAlias', type: 'TEXT NOT NULL' },
        { name: 'methodIssue', type: 'INTEGER' },
        { name: 'methodValue', type: 'REAL NOT NULL' },
        { name: 'methodDate', type: 'TEXT NOT NULL' }
    ];

    constructor(db: sqlite3.Database, paymentData: {
        method_id: number;
        method_description: string;
        method_alias: string;
        method_issue: number;
        method_value: number;
        method_date: Date;
    }) {
        super(db);
        this.methodId = paymentData.method_id;
        this.methodDescription = paymentData.method_description;
        this.methodAlias = paymentData.method_alias;
        this.methodIssue = paymentData.method_issue;
        this.methodValue = paymentData.method_value;
        this.methodDate = paymentData.method_date;
    }
}
