<template>
  <div
    class="art-card h-105 p-5 mb-5 max-sm:mb-4 overflow-hidden oms-enter oms-card-hover"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header flex-wrap gap-2">
      <div class="title">
        <h4>订单趋势</h4>
        <p>
          区间订单
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
    <ArtLineChart
      height="calc(100% - 56px)"
      :data="data"
      :x-axis-data="xAxisData"
      :show-area-color="true"
      :show-axis-line="false"
    />
  </div>
</template>

<script setup lang="ts">
  import type { DateRangeValue } from '../useOmsHomeData'

  defineOptions({ name: 'OmsOrderTrend' })

  const props = withDefaults(
    defineProps<{
      data: number[]
      xAxisData: string[]
      enterOffset?: number
    }>(),
    {
      enterOffset: 0
    }
  )

  const dateRange = defineModel<DateRangeValue>('dateRange', { default: null })

  const total = computed(() => props.data.reduce((sum, item) => sum + Number(item || 0), 0))

  const disableFuture = (time: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return time.getTime() >= today.getTime()
  }
</script>
