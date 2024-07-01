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
        const result = await this.get(sql);
        return result !== undefined;
    }

    async update(): Promise<void> {
        const { db, ...entityData } = this;
        const columns = Object.keys(entityData).join(', ');
        const values = Object.values(entityData).map(value => {
            if (typeof value === 'string') {
                return `'${value}'`;
            } else {
                return value === null || value === undefined || value === '' ? 'NULL' : value;
            }
        }).join(', ');
        
        const sql = `UPDATE ${this.tableName} SET (${columns}) = (${values}) WHERE id = ${this['id']}`;
        console.log(sql);
        await this.run(sql);
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

    static async findById(db: sqlite3.Database, tableName: string, id: number): Promise<BaseEntity | undefined> {
        const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
        return await this.get(sql);
    }

    static async findBy(db: sqlite3.Database, tableName: string, filters: [string, string, string][]): Promise<any[]> {
        let whereClause = '';
        filters.forEach((filter, index) => {
            const [column, operator, value] = filter;
            if (index > 0) {
                whereClause += ' AND ';
            }
            whereClause += `${column} ${operator} '${value}'`;
        });

        const sql = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
        return await this.all(db, sql);
    }

    // Função estática para encontrar todos os registros em uma tabela específica
    static async findAll(db: sqlite3.Database, tableName: string): Promise<BaseEntity[]> {
        const sql = `SELECT * FROM ${tableName}`;
        return await this.all(db, sql);
    }

    // Função estática para encontrar todos os registros em uma tabela específica
    static async findFirst(db: sqlite3.Database, tableName: string): Promise<any> {
        const sql = `SELECT * FROM ${tableName} limit 1`;
        let result = await this.all(db, sql);
        return result[0];
    }


    // Função privada para executar consulta SQL e obter resultados
    private static all(db: sqlite3.Database, sql: string): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error('Error fetching entities:', sql, err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }


    private run(sql: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, function (err) {
                if (err) {
                    console.error('Error running query:', sql, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private static async executeQuery(db: sqlite3.Database, sql: string): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error('Error fetching entities:', sql, err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    private get(sql: string): Promise<BaseEntity | undefined> {
        return new Promise<BaseEntity | undefined>((resolve, reject) => {
            this.db.get(sql, function (err, row: any) {
                if (err) {
                    console.error('Error fetching entity:', sql, err);
                    reject(err);
                } else {
                    if (row) {
                        resolve(row);
                    } else {
                        resolve(undefined);
                    }
                }
            });
        });
    }

    public static createSQLCreateTable(tableName: string, fields: { name: string, type: string }[]) {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ${fields.map(field => `${field.name} ${field.type}`).join(', ')}
            )
        `;
        return createTableSQL;
    }
}
