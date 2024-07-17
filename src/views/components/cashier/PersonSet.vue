<template>
    <div>
        <span>{{customer ? 'Cliente: ' : 'Vendedor: ' }}</span>
        <SvgIcon type="mdi" :path="mdiDelete" class="default-icon-red" width="20" height="20" @click="clearPerson"/>
        <button @click="customer ? openModal() : ''" class="person-set-button" >
            <SvgIcon type="mdi" :path="mdiAccount" class="user-icon" width="35" height="35" />
            <div class="person-info">
                <span>{{ null === personComputed || !personComputed.name || '' === personComputed.name ? 'não informado' : personComputed.name}}</span>
                <span>{{ null === personComputed || !personComputed.document || '' === personComputed.document ? '' : personComputed.document ?? ''}}</span>
            </div>
        </button>
        
        <div v-if="isModalOpen" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>{{ modalTitle }}</h3>
                    <SvgIcon type="mdi" :path="mdiCloseBox" class="user-icon" width="35" height="35" @click="closeModal"/>
                </div>
                <div class="modal-body" >
                    <input v-model="searchQuery" placeholder="Pesquisar...">
                    <button @click="searchPerson">Pesquisar</button>
                    <div v-if="isCustomer ">
                        <h4>Cadastro de Cliente</h4>
                        <form @submit.prevent="registerPerson">
                            <label>Nome</label>
                            <input v-model="person.name" required>
                            <label>Documento</label>
                            <input v-model="person.document" required>
                            <label>Email</label>
                            <input v-model="person.email" required>
                            <label>Telefone</label>
                            <input v-model="person.phone" >
                            <button type="submit">{{ null !== person.id && undefined !== person.document? 'Associar Cliente' : 'Cadastrar' }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount,mdiDelete, mdiCloseBox } from '@mdi/js';
import { getPerson, processSaleCustomer } from '../../../controllers/personController';
import { Person } from '../../../types'
import { useStore } from 'vuex';

export default defineComponent({
    name: 'PersonSet',
    components: {
        SvgIcon,
    },
    props: {
        customer: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const personComputed = computed(() => props.customer ? store.state.sale.customer : store.state.sale.salesman);
        const isModalOpen = ref(false);
        const searchQuery = ref<string>();
        const store = useStore();
        let person = ref<Person>({
            id:null,
            document: '',
            name: '',
            email: '',
            phone: '',
            type: props.customer ? 'customer' : 'salesman',
            store_partiner_id: '',
            store_partiner_name: ''
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        const clearPerson = () => {
            try{
                store.commit('sale/clearCustomer');
            } catch (e) {
                console.error('gattering customer error: ',e)
                store.dispatch('messageHandle/alert', {
                    message: 'cliente não encontrado!',
                    type: 'error',
                });
                person.value = {
                    id:null,
                    document: '',
                    name: '',
                    email: '',
                    phone: '',
                    type: props.customer ? 'customer' : 'salesman',
                    store_partiner_id: '',
                    store_partiner_name: ''
                }
            }
        };

        const searchPerson = async () => {
            try {
                if(undefined === searchQuery.value){
                    return
                }
                person.value = await getPerson(searchQuery.value);
            } catch (e) {
                console.error('gattering customer error: ',e)
                store.dispatch('messageHandle/alert', {
                    message: 'cliente não encontrado!',
                    type: 'error',
                });
                person.value = {
                    id:null,
                    document: '',
                    name: '',
                    email: '',
                    phone: '',
                    type: props.customer ? 'customer' : 'salesman',
                    store_partiner_id: '',
                    store_partiner_name: ''
                }
            }
        };

        const registerPerson = async () => {
            try{
                await processSaleCustomer(person.value);
                closeModal();
            }catch(e){
                console.error('falha ao processar cliente: ', e);
                store.dispatch('messageHandle/alert', {
                    message: 'não foi possível associar cliente à venda!',
                    type: 'error',
                });
            }
        };

        const modalTitle = ref(props.customer ? 'Pesquisar / Cadastrar Cliente' : 'Pesquisar Vendedor');
        const isCustomer = ref(props.customer);

        return {
            person,
            isModalOpen,
            searchQuery,
            modalTitle,
            isCustomer,
            personComputed,
            openModal,
            closeModal,
            searchPerson,
            registerPerson,
            clearPerson,
            mdiCloseBox,
            mdiDelete,
            mdiAccount,
        };
    },
});
</script>

<style scoped>
.default-icon-red {
  cursor: pointer;
  padding-left: 20px;
  color: rgb(192, 4, 4);
}

.person-set-button {
    display: flex;
    align-items: center;
    background-color: #333;
    border-radius: 16px;
    padding: 5px 10px;
    cursor: pointer;
    width: 100%;
}

.person-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.user-icon {
    margin-right: 10px;
}

.lock-icon {
    color:rgb(192, 4, 4);
    padding-left: 20px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.603);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #333;
    border-radius: 10px;
    padding: 20px;
    width: 40%;
    max-width: 600px
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.modal-body {
    margin-bottom: 10px;
    padding-right: 10px;
}

.modal input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding-top: 10px;
}

.modal button {
    padding: 8px 16px;
    cursor: pointer;
}

.modal h4 {
    margin-top: 0;
}
</style>
