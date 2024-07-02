import sqlite3 from 'sqlite3';

export abstract class BaseEntity {
    protected db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    abstract get tableName(): string;

    async save(): Promise<void> {
        const { db, ...entityData } = this;
        const columns = Object.keys(entityData).join(', ');
        const values = Object.values(entityData).map(value => {
            if (typeof value === 'string') {
                return `'${value}'`;
            } else {
                return value === null || value === undefined || value === '' ? 'NULL' : value;
            }
        }).join(', ');

        if (await this.exists(this['id'])) {
            await this.update();
        } else {
            const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`;
            await this.run(sql);
        }
    }

    private async exists(id: number | undefined): Promise<boolean> {
        if (!id) return false;
        const sql = `SELECT 1 FROM ${this.tableName} WHERE id = ${id} LIMIT 1`;
        const result = await BaseEntity.get(this.db, sql);
        return result !== undefined;
    }

    async update(): Promise<void> {
        const { db, ...entityData } = this;
        const columns = Object.keys(entityData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(entityData).map(value => {
            if (typeof value === 'string') {
                return `${value}`;
            } else {
                return value === null || value === undefined || value === '' ? 'NULL' : value;
            }
        });

        const sql = `UPDATE ${this.tableName} SET ${columns} WHERE id = ?`;
        values.push(this['id']);
        await this.run(sql, values);
    }

    async delete(): Promise<void> {
        console.log('Deleted entity:', this);
        const id = this['id'];
        if (!id) {
            throw new Error('Cannot delete entity without id.');
        }
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        await this.run(sql);
    }

    async deleteById(id: number): Promise<void> {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        await this.run(sql);
    }

    static async findById<T extends BaseEntity>(this: new (db: sqlite3.Database, entityData: any) => T, db: sqlite3.Database, id: number): Promise<T | undefined> {
        const tableName = (this as any).tableName;
        const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
        const row = await BaseEntity.get(db, sql);
        if (row) {
            return new this(db, row);
        }
        return undefined;
    }

    static async findBy<T extends BaseEntity>(this: new (db: sqlite3.Database, entityData: any) => T, db: sqlite3.Database, filters: [string, string, any][]): Promise<T[]> {
        const tableName = (this as any).tableName;
        let whereClause = '';
        filters.forEach((filter, index) => {
            const [column, operator, value] = filter;
            if (index > 0) {
                whereClause += ' AND ';
            }
            whereClause += `${column} ${operator} '${value}'`;
        });

        const sql = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
        const rows = await BaseEntity.all(db, sql);
        return rows.map(row => new this(db, row));
    }

    static async findAll<T extends BaseEntity>(this: new (db: sqlite3.Database, entityData: any) => T, db: sqlite3.Database): Promise<T[]> {
        const tableName = (this as any).tableName;
        const sql = `SELECT * FROM ${tableName}`;
        const rows = await BaseEntity.all(db, sql);
        return rows.map(row => new this(db, row));
    }

    static async findFirst<T extends BaseEntity>(this: new (db: sqlite3.Database, entityData: any) => T, db: sqlite3.Database): Promise<T | undefined> {
        const tableName = (this as any).tableName;
        const sql = `SELECT * FROM ${tableName} LIMIT 1`;
        const rows = await BaseEntity.all(db, sql);
        if (rows.length > 0) {
            return new this(db, rows[0]);
        }
        return undefined;
    }

    public static async clear<T extends BaseEntity>(this: new (db: sqlite3.Database, entityData: any) => T, db: sqlite3.Database): Promise<void> {
        const tableName = (this as any).tableName;
        const sql = `DELETE FROM ${tableName}`;
        await new Promise<void>((resolve, reject) => {
            db.run(sql, function (err) {
                if (err) {
                    console.error('Error clearing table:', sql, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private static async get(db: sqlite3.Database, sql: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            db.get(sql, (err, row) => {
                if (err) {
                    console.error('Error fetching entity:', sql, err);
                    reject(err);
                } else {
                    resolve(BaseEntity.removeQuotes(row));
                }
            });
        });
    }

    private async run(sql: string, params: any[] = []): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.error('Error running query:', sql, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private static async all(db: sqlite3.Database, sql: string): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error('Error fetching entities:', sql, err);
                    reject(err);
                } else {
                    resolve(rows.map(row => BaseEntity.removeQuotes(row)));
                }
            });
        });
    }
    
    private static removeQuotes(row: any): any {
        if (!row) {
            return row;
        }
    
        const result: any = {};
        for (const key in row) {
            if (typeof row[key] === 'string' && row[key].startsWith("'") && row[key].endsWith("'")) {
                result[key] = row[key].slice(1, -1);
            } else {
                result[key] = row[key];
            }
        }
        return result;
    }
    

    public static createSQLCreateTable(tableName: string, fields: { name: string, type: string }[]): string {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ${fields.map(field => `${field.name} ${field.type}`).join(', ')}
            )
        `;
        return createTableSQL;
    }
}
