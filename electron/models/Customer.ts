import { BaseEntity } from './BaseEntity';

export class Customer extends BaseEntity {
    id: number;
    document: string;
    name: string;
    email: string;
    phone: string;
    type: string;

    static tableName = 'customers';
    static fields = [
        { name: 'document', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'email', type: 'TEXT' },
        { name: 'phone', type: 'TEXT' },
        { name: 'type', type: 'TEXT' }
    ];

    constructor(customerData: {
        id: number,
        document: string,
        name: string,
        email: string,
        phone: string,
        type: string
    }) {
        super();
        this.id = customerData.id;
        this.document = customerData.document;
        this.name = customerData.name;
        this.email = customerData.email;
        this.phone = customerData.phone;
        this.type = customerData.type;
    }
}
