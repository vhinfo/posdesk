import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class User extends BaseEntity {
    id: number;
    name: string;
    accessToken: string;
    profession: string;
    isManager: boolean;
    image: string;
    cashierId: number;
    cashierName: string;
    storeName: string;
    productUpdatedAt: Date|null|string;

    public static readonly tableName: string = 'users';
    static readonly fields = [
        { name: 'name', type: 'TEXT' },
        { name: 'accessToken', type: 'TEXT NOT NULL' },
        { name: 'profession', type: 'TEXT' },
        { name: 'isManager', type: 'INTEGER' },
        { name: 'image', type: 'TEXT' },
        { name: 'cashierId', type: 'INTEGER' },
        { name: 'cashierName', type: 'TEXT' },
        { name: 'storeName', type: 'TEXT' },
        { name: 'productUpdatedAt', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        name: string,
        accessToken: string,
        profession: string,
        isManager: boolean,
        image: string,
        cashierId: number,
        cashierName: string,
        storeName: string,
        productUpdatedAt: Date|null|string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return User.tableName;
    }
}
