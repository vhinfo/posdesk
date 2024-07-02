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

    public static readonly tableName: string = 'users';
    static readonly fields = [
        { name: 'name', type: 'TEXT' },
        { name: 'accessToken', type: 'TEXT NOT NULL' },
        { name: 'profession', type: 'TEXT' },
        { name: 'isManager', type: 'INTEGER' },
        { name: 'image', type: 'TEXT' },
        { name: 'cashierId', type: 'INTEGER' },
        { name: 'cashierName', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number,
        name: string,
        accessToken: string,
        profession: string,
        isManager: boolean,
        image: string,
        cashierId: number,
        cashierName: string
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return User.tableName;
    }


    public static async getFirstUser(db: sqlite3.Database): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${User.tableName} LIMIT 1`;
            db.get(query, (err, row:any) => {
                if (err) {
                    console.error(`Error fetching first ${User.tableName}:`, err);
                    reject(err);
                } else {
                    if (row) {
                        const user = new User(db, {
                            id: row.id,
                            name: row.name,
                            accessToken: row.accessToken,
                            profession: row.profession,
                            isManager: row.isManager === 1,
                            image: row.image,
                            cashierId: row.cashierId,
                            cashierName: row.cashierName
                        });
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }    
}
