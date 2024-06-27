import { BaseEntity } from './BaseEntity';

export class Cashier extends BaseEntity {
    id: number;
    name: string;
    storeId: string;
    systemUser: { userId: number, userName: string };

    static tableName = 'cashiers';
    static fields = [
        { name: 'cashierId', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'storeId', type: 'TEXT' },
        { name: 'systemUser', type: 'JSON' }
    ];

    constructor(cashierData: {
        id: number,
        name: string,
        storeId: string,
        systemUser: { userId: number, userName: string }
    }) {
        super();
        this.id = cashierData.id;
        this.name = cashierData.name;
        this.storeId = cashierData.storeId;
        this.systemUser = cashierData.systemUser;
    }
}
