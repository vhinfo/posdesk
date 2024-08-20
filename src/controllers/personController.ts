// src/controllers/authController.ts

import store from '../store';
import { Person } from '../types';

export async function getPerson(document:string):Promise<any>
{   
    if (document === undefined || document.trim() === '') {
        throw new Error('Número de documento inválido!');
    }

    // Filtra a string para conter apenas números
    const documentFiltred = document.replace(/\D/g, '');

    if (documentFiltred === '' || documentFiltred.length < 11) {
        throw new Error('Número de documento inválido!');
    }
   
    const responsePerson = await window.personService.getPerson(document);
    return {
        id:responsePerson.id,
        document: responsePerson.document,
        name: responsePerson.name,
        email: responsePerson.email,
        phone: responsePerson.phone,
        type: responsePerson.type,
        store_partiner_id: responsePerson.store_partiner_id ?? null,
        store_partiner_name: responsePerson.store_partiner_name ?? null
    }
}

export async function processSaleCustomer(customer: Person): Promise<boolean> {
    const simplifiedCustomer = {
        id: customer.id,
        document: customer.document,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        type: customer.type
    };

    if (simplifiedCustomer.id === null) {
        // Crie o cliente e envie para o ERP
        try {
            simplifiedCustomer.id = await window.personService.createCustomer(simplifiedCustomer);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            throw error;
        }
    }

    store.commit('sale/clearCustomer');
    store.commit('sale/addCustomer', simplifiedCustomer);

    return true;
}
