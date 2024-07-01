import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Category extends BaseEntity {
    id: number;
    name: string;

    static readonly tableName = this.name;
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' }
    ];

    constructor(db: sqlite3.Database, categoryData: {
        id: number,
        name: string
    }) {
        super(db);
        this.id = categoryData.id;
        this.name = categoryData.name;
    }
}
