import { BaseEntity } from './BaseEntity';

export class Cashier extends BaseEntity {
    name: string;
    storeId: string;
    systemUser: { userId: number, userName: string };

    static readonly tableName = 'cashiers';
    static readonly fields = [
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
        this.name = cashierData.name;
        this.storeId = cashierData.storeId;
        this.systemUser = cashierData.systemUser;
    }
}
