import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class PaymentMethod extends BaseEntity {
    id: number;
    description: string;
    alias: string;
    issue: boolean;
    icon: string;

    static readonly tableName: string = 'payment_methods';
    static readonly fields = [
        { name: 'description', type: 'TEXT NOT NULL' },
        { name: 'alias', type: 'TEXT NOT NULL' },
        { name: 'issue', type: 'INTEGER' },
        { name: 'icon', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database,entityData: {
        id: number,
        description: string,
        alias: string,
        issue: boolean,
        icon: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return PaymentMethod.tableName;
    }

}
