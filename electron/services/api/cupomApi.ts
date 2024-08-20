
export async function getDiscount(token:string, code:string): Promise<any> {
  console.log('token: ',token);
    const headers: HeadersInit = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const requestOptions: RequestInit = {
      method: 'get',
      headers,
      redirect: 'follow',
    };

    const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/cupom?code=${code}`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
}