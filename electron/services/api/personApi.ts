import { Person } from "../../models/Person";

export async function getPerson(token:string, document:string): Promise<any> {
  const headers: HeadersInit = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  let raw:string = JSON.stringify({
    "document": document
  });

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body:raw,
    redirect: 'follow'
  };

  const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/customer`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const result = await response.json();

  return result.data;
}

export async function createCustomer(token:string, customer:Person): Promise<any> {
  console.log('in api save customer');
  const headers: HeadersInit = {
    "Authorization":  `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  let raw:string = JSON.stringify(customer);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body:raw,
    redirect: 'follow'
  };
  const url = `http://${process.env.ERP_URL}:${process.env.ERP_PORT}/customer`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}