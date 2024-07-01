import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Cashier extends BaseEntity {
    name: string;
    storeId: string;
    systemUser: { userId: number, userName: string };

    static readonly tableName = this.name;
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'storeId', type: 'TEXT' },
        { name: 'systemUser', type: 'JSON' }
    ];

    constructor(db: sqlite3.Database, cashierData: {
        id: number,
        name: string,
        storeId: string,
        systemUser: { userId: number, userName: string }
    }) {
        super(db);
        this.name = cashierData.name;
        this.storeId = cashierData.storeId;
        this.systemUser = cashierData.systemUser;
    }
}
