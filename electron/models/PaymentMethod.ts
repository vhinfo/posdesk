import { BaseEntity } from './BaseEntity';

export class PaymentMethod extends BaseEntity {
    id: number;
    description: string;
    alias: string;
    issue: boolean;
    icon: string;

    static readonly tableName = 'payments';
    static readonly fields = [
        { name: 'description', type: 'TEXT NOT NULL' },
        { name: 'alias', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'issue', type: 'INTEGER' },
        { name: 'icon', type: 'TEXT' }
    ];

    constructor(paymentData: {
        id: number,
        description: string,
        alias: string,
        issue: boolean,
        icon: string
    }) {
        super();
        this.id = paymentData.id;
        this.description = paymentData.description;
        this.alias = paymentData.alias;
        this.issue = paymentData.issue;
        this.icon = paymentData.icon;
    }
}
