<template>
  <div class="title">
    <SvgIcon type="mdi" :path="mdiEqual" class="default-icon" width="20" height="20"/>
    <h3> Totais </h3>
  </div>
  <div class="sale-summary">
    <div class="summary-item">
      <SvgIcon type="mdi" :path="mdiCashMultiple" class="icon" />
      <span class="label">Valor dos Produtos:</span>
      <span class="value">{{ productsValue }}</span>
    </div>
    <div v-if="finished" class="summary-item">
      <SvgIcon type="mdi" :path="mdiCreditCard" class="icon" />
      <span class="label">Valor dos Pagamentos:</span>
      <span class="value">{{ paymentsValue }}</span>
    </div>
    <div class="summary-item">
      <SvgIcon type="mdi" :path="mdiTag" class="icon" />
      <span class="label">Valor dos Descontos:</span>
      <span class="value">{{ discountValue }}</span>
    </div>
    <div class="summary-item">
      <SvgIcon type="mdi" :path="mdiCalculator" class="icon" />
      <span class="label">Valor Total:</span>
      <span class="value">{{ totalValue }}</span>
    </div>
    <div v-if="finished" class="summary-item" :class="{'troco': change >= 0, 'falta': change < 0}">
      <SvgIcon type="mdi" :path="changeIcon" class="icon" />
      <span class="label">{{ changeLabel }}:</span>
      <span class="value">{{ Math.abs(change).toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCashMultiple, mdiCreditCard, mdiTag, mdiCalculator, mdiWallet, mdiAlertCircle, mdiEqual } from '@mdi/js';

export default defineComponent({
  name: 'SaleSummary',
  props: {
    finished: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SvgIcon,
  },
  setup() {
    const store = useStore();
    const productsValue = computed(() => store.state.sale.productsValue);
    const paymentsValue = computed(() => store.state.sale.paymentsValue);
    const discountValue = computed(() => store.state.sale.discountValue);
    const totalValue = computed(() => store.state.sale.totalValue);
    const change = computed(() => paymentsValue.value - totalValue.value);
    const changeIcon = computed(() => change.value >= 0 ? mdiWallet : mdiAlertCircle);
    const changeLabel = computed(() => change.value >= 0 ? 'Troco' : 'Falta');

    return {
      productsValue,
      paymentsValue,
      discountValue,
      totalValue,
      change,
      changeIcon,
      changeLabel,
      mdiCashMultiple,
      mdiCreditCard,
      mdiTag,
      mdiCalculator,
      mdiWallet,
      mdiAlertCircle,
      mdiEqual
    };
  },
});
</script>

<style scoped>
.sale-summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #333;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  color: #555;
}

.label {
  font-weight: bold;
  flex: 1;
}

.value {
  font-weight: bold;
  color: #fff;
}

.troco {
  color: green;
}

.falta {
  color: red;
}

.title {
  display: flex;
  align-items: center;
}

.title h3 {
  margin-left: 10px;
}

.default-icon {
  cursor: pointer;
  color: rgb(255, 255, 255);
}

</style>
