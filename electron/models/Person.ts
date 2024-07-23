import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Person extends BaseEntity {
    id: number;
    document: number|string;
    name: string;
    email: string;
    phone: string;
    type: string;
    store_partiner_id: string;
    store_partiner_name: string;

    static readonly tableName: string = 'persons';
    static readonly fields = [
        { name: 'id', type: 'INTEGER PRIMARY KEY' },
        { name: 'document', type: 'INTEGER' },
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'email', type: 'TEXT' },
        { name: 'phone', type: 'TEXT' },
        { name: 'type', type: 'TEXT' },
        { name: 'store_partiner_id', type: 'TEXT' },
        { name: 'store_partiner_name', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        document: number,
        name: string,
        email: string,
        phone: string,
        type: string,
        store_partiner_id: string,
        store_partiner_name: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Person.tableName;
    }
}
