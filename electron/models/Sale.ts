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
    id: number;
    changeValue: number;
    reProcess: boolean;
    qtdItems: number;
    qtdPayments: number;
    forceCustomer: boolean;
    paymentMethod: number;
    validSale: boolean;
    number: string|null;
    saleDate: Date|string;
    store: Store;
    cashier: Cashier;
    employeeCashier: User;
    employeeSale: boolean;
    obs: string;
    sysObs: string; 
    productsValue: number;
    paymentsValue: number;
    discountValue: number;
    totalValue: number;
    invoice: boolean;
    invoiceSerie: string;
    invoiceNumber: string;
    invoiceCoupon: string;
    invoiceXml: string;
    customer: Person;
    salesman: Person;
    payments: Payment[];
    items: Product[];
    discounts: Cupom[];
    nfceNumber: string; 
    nfceCoupon: string;
    status: string;

    static readonly tableName: string = 'sales';
    static readonly fields = [
        { name: 'changeValue', type: 'REAL' },
        { name: 'reProcess', type: 'INTEGER' },
        { name: 'qtdItems', type: 'INTEGER' },
        { name: 'qtdPayments', type: 'INTEGER' },
        { name: 'forceCustomer', type: 'INTEGER' },
        { name: 'paymentMethod', type: 'INTEGER' },
        { name: 'validSale', type: 'INTEGER' },
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
        { name: 'nfceNumber', type: 'TEXT' },
        { name: 'nfceCoupon', type: 'TEXT' },
        { name: 'status', type: 'TEXT' }
    ];

    constructor(db: sqlite3.Database, entityData: {
        id: number;
        change_value: number;
        re_process: boolean;
        qtd_items: number;
        qtd_payments: number;
        force_customer: boolean;
        payment_method: number;
        valid_sale: boolean;
        number: string|null;
        sale_date: Date;
        store: Store;
        cashier: Cashier;
        employee_cashier: User;
        employee_sale: boolean;
        obs: string;
        sys_obs: string;
        products_value: number;
        payments_value: number;
        discount_value: number;
        total_value: number;
        invoice: boolean;
        invoice_serie: string;
        invoice_number: string;
        invoice_coupon: string;
        invoice_xml: string;
        customer: Person;
        salesman: Person;
        payments: Payment[];
        items: Product[];
        discounts: Cupom[];
        nfce: {
            number: string;
            coupon: string;
        };
        status: {
            status_id: number;
            status_description: string;
            status_icon: string;
            status_color: string;
            description: string;
        };
    }) {
        super(db);
        Object.assign(this, entityData);
    }

    get tableName(): string {
        return Sale.tableName;
    }

}
