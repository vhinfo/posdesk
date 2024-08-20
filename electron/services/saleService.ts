import { stringify } from 'querystring';
import { Sale } from '../models/Sale.js';
import { User } from '../models/User.js';
import { DatabaseService } from '../services/databaseService.js';
import { sendSale } from './api/saleApi.js';
import { format } from 'date-fns'; 
import { Cashier } from '../models/Cashier.js';

const db = DatabaseService.getDBInstance();

export const saleService =
{
    async sendSale(sale:Sale):Promise<any>
    {    
        // validations 
        if (sale.payments.length === 0) {
            throw new Error('venda sem nenhuma forma de pagameto');
        }
        
        if(sale.items.length === 0) {
            throw new Error('venda sem nenhum item')
        }
        
        await this.validateCoupom(sale);
        
        // sale creation
        if('' === sale.saleDate){
            sale.saleDate = format(new Date(), 'yyyy-MM-dd HH:mm:s');
        }
        
        const user = await User.findFirst(db);
        if(!user){
            throw new Error('falha ao obter usuário');
        }
        
        const cashier  = await Cashier.findById(db, user.cashierId)
        if(!cashier){
            throw new Error('Não foi possível obter o caixa atual');
        }
        sale.cashier = cashier;

        if('' === sale.number){
            sale.number = await this.forgeSaleNumber(sale,user);
        }
        

    },

    async forgeSaleNumber(sale:Sale, user:User):Promise<string>
    {
        const payments = sale.payments;
        const store = `${user.storeName.length}${user.cashierName.length}${user.name.length}`;
        const products = sale.items;
        const date = format(new Date(sale.saleDate), 'yyyyMMddHHmm');
        const total = sale.totalValue;
        let paymentCount = 0;
        let productCount = 0;
    
        products.forEach(product => {
            productCount += product.description.length;
        });
        
        payments.forEach(payment => {
            paymentCount += payment.description.length;
        });
    
        return `${date}${paymentCount}${productCount}${store}${total}`;
    },

    async validateCoupom(sale:Sale):Promise<void>
    {
        if(sale.discounts.length === 0){
            return;
        }

        for (const discount of sale.discounts) {
            if ('' === discount.label) {
                continue;
            }
            if ('funcionario' === discount.label && (null === sale.customer || 'FUNCIONARIO' !== sale.customer.type)) {
                throw new Error('cupom informado sem um cliente informado');
            }
            
            if ('funcionarioParceiro' === discount.label && null !== sale.customer &&  'CLIENTE_PARCEIRO' !== sale.customer.type) {
                throw new Error('cupom informado sem um cliente informado');
            }
        }
    }
}

