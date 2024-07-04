import jwt from 'jsonwebtoken';

import { getFirstConfigs, login, setCashier } from './api/authApi.js';
import { User } from '../models/User.js';
import { DatabaseService } from '../services/databaseService.js';
import { Store } from '../models/Store.js';
import { Cashier } from '../models/Cashier.js';
import { PaymentMethod } from '../models/PaymentMethod.js';
import { Cupom } from '../models/Cupom.js';

const db = DatabaseService.getDBInstance();

export const authService = {
  async validateAuthentication(args: any): Promise<{ name:string, storeName:string, cashierName: string, isManager:boolean }> 
  {
    const user = await User.getFirstUser(db);
    if(!user) {
      throw Error('sem usuário salvo em cache')
    }
    if(!this.isTokenExpired(user.accessToken)){
      throw Error(' conexão expirada, connecte-se novamente ')
    }
    if(user.cashierId === null || user.cashierName === null){
      throw Error(' usuario sem caixa definido ')
    }

    return { 
      name:user.name, 
      storeName:user.storeName, 
      cashierName: user.cashierName, 
      isManager:user.isManager 
    };
  },

  async authenticate(user: string, password: string): Promise<boolean> 
  {
    const token = await login(user, password);
    console.log('TRYING LOGIN',token);
    if(!token || 'Usuário não encontrado' === token){
      throw Error('login ou senha errados');
    }
    const firstconfigs = await getFirstConfigs(token);
    let savedUser = await this.createUser(firstconfigs, token);
    let store = await this.createStore(firstconfigs);
    let payment = await this.createPaymentMethod(firstconfigs);
    let cupom = await this.createCupom(firstconfigs);
    
    return true;
  },

  async getStoreCashiers(): Promise<{ store: Store, cashiers: Cashier[] }> 
  {
      const user = await User.getFirstUser(db);
      if (!user) {
        throw new Error('Nenhum usuário encontrado');
      }
      const store = await Store.findFirst(db);
      const cashiers = await Cashier.findBy(db,[['storeId','=',store.id]]);
      if(cashiers.length === 0 ){
        throw Error('sem caixa')
      }
      return { store, cashiers };
  },

  async setCashier(cashierId:number):Promise<boolean>
  {
    let user = await User.getFirstUser(db);
    let cashier = await Cashier.findById(db, cashierId);
    let store = await Store.findById(db,cashier.storeId);
    let newToken = await setCashier(cashierId,user.accessToken);
    user.accessToken = newToken;
    user.cashierId = cashier.id;
    user.cashierName = cashier.name;
    user.storeName = store.name;
    user.save();
    return false;
  },

  async makeLogout():Promise<boolean>
  {
    User.clear(db);
    return true;
  },
  
  async createUser(response: any, accessToken: string): Promise<User> 
  {
    const user = new User(db, {
      id: response.user_id,
      name: response.user_name,
      accessToken: accessToken,
      profession: response.profession,
      isManager: response.is_manager,
      image: response.img,
      cashierId: response.cashier_id,
      cashierName: response.cashier_name,
      storeName: null,
    });

    // clear all users
    User.clear(db);
    Store.clear(db);
    Cupom.clear(db);

    await user.save();

    return user;
  },

  async createStore(response: any): Promise<Store> 
  {
    response = response.store;
    const store = new Store(db, {
      id: response.store_id,
      name: response.store_name,
      type: response.store_type,
      abbreviation: response.store_abbreviation,
      groupId: response.store_group_id,
      groupName: response.store_group_name
    });
    response.store_cashiers.forEach(cashier => {
      this.createCashier(cashier);
    });
    await store.save();

    return store;
  },

  async createCashier(cashierResponse: any): Promise<Cashier> 
  {
    const cashier = new Cashier(db, {
      id: cashierResponse.cashier_id,
      name: cashierResponse.cashier_name,
      storeId: cashierResponse.cashier_store,
      userId: cashierResponse.system_user.user_id, 
      userName: cashierResponse.system_user.user_name
    });

    await cashier.save();
    
    return cashier;
  },

  async createPaymentMethod(response: any): Promise<PaymentMethod[]> 
  {
    const paymentMethods: PaymentMethod[] = [];

    for (const payment of response.payment_methods) {
      const paymentMethod = new PaymentMethod(db, {
        id: payment.method_id,
        description: payment.method_description,
        alias: payment.method_alias,
        issue: payment.method_issue,
        icon: payment.method_icon
      });

      await paymentMethod.save();
      paymentMethods.push(paymentMethod);
    }

    return paymentMethods;
  },

  async createCupom(response: any): Promise<Cupom[]> 
  {
    const copons: Cupom[] = [];

    for (const cupon of response.cupoms) {
      const cupom = new Cupom(db, {
        id: null,
        label: cupon.label,
        code: cupon.code,
        value: cupon.value,
        active: cupon.active,
        defaultCupom: cupon.default,
        description: cupon.description,
        allProducts: cupon.allproducts,
        percent: cupon.percent,
        accumulate: cupon.accumulate,
        quantity: cupon.quantity,
        withValidate: cupon.with_validity,
        startDate: cupon.start_date,
        endDate: cupon.end_date,
        customerId: cupon.customer_id
      });

      const baseCupom = await Cupom.findBy(db, [['code', '=', cupom.code]]);
      if (baseCupom.length === 0) {
        await cupom.save();
        copons.push(cupom);
      } else {
        cupom.id = baseCupom[0].id;
        await cupom.update();
      }
    }

    return copons;
  },

  isTokenExpired(token: string): boolean 
  {
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken || !decodedToken.expires) {
      return false;
    }
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    return decodedToken.expires > currentTimestampInSeconds;
  }
};
