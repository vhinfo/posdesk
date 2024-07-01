import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Salesman extends BaseEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;

    static readonly tableName: string = 'salesmans';
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'email', type: 'TEXT' },
        { name: 'phone', type: 'TEXT' },
        { name: 'type', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        name: string,
        email: string,
        phone: string,
        type: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Salesman.tableName;
    }

}
