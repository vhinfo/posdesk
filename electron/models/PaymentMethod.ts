import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class PaymentMethod extends BaseEntity {
    id: number;
    description: string;
    alias: string;
    issue: boolean;
    icon: string;

    static readonly tableName = this.name;
    static readonly fields = [
        { name: 'description', type: 'TEXT NOT NULL' },
        { name: 'alias', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'issue', type: 'INTEGER' },
        { name: 'icon', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database,paymentData: {
        id: number,
        description: string,
        alias: string,
        issue: boolean,
        icon: string
    }) {
        super(db);
        this.id = paymentData.id;
        this.description = paymentData.description;
        this.alias = paymentData.alias;
        this.issue = paymentData.issue;
        this.icon = paymentData.icon;
    }
}
