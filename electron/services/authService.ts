import { authenticate } from './api/authApi';
import { User } from '../models/User';

export const authService = {
  async validateAuthentication(args: any): Promise<boolean> {
    // Implemente sua lógica real de validação de autenticação aqui
    return true;
  },
  // async authenticate(args: any): Promise<User> {
  //   let token = await authenticate('admin','senha aleatoria');
  //   auth getFirstconfigs
    
  //   let user = new User(null,'','','token');
  //   return user;
  // },
  async authenticate(args: any) {
    // let token = await authenticate('admin','senha aleatoria');
    // let user = new User();
    return '';
  },
};
