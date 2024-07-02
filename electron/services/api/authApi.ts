export async function login(user: string, password: string): Promise<string> {
  const headers: HeadersInit = {
    "Authorization": process.env.ERP_TOKEN || '',
    "Content-Type": "application/json"
  };
  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };
  const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/auth/${user}/${password}`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const result = await response.json();
  return result.data as string;
}

export async function getFirstConfigs(token: string) {
  const headers: HeadersInit = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };
  const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/start`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const result = await response.json();
  return result.data.data;
}

export async function setCashier(cashierId: number, token: string){
  const headers: HeadersInit = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  var raw = JSON.stringify({
    "cashier": cashierId
  });
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body:raw,
    redirect: 'follow'
  };
  const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/start`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const result = await response.json();
  return result.data.access;
}