import fetch, { HeadersInit, RequestInit } from 'electron-fetch';

interface AuthenticationResult {
  accessToken: string;
  // Outros campos conforme necessário
}

export async function authenticate(email: string, password: string): Promise<string> {
  const headers: HeadersInit = {
    "Authorization": process.env.ERP_TOKEN || '',
    "Content-Type": "application/json"
  };

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow' // Redirecionamento configurado diretamente como string 'follow'
  };

  const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/auth/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const result = await response.json();
  
  return result.data as string;
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