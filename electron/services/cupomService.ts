import { Cupom } from '../models/Cupom.js';
import { User } from '../models/User.js';
import { DatabaseService } from './databaseService.js';
import { getDiscount } from './api/cupomApi.js';

const db = DatabaseService.getDBInstance();

export const cupomService = {
    async getCupom(code: string): Promise<Cupom> {
        console.log('inside cupom service');
        let discounts = await Cupom.findBy(db, [['code', '=', code]]);
        if (discounts.length > 0) {
            return discounts[0];
        }
    
        let user = await User.findFirst(db);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
    
        let result = await getDiscount(user.accessToken, code);
        
        console.log(result);
        if(undefined === result){
            return undefined;
        }
        const newCupom =  new Cupom(db, {
            id: result.id,
            label: result.label,
            code: result.code,
            value: result.value,
            active: result.active,
            defaultCupom: result.default,
            description: result.description,
            allProducts: result.allproducts,
            percent: result.percent,
            accumulate: result.accumulate,
            quantity: result.quantity,
            withValidate: result.with_validity,
            startDate: result.start_date,
            endDate: result.end_date,
            customerId: result.customer_id
        });

        newCupom.save();
        return newCupom;
    },
    
    async saveDiscount(cupom:Cupom):Promise<void>
    {
        console.log('TODO SAVE DISCOUNT');
    },
    
    async saveProductDiscount(cupom:Cupom):Promise<void>
    {
        console.log('TODO SAVE PRODUCT DISCOUNT');
    }
}