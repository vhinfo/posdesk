// const state = {
//     alert:{
//         message:'',
//         type:'error',
//         active:false,
//     }
// };
// const actions = {
//     Alert({commit},alert){
//         return new Promise(resolve =>{            
//             resolve(commit('Alert',alert))
//             resolve(
//                 setTimeout(() => {
//                     commit('AlertRemove');
//                   }, "5000")                  
//             )
//         })
//     },
//     AlertRemove({commit}){
//         return new Promise(resolve =>{            
//             resolve(commit('AlertRemove'))
//         })
//     },
// };
// const mutations = {
//     Alert(state, alert){
//         state.alert.type        = alert.type
//         state.alert.message     = alert.message
//         state.alert.active      = true
//     },
//     AlertRemove(state){
//         state.alert.type        = 'error'
//         state.alert.message     = ''
//         state.alert.active      = false
//     },
// };
// const getters = {
    
// };
// export default {
//   state,
//   getters,
//   actions,
//   mutations
// };