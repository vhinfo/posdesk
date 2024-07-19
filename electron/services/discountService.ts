import { Cupom } from '../models/Cupom.js';
import { User } from '../models/User.js';
import { DatabaseService } from '../services/databaseService.js';
import { getDiscount } from './api/discountApi.js';

const db = DatabaseService.getDBInstance();

export const discountService =
{
    async getDiscount(code: string): Promise<Cupom> {
        let discounts = await Cupom.findBy(db, [['code', '=', code]]);
        if (discounts.length > 0) {
            return discounts[0];
        }
    
        let user = await User.findFirst(db);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
    
        let result = await getDiscount(user.accessToken, code);
    
        return new Cupom(db, {
            id: result.id,
            label: result.label,
            code: result.code,
            value: result.calue,
            active: result.active,
            defaultCupom: result.default,
            description: result.description,
            allProducts: result.allproducts,
            percent: result.percent,
            accumulate: result.accumulate,
            quantity: result.quantity,
            withValidate: result.with_validity,
            startDate: Date,
            endDate: Date,
            customerId: number
        });
    },
    
    async saveDiscount(discount:Discount):Promise<void>
    {
        console.log('TODO SAVE DISCOUNT');
    },
    
    async saveProductDiscount(discount:Discount):Promise<void>
    {
        console.log('TODO SAVE PRODUCT DISCOUNT');
    }
}