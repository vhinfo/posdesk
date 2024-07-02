import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Store extends BaseEntity {
    id: number;
    name: string;
    type: string;
    abbreviation: string;
    groupId: number;
    groupName: string;

    static readonly tableName: string = 'stores';
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'type', type: 'TEXT' },
        { name: 'abbreviation', type: 'TEXT' },
        { name: 'groupId', type: 'INTEGER' },
        { name: 'groupName', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        name: string,
        type: string,
        abbreviation: string,
        groupId: number,
        groupName: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Store.tableName;
    }
}
