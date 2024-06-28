import { authenticate } from './api/authApi';
import { User } from '../models/User';
import { DatabaseService } from '../services/databaseService';

export const authService = {
  async validateAuthentication(args: any): Promise<boolean> {
    try {
      let user = await User.getFirstUser(DatabaseService.getDBInstance());
      if(null === user){
        return false;
      }
      
      console.log("TOKEN FROM USER", user?.accessToken);
      return true; // Aqui você deve implementar a lógica de validação de autenticação
  } catch (error) {
      console.error('Erro ao validar autenticação:', error);
      return false;
  }
  },
  async authenticate(user:string, password:string): Promise<any> {
    // let token = await authenticate(user,password);
    
    
    // let currentUser = new User(
    //   {
    //     id: 1,
    //     name: 'teste',
    //     login: 'teste',
    //     accessToken: token,
    //     profession: 'testador',
    //     isManager: true,
    //     image: '',
    //     cashierId: 1,
    //     cashierName: 'teste'
    //   }
    // );
    return null;
  },
};
