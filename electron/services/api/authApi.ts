import fetch from 'electron-fetch';

export async function Authenticate(email, password) {
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": process.env.ERP_TOKEN,
            "Content-Type": "application/json"
        },
        redirect: 'follow'
    };

    const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/auth/${email}/${password}`;

    console.log("TRY LOGIN AS ", url);

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Authentication error: ' + error.message);
    }
}



// //first configs
// export async function start (){
//     var requestOptions = {
//     method: 'GET',
//     headers: {
//         // "Authorization": "Bearer "+ Cookie.get('._token'),
//     },
//     redirect: 'follow'
//     };
//     const call =  await fetch(`${process.env.VUE_APP_BACK_URL}/start`, requestOptions)
//     .then(response => {
//         if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
//         return response.json()
//     })
//     .then(result => {
//         if(result.data.error)throw new Error(result.data.data)
//         return result.data.data
//     })
//     .catch(error => {
//         // alert('error',error.message)
//     });
//     return call
// }


// //jwt token with a cashier
// export async function setCashier(cashier_id){
//     var raw = JSON.stringify({
//         "cashier": cashier_id
//       });
//     var requestOptions = {
//         method: 'POST',
//         body:raw,
//         headers: {
//             // "Authorization": "Bearer "+ Cookie.get('._token'),
//         },
//         redirect: 'follow'
//     };
//     const call =  await fetch(`${process.env.VUE_APP_BACK_URL}/start`, requestOptions)
//     .then(response => {
//         if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
//         return response.json()
//     })
//     .then(result => {
//         if(result.data.error)throw new Error(result.data.data)
       
//         return result
//     })
//     .catch(error => {
//         // alert('error',error.message)
//     });
//     return call
// }