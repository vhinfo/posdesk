
export async function getProducts(token: string): Promise<any[]> {
    const headers: HeadersInit = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const requestOptions: RequestInit = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };

    const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/product`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return result.data;
}


// export async function setWrongPrice (data,id){
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization","Bearer "+Cookie.get('._token'));    
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: JSON.stringify(data),
//       redirect: 'follow'
//     };
    
//     const call = await fetch(`${process.env.VUE_APP_BACK_URL}/product/${id}`, requestOptions)
//     .then(response => {
//         if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
//         return response.json()
//     })
//     .then(result => {
//         return result.data.data
//     })
//     .catch(error => {
//         alert('error',error.message)
//     });
//     return call   
// }