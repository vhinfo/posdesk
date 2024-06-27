import { BaseEntity } from './BaseEntity';
import { Store } from './Store';
import { Cashier } from './Cashier';
import { User } from './User';
import { Customer } from './Customer';
import { Salesman } from './Salesman';
import { Payment } from './PaymentMethod';
import { Product } from './Product';
import { Discount } from './Discount';

export class Sale extends BaseEntity {
    id: number;
    changeValue: number;
    reProcess: boolean;
    qtdItems: number;
    qtdPayments: number;
    forceCustomer: boolean;
    paymentMethod: number;
    validSale: boolean;
    number: string;
    saleDate: Date;
    store: Store;
    cashier: Cashier;
    employeeCashier: User;
    employeeSale: boolean;
    obs: string;
    sysObs: any; // Assuming sysObs is of type any due to lack of specific structure in JSON
    productsValue: number;
    paymentsValue: number;
    discountValue: number;
    totalValue: number;
    invoice: boolean;
    invoiceSerie: string;
    invoiceNumber: string;
    invoiceCoupon: string;
    invoiceXml: string;
    customer: Customer;
    salesman: Salesman; // Assuming salesman can be any structure
    payments: Payment[];
    items: Product[];
    discounts: Discount[];
    nfceNumber: string; // Assuming nfceNumber can be a string based on JSON example
    nfceCoupon: string;
    status: string;

    static tableName = 'sales';
    static fields = [
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

    constructor(saleData: {
        id: number;
        change_value: number;
        re_process: boolean;
        qtd_items: number;
        qtd_payments: number;
        forceCustomer: boolean;
        payment_method: number;
        valid_sale: boolean;
        number: string;
        sale_date: Date;
        store: Store;
        cashier: Cashier;
        employee_cashier: User;
        employee_sale: boolean;
        obs: string;
        sys_obs: any;
        products_value: number;
        payments_value: number;
        discount_value: number;
        total_value: number;
        invoice: boolean;
        invoice_serie: string;
        invoice_number: string;
        invoice_coupon: string;
        invoice_xml: string;
        customer: Customer;
        salesman: Salesman;
        payments: Payment[];
        items: Product[];
        discounts: Discount[];
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
        super();
        this.id = saleData.id;
        this.changeValue = saleData.change_value;
        this.reProcess = saleData.re_process;
        this.qtdItems = saleData.qtd_items;
        this.qtdPayments = saleData.qtd_payments;
        this.forceCustomer = saleData.forceCustomer;
        this.paymentMethod = saleData.payment_method;
        this.validSale = saleData.valid_sale;
        this.number = saleData.number;
        this.saleDate = saleData.sale_date;
        this.store = saleData.store;
        this.cashier = saleData.cashier;
        this.employeeCashier = saleData.employee_cashier;
        this.employeeSale = saleData.employee_sale;
        this.obs = saleData.obs;
        this.sysObs = saleData.sys_obs;
        this.productsValue = saleData.products_value;
        this.paymentsValue = saleData.payments_value;
        this.discountValue = saleData.discount_value;
        this.totalValue = saleData.total_value;
        this.invoice = saleData.invoice;
        this.invoiceSerie = saleData.invoice_serie;
        this.invoiceNumber = saleData.invoice_number;
        this.invoiceCoupon = saleData.invoice_coupon;
        this.invoiceXml = saleData.invoice_xml;
        this.customer = saleData.customer;
        this.salesman = saleData.salesman;
        this.payments = saleData.payments;
        this.items = saleData.items;
        this.discounts = saleData.discounts;
        this.nfceNumber = saleData.nfce.number;
        this.nfceCoupon = saleData.nfce.coupon;
        this.status = saleData.status.status_description;
    }
}
