import { BaseEntity } from './BaseEntity';

export class Cupom extends BaseEntity {
    id: number;
    label: string;
    code: string;
    value: number;
    active: boolean;
    default: boolean; 
    description: string;
    allProducts: boolean;
    percent: boolean;
    accumulate: boolean; 
    quantity: number | null;
    withValidate: boolean;
    startDate: Date;
    endDate: Date;
    customerId: number;

    static tableName = 'cupom'; 
    static fields = [
        { name: 'label', type: 'TEXT NOT NULL' },
        { name: 'code', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'value', type: 'REAL NOT NULL' },
        { name: 'active', type: 'INTEGER' },
        { name: 'default', type: 'INTEGER' },
        { name: 'description', type: 'TEXT' },
        { name: 'allProducts', type: 'INTEGER' },
        { name: 'percent', type: 'INTEGER' },
        { name: 'accumulate', type: 'INTEGER' },
        { name: 'quantity', type: 'INTEGER' },
        { name: 'withValidate', type: 'INTEGER' },
        { name: 'startDate', type: 'TEXT' },
        { name: 'endDate', type: 'TEXT' },
        { name: 'customerId', type: 'INTEGER' }
    ];

    constructor(cupomData: {
        id: number,
        label: string,
        code: string,
        value: number,
        active: boolean,
        default: boolean,
        description: string,
        allProducts: boolean,
        percent: boolean,
        accumulate: boolean,
        quantity: number | null,
        withValidate: boolean,
        startDate: Date,
        endDate: Date,
        customerId: number
    }) {
        super();
        this.id = cupomData.id;
        this.label = cupomData.label;
        this.code = cupomData.code;
        this.value = cupomData.value;
        this.active = cupomData.active;
        this.default = cupomData.default;
        this.description = cupomData.description;
        this.allProducts = cupomData.allProducts;
        this.percent = cupomData.percent;
        this.accumulate = cupomData.accumulate;
        this.quantity = cupomData.quantity;
        this.withValidate = cupomData.withValidate;
        this.startDate = cupomData.startDate;
        this.endDate = cupomData.endDate;
        this.customerId = cupomData.customerId;
    }
}
