import sqlite3 from 'sqlite3';
import path from 'path';

// const dbFile = path.join(__dirname, 'database/db.sqlite'); // Caminho para o arquivo SQLite

const sqlite = sqlite3.verbose();
// const db = new sqlite.Database(dbFile);

export class BaseEntity {

    async save(): Promise<void> {
        console.log('Saved entity:', this);
        // Implementar lógica real de salvar no banco de dados aqui
    }

    async update(): Promise<void> {
        console.log('Updated entity:', this);
        // Implementar lógica real de atualizar no banco de dados aqui
    }

    async delete(): Promise<void> {
        console.log('Deleted entity:', this);
        // Implementar lógica real de deletar no banco de dados aqui
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
