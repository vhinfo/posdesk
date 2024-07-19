
export async function getDiscount(token:string, code:string): Promise<any> {
    const headers: HeadersInit = {
      "Authorization": token || '',
      "Content-Type": "application/json"
    };

    const raw = {
        code:code
    }
    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
      body: JSON.stringify(raw)
    };

    const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/cupom`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result.data as string;
}