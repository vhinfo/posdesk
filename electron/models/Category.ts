import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Category extends BaseEntity {
    id: number;
    name: string;

    static readonly tableName: string = 'categorys';
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        name: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Category.tableName;
    }

}
