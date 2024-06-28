import { BaseEntity } from './BaseEntity';

export class Discount extends BaseEntity {
    id: number;
    withClient: string;
    code: string;
    description: string;
    value: number;
    allProducts: number;
    accumulate: number;
    percent: number;
    quantity: number | null;
    sku: string;

    static readonly tableName = 'discounts';
    static readonly fields = [
        { name: 'withClient', type: 'TEXT' },
        { name: 'code', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'description', type: 'TEXT' },
        { name: 'value', type: 'REAL NOT NULL' },
        { name: 'allProducts', type: 'INTEGER' },
        { name: 'accumulate', type: 'INTEGER' },
        { name: 'percent', type: 'INTEGER' },
        { name: 'quantity', type: 'INTEGER' },
        { name: 'sku', type: 'TEXT' }
    ];

    constructor(discountData: {
        id: number,
        with_client: string,
        code: string,
        description: string,
        value: number,
        all_products: number,
        accumulate: number,
        percent: number,
        quantity: number | null,
        sku: string
    }) {
        super();
        this.id = discountData.id;
        this.withClient = discountData.with_client;
        this.code = discountData.code;
        this.description = discountData.description;
        this.value = discountData.value;
        this.allProducts = discountData.all_products;
        this.accumulate = discountData.accumulate;
        this.percent = discountData.percent;
        this.quantity = discountData.quantity;
        this.sku = discountData.sku;
    }
}
