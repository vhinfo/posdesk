// // import {mergeSales} from "../../services/SaleServices/getCompareSale"
// // import { format } from 'date-fns'
// const state = {
//     to_sync_sales:[],
//     sales:[],
//     updated_at:''
// };

// const getters = {
//     sales(state){
//         return state.sales
//     },
//     updated_at(state){
//         return state.updated_at
//     }
// };
// const actions = {
//     newSale({commit},sale){
//         return new Promise(resolve =>{            
//             resolve(commit('newSale',sale))
//         })
//     },    
//     salesMerge({commit},server_sales){
//         return new Promise(resolve =>{            
//             resolve(commit('salesMerge',server_sales))
//         })
//     },    
// };
// const mutations = {
//     newSale(state,sale){
//         if(sale.id !== '' && sale.status !== 'Erro'){
//             state.sales.push(sale) 
//         }else{
//             state.to_sync_sales.push(sale)
//         }
//     },
//     // salesMerge(state,server_sales){
//     //     var merged              = mergeSales(state.to_sync_sales,server_sales)
//     //     state.sales             = merged.up ? merged.up : state.sales
//     //     state.to_sync_sales     = merged.not_up ? merged.not_up : state.to_up_sales
//     //     state.updated_at        = format(new Date(), "yyyy-MM-dd HH:mm:ss")
//     // },
// };
// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// };
