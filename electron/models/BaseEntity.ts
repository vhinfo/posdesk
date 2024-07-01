import sqlite3 from 'sqlite3';

export abstract class BaseEntity {
    protected db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    async save(): Promise<void> {
        console.log('Saved entity:', this);
        // Implemente aqui a lógica real de salvar no banco de dados usando 'this.db'
        // Exemplo básico de inserção
        const sql = `INSERT INTO ${this.constructor.name} (${Object.keys(this).join(', ')}) VALUES (${Object.values(this).map(value => `'${value}'`).join(', ')})`;
        await this.run(sql);
    }

    async update(): Promise<void> {
        console.log('Updated entity:', this);
        // Implemente aqui a lógica real de atualizar no banco de dados usando 'this.db'
        // Exemplo básico de atualização
        const id = this['id']; // assumindo que 'id' é o campo de identificação único
        if (!id) {
            throw new Error('Cannot update entity without id.');
        }
        const updates = Object.entries(this).filter(([key, value]) => key !== 'id').map(([key, value]) => `${key} = '${value}'`).join(', ');
        const sql = `UPDATE ${this.constructor.name} SET ${updates} WHERE id = ${id}`;
        await this.run(sql);
    }

    async delete(): Promise<void> {
        console.log('Deleted entity:', this);
        // Implemente aqui a lógica real de deletar no banco de dados usando 'this.db'
        // Exemplo básico de exclusão
        const id = this['id']; // assumindo que 'id' é o campo de identificação único
        if (!id) {
            throw new Error('Cannot delete entity without id.');
        }
        const sql = `DELETE FROM ${this.constructor.name} WHERE id = ${id}`;
        await this.run(sql);
    }

    async findById(id: number): Promise<BaseEntity | undefined> {
        const sql = `SELECT * FROM ${this.constructor.name} WHERE id = ${id}`;
        return await this.get(sql);
    }

    async findBy(filters: [string, string, string][]): Promise<BaseEntity[]> {
        let whereClause = '';
        filters.forEach((filter, index) => {
            const [column, operator, value] = filter;
            if (index > 0) {
                whereClause += ' AND ';
            }
            whereClause += `${column} ${operator} '${value}'`;
        });

        const sql = `SELECT * FROM ${this.constructor.name} WHERE ${whereClause}`;
        return await this.all(sql);
    }


    async findAll(): Promise<BaseEntity[]> {
        const sql = `SELECT * FROM ${this.constructor.name}`;
        return await this.all(sql);
    }

    async deleteById(id: number): Promise<void> {
        const sql = `DELETE FROM ${this.constructor.name} WHERE id = ${id}`;
        await this.run(sql);
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

    private get(sql: string): Promise<BaseEntity | undefined> {
        return new Promise<BaseEntity | undefined>((resolve, reject) => {
            this.db.get(sql, function (err, row:any) {
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

    private all(sql: string): Promise<BaseEntity[]> {
        return new Promise<BaseEntity[]>((resolve, reject) => {
            this.db.all(sql, function (err, rows) {
                if (err) {
                    console.error('Error fetching entities:', sql, err);
                    reject(err);
                } else {
                    const entities: BaseEntity[] = rows.map(row => new (this.constructor as any)(row));
                    resolve(entities);
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
