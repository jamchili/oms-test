<template>
  <div
    v-if="variant === 'bar'"
    class="oms-enter oms-card-hover art-card mb-3 flex-cb flex-wrap gap-4 px-5 py-4 max-sm:mb-3"
  >
    <div class="flex items-center min-w-60">
      <div class="size-12.5 rounded-xl flex-cc bg-theme/10 mr-4">
        <ArtSvgIcon icon="ri:user-3-line" class="text-xl text-theme" />
      </div>
      <div>
        <p class="text-lg font-medium text-g-900">{{ greeting }}，{{ customer.name }}</p>
        <p class="mt-1 text-sm text-g-600">
          业务经理 {{ customer.businessManager }}
          <span class="mx-2 text-g-400">|</span>
          客服经理 {{ customer.customerManager }}
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-8">
      <div v-if="customer.accountType" class="text-right">
        <p class="text-[22px] font-medium text-g-900 leading-none">{{ customer.accountPeriod }}</p>
        <p class="mt-1.5 text-xs text-g-600">账期（天）</p>
      </div>
      <div class="text-right">
        <p
          class="text-[22px] font-medium leading-none"
          :class="isNegative ? 'text-danger' : 'text-g-900'"
        >
          {{ isNegative ? '-' : '' }}${{ Math.abs(Number(customer.balance)).toFixed(2) }}
        </p>
        <p class="mt-1.5 text-xs text-g-600">
          {{ customer.accountType ? '账户余额' : '已用额度' }}
        </p>
      </div>
      <div v-if="customer.accountType" class="text-right">
        <p class="text-[22px] font-medium text-g-900 leading-none">
          ${{ Number(customer.temporaryQuota).toLocaleString() }}
        </p>
        <p class="mt-1.5 text-xs text-g-600">临时额度</p>
      </div>
      <ElButton type="primary" @click="onRecharge">充值</ElButton>
    </div>
  </div>

  <ElRow v-else :gutter="12" class="flex">
    <ElCol v-for="(item, index) in cards" :key="item.key" :sm="12" :md="6" :lg="6">
      <div
        class="art-card relative flex flex-col justify-center h-35 px-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
        :style="{ animationDelay: `${(enterOffset + index) * 70}ms` }"
      >
        <span class="text-g-700 text-sm">{{ item.label }}</span>
        <p v-if="item.display" class="text-[22px] font-medium mt-2 text-g-900 truncate">
          {{ item.display }}
        </p>
        <ArtCountTo
          v-else
          class="text-[26px] font-medium mt-2"
          :class="item.danger ? 'oms-danger-num' : ''"
          :target="item.value"
          :duration="1300"
          :decimals="item.decimals ?? 0"
          :prefix="item.prefix ?? ''"
          :suffix="item.suffix ?? ''"
        />
        <div class="flex-c mt-1 pr-16 gap-2">
          <span class="text-xs text-g-600 truncate">{{ item.hint }}</span>
          <ElButton
            v-if="item.key === 'balance'"
            class="!p-0"
            size="small"
            type="primary"
            text
            @click="onRecharge"
          >
            充值
          </ElButton>
        </div>
        <div class="absolute top-0 bottom-0 right-5 m-auto size-12.5 rounded-xl flex-cc bg-theme/10">
          <ArtSvgIcon :icon="item.icon" class="text-xl text-theme" />
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import type { OmsCustomerInfo } from '@/mock/oms-home'
  import type { OmsAccountCardItem } from '../useOmsHomeData'

  defineOptions({ name: 'OmsAccountHeader' })

  const props = withDefaults(
    defineProps<{
      variant?: 'cards' | 'bar'
      greeting: string
      customer: OmsCustomerInfo
      cards?: OmsAccountCardItem[]
      enterOffset?: number
    }>(),
    {
      variant: 'cards',
      cards: () => [],
      enterOffset: 0
    }
  )

  const isNegative = computed(() => Number(props.customer.balance) < 0)

  const onRecharge = () => {
    ElMessage.info('当前为演示环境，充值功能未开放')
  }
</script>
