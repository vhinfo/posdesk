import { BaseEntity } from './BaseEntity';
import sqlite3 from 'sqlite3';

export class Cupom extends BaseEntity {
    id: number;
    label: string;
    code: string;
    value: number;
    active: boolean;
    defaultCupom: boolean; 
    description: string;
    allProducts: boolean;
    percent: boolean;
    accumulate: boolean; 
    quantity: number | null;
    withValidate: boolean;
    startDate: Date;
    endDate: Date;
    customerId: number;

    static readonly tableName = this.name;
    static readonly fields = [
        { name: 'label', type: 'TEXT NOT NULL' },
        { name: 'code', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'value', type: 'REAL NOT NULL' },
        { name: 'active', type: 'INTEGER' },
        { name: 'defaultCupom', type: 'INTEGER' },
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

    constructor(db: sqlite3.Database, cupomData: {
        id: number,
        label: string,
        code: string,
        value: number,
        active: boolean,
        defaultCupom: boolean,
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
        super(db);
        this.id = cupomData.id;
        this.label = cupomData.label;
        this.code = cupomData.code;
        this.value = cupomData.value;
        this.active = cupomData.active;
        this.defaultCupom = cupomData.defaultCupom;
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
