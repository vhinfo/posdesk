import { BaseEntity } from './BaseEntity';
import { Store } from './Store';
import { Cashier } from './Cashier';
import { User } from './User';
import { Person } from './Person';
import { Payment } from './Payment';
import { Product } from './Product';
import sqlite3 from 'sqlite3';
import { Cupom } from './Cupom';

export class Sale extends BaseEntity {
    id: number | null;
    changeValue: number | null;
    paymentMethod: string;
    number: string | null;
    saleDate: Date | string;
    store: Store;
    cashier: Cashier;
    employeeCashier: { id: number, name: string }|null;
    employeeSale: boolean;
    obs: string;
    sysObs: string;
    productsValue: number;
    paymentsValue: number;
    discountValue: number;
    totalValue: number;
    customer: Person;
    salesman: Person;
    status: string;
    payments: Payment[];
    items: Product[];
    discounts: Cupom[];
    invoice: boolean;
    invoiceSerie: string | null;
    invoiceNumber: string | null;
    invoiceCoupon: string | null;
    invoiceXml: string | null;

    static readonly tableName: string = 'sales';
    static readonly fields = [
        { name: 'changeValue', type: 'REAL' },
        { name: 'paymentMethod', type: 'TEXT' },
        { name: 'number', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'saleDate', type: 'TEXT' },
        { name: 'obs', type: 'TEXT' },
        { name: 'sysObs', type: 'TEXT' },
        { name: 'productsValue', type: 'REAL' },
        { name: 'paymentsValue', type: 'REAL' },
        { name: 'discountValue', type: 'REAL' },
        { name: 'totalValue', type: 'REAL' },
        { name: 'invoice', type: 'INTEGER' },
        { name: 'invoiceSerie', type: 'TEXT' },
        { name: 'invoiceNumber', type: 'TEXT' },
        { name: 'invoiceCoupon', type: 'TEXT' },
        { name: 'invoiceXml', type: 'TEXT' },
        { name: 'status', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number | null;
        changeValue: number | null;
        paymentMethod: string;
        number: string | null;
        saleDate: Date | string;
        store: Store;
        cashier: Cashier;
        employeeCashier: { id: number, name: string };
        employeeSale: boolean;
        obs: string;
        sysObs: string;
        productsValue: number;
        paymentsValue: number;
        discountValue: number;
        totalValue: number;
        customer: Person;
        salesman: Person;
        status: string;
        payments: Payment[];
        items: Product[];
        discounts: Cupom[];
        invoice: boolean;
        invoiceSerie: string | null;
        invoiceNumber: string | null;
        invoiceCoupon: string | null;
        invoiceXml: string | null;
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Sale.tableName;
    }
}
