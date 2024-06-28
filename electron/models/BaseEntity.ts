import sqlite3 from 'sqlite3';

export abstract class BaseEntity {
    protected db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    async save(): Promise<void> {
        console.log('Saved entity:', this);
        // Implemente aqui a lógica real de salvar no banco de dados usando 'this.db'
    }

    async update(): Promise<void> {
        console.log('Updated entity:', this);
        // Implemente aqui a lógica real de atualizar no banco de dados usando 'this.db'
    }

    async delete(): Promise<void> {
        console.log('Deleted entity:', this);
        // Implemente aqui a lógica real de deletar no banco de dados usando 'this.db'
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
