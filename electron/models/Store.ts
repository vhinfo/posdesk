import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Store extends BaseEntity {
    id: number;
    name: string;
    type: string;
    abbreviation: string;
    groupId: number;
    groupName: string;

    static readonly tableName = this.name;
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'type', type: 'TEXT' },
        { name: 'abbreviation', type: 'TEXT' },
        { name: 'groupId', type: 'INTEGER' },
        { name: 'groupName', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, storeData: {
        id: number,
        name: string,
        type: string,
        abbreviation: string,
        groupId: number,
        groupName: string
    }) {
        super(db);
        this.id = storeData.id;
        this.name = storeData.name;
        this.type = storeData.type;
        this.abbreviation = storeData.abbreviation;
        this.groupId = storeData.groupId;
        this.groupName = storeData.groupName;
    }
}
