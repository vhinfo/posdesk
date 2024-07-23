import { Sale } from '../models/Sale.js';
import { User } from '../models/User.js';
import { DatabaseService } from '../services/databaseService.js';
import { sendSale } from './api/saleApi.js';
import { format } from 'date-fns'; 

const db = DatabaseService.getDBInstance();

export const saleService =
{
   async sendSale(sale:Sale):Promise<any>//type Sale
   {    
        const user = await User.findFirst(db);
        if(!user){
           throw new Error('falha ao obter usuário');
        }

        const remoteSale = await sendSale(user.accessToken, sale);
        if(!remoteSale){
            throw new Error('falha ao salvar a venda');
        }
        
        if (sale.payments.length === 0) {
            throw new Error('venda sem nenhuma forma de pagameto');
        }

        if(sale.items.length === 0) {
            throw new Error('venda sem nenhum item')
        }

        await this.validateCoupom(sale);

        if('' === sale.saleDate){
            sale.saleDate = format(new Date(), 'yyyy-MM-dd HH:mm:s');
        }

        console.log(sale);
        if('' === sale.number){
            sale.number = await this.forgeSaleNumber(sale,user);
        }

        console.log(sale);
        // update sqlite

        // create sqlite
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
            console.log(product.description.length)
            productCount += product.description.length;
        });
        
        payments.forEach(payment => {
            console.log(payment.description)
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
        
            if (('funcionario' === discount.label || 'funcionarioParceiro' === discount.label) && '' === sale.customer.document) {
                throw new Error('cupom informado sem um cliente informado');
            }
        }
        
   }
}

