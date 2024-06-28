import { BaseEntity } from './BaseEntity';

export class Salesman extends BaseEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;

    static readonly tableName = 'salesmans';
    static readonly fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'email', type: 'TEXT' },
        { name: 'phone', type: 'TEXT' },
        { name: 'type', type: 'TEXT' }
    ];

    constructor(customerData: {
        id: number,
        name: string,
        email: string,
        phone: string,
        type: string
    }) {
        super();
        this.id = customerData.id;
        this.name = customerData.name;
        this.email = customerData.email;
        this.phone = customerData.phone;
        this.type = customerData.type;
    }
}
