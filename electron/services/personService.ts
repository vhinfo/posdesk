import { Person } from '../models/Person.js';
import { User } from '../models/User.js';
import { DatabaseService } from '../services/databaseService.js';
import { getPerson,createCustomer } from './api/personApi.js';

const db = DatabaseService.getDBInstance();

export const personService =
{
   async getPerson (document:string ):Promise<any>
   {
      let user = await User.findFirst(db);
      let result = await getPerson(user.accessToken, document);
      return result;
   },

   async createCustomer(customer:Person):Promise<number>
   {
      let user = await User.findFirst(db);
      let result = await createCustomer(user.accessToken, customer);

      if(!result){
         throw Error('não foi possivel salvar o cliente');
      }

      return result.id;
   }
}