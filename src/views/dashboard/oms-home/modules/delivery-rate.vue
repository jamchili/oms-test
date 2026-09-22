<template>
  <div
    class="art-card p-5 mb-5 max-sm:mb-4 overflow-hidden oms-enter oms-card-hover"
    :class="compact ? 'h-105' : 'h-128'"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header flex-wrap gap-2">
      <div class="title">
        <h4>妥投率</h4>
        <p>按月统计准时签收</p>
      </div>
      <ElDatePicker
        v-model="month"
        class="oms-date-picker-sm"
        type="month"
        size="small"
        placeholder="选择月份"
        value-format="YYYY-MM"
        clearable
      />
    </div>
    <ArtTable
      class="w-full"
      :data="rows"
      size="large"
      :border="false"
      :stripe="false"
      :header-cell-style="{ background: 'transparent' }"
    >
      <template #default>
        <ElTableColumn label="月份" prop="month" min-width="100" />
        <ElTableColumn label="总订单" prop="totolOrder" min-width="100" />
        <ElTableColumn label="妥投订单" prop="properInvestmentOrder" min-width="110" />
        <ElTableColumn label="妥投率" prop="pIrate" min-width="110">
          <template #default="scope">
            <span class="text-theme font-medium">{{ formatPercent(scope.row.pIrate) }}</span>
          </template>
        </ElTableColumn>
      </template>
    </ArtTable>
  </div>
</template>

<script setup lang="ts">
  import { formatPercent, type OmsProperInvestmentItem } from '@/mock/oms-home'

  defineOptions({ name: 'OmsDeliveryRate' })

  withDefaults(
    defineProps<{
      rows: OmsProperInvestmentItem[]
      compact?: boolean
      enterOffset?: number
    }>(),
    {
      compact: false,
      enterOffset: 0
    }
  )

  const month = defineModel<string>('month', { default: '' })
</script>
