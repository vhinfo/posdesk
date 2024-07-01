import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Cashier extends BaseEntity {
    id: number
    name: string;
    storeId: string;
    userId: number; 
    userName: string;

    static readonly tableName: string = 'cashiers';
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'storeId', type: 'TEXT' },
        { name: 'userId', type: 'INTEGER' },
        { name: 'userName', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        name: string,
        storeId: string,
        userId: number, 
        userName: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Cashier.tableName
    }

}
