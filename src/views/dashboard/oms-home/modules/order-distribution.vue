<template>
  <div
    class="art-card p-5 mb-5 max-sm:mb-4 overflow-hidden oms-enter oms-card-hover"
    :class="compact ? '' : 'h-128'"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header flex-wrap gap-2">
      <div class="title">
        <h4>订单分布</h4>
        <p>
          总订单
          <span class="text-theme">{{ total }}</span>
        </p>
      </div>
      <ElDatePicker
        v-model="dateRange"
        class="oms-date-picker"
        type="daterange"
        size="small"
        range-separator="→"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        :disabled-date="disableFuture"
        clearable
      />
    </div>

    <ElRow :gutter="16" class="mt-2">
      <ElCol :xs="24" :sm="24" :md="compact ? 24 : 14" :lg="compact ? 24 : 14">
        <ArtMapChart :height="compact ? '380px' : '360px'" :data="mapData" serie-name="订单量" />
      </ElCol>
      <ElCol :xs="24" :sm="24" :md="compact ? 24 : 10" :lg="compact ? 24 : 10">
        <ArtTable
          class="w-full"
          :data="rows"
          size="large"
          :border="false"
          :stripe="false"
          :header-cell-style="{ background: 'transparent' }"
        >
          <template #default>
            <ElTableColumn label="排行" prop="rank" width="70" />
            <ElTableColumn label="州" prop="state" min-width="120" />
            <ElTableColumn label="订单数" prop="orderCount" width="90" />
            <ElTableColumn label="占比" prop="rate" width="90">
              <template #default="scope">
                {{ formatPercent(scope.row.rate) }}
              </template>
            </ElTableColumn>
          </template>
        </ArtTable>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  import { formatPercent } from '@/mock/oms-home'
  import type { DateRangeValue } from '../useOmsHomeData'

  defineOptions({ name: 'OmsOrderDistribution' })

  withDefaults(
    defineProps<{
      rows: Array<{ rank: number; state: string; orderCount: number; rate: number }>
      mapData: Array<{ name: string; value: number }>
      total: number
      compact?: boolean
      enterOffset?: number
    }>(),
    {
      mapData: () => [],
      compact: false,
      enterOffset: 0
    }
  )

  const dateRange = defineModel<DateRangeValue>('dateRange', { default: null })

  const disableFuture = (time: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return time.getTime() >= today.getTime()
  }
</script>
