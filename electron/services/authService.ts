import { getFirstConfigs, login } from './api/authApi.js';
import { User } from '../models/User.js';
import { DatabaseService } from '../services/databaseService.js';
import { Store } from '../models/Store.js';
import { Cashier } from '../models/Cashier.js';
import { PaymentMethod } from '../models/PaymentMethod.js';
import { Cupom } from '../models/Cupom.js';

export const authService = {
  async validateAuthentication(args: any): Promise<boolean> {
    try {
      const user = await User.getFirstUser(DatabaseService.getDBInstance());
      if (!user) {
        return false;
      }

      console.log("TOKEN FROM USER", user?.accessToken);
      return true; // Aqui você deve implementar a lógica de validação de autenticação
    } catch (error) {
      console.error('Erro ao validar autenticação:', error);
      return false;
    }
  },

  async authenticate(user: string, password: string): Promise<boolean> {
    const token = await login(user, password);
    const firstconfigs = await getFirstConfigs(token);
    let savedUser = await this.createUser(firstconfigs, token);
    let store = await this.createStore(firstconfigs);
    let payment = await this.createPaymentMethod(firstconfigs);
    let cupom = await this.createCupom(firstconfigs);
    console.group('configs', firstconfigs);
    
    return true;
  },

  async createUser(response: any, accessToken: string): Promise<User> {
    const user = new User(DatabaseService.getDBInstance(), {
      id: response.user_id,
      name: response.user_name,
      accessToken: accessToken,
      profession: response.profession,
      isManager: response.is_manager,
      image: response.img,
      cashierId: response.cashier_id,
      cashierName: response.cashier_name
    });

    await user.save();

    return user;
  },

  async createStore(response: any): Promise<Store> {
    response = response.store;
    const store = new Store(DatabaseService.getDBInstance(), {
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

  async createCashier(cashierResponse: any): Promise<Cashier> {
    const cashier = new Cashier(DatabaseService.getDBInstance(), {
      id: cashierResponse.cashier_id,
      name: cashierResponse.cashier_name,
      storeId: cashierResponse.cashier_store,
      systemUser: 
        { 
          userId: cashierResponse.system_user.user_id, 
          userName: cashierResponse.system_user.user_name 
        }
    });

    await cashier.save();
    
    return cashier;
  },

  async createPaymentMethod(response: any): Promise<PaymentMethod[]> {
    const paymentMethods: PaymentMethod[] = [];

    for (const payment of response.payment_methods) {
      const paymentMethod = new PaymentMethod(DatabaseService.getDBInstance(), {
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

  async createCupom(response: any): Promise<Cupom[]> {
    const copons: Cupom[] = [];

    for (const cupon of response.cupoms) {
      const cupom = new Cupom(DatabaseService.getDBInstance(), {
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

      await cupom.save();
      copons.push(cupom);
    }

    return copons;
  }
};
