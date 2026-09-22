<template>
  <div
    class="art-card p-5 mb-5 max-sm:mb-4 overflow-hidden oms-enter oms-card-hover"
    :class="compact ? '' : 'h-128'"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header flex-wrap gap-2">
      <div class="title">
        <h4>销量排行</h4>
        <p>店铺 / 平台 / 货号</p>
      </div>
      <div class="flex flex-wrap gap-2">
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
        <ElSelect v-model="pageSize" class="!w-20" size="small">
          <ElOption :label="10" :value="10" />
          <ElOption :label="20" :value="20" />
          <ElOption :label="50" :value="50" />
        </ElSelect>
      </div>
    </div>
    <ArtTable
      class="w-full"
      :data="rows"
      size="large"
      :border="false"
      :stripe="false"
      :header-cell-style="{ background: 'transparent' }"
      @sort-change="onSortChange"
    >
      <template #default>
        <ElTableColumn label="序号" prop="rank" width="70" />
        <ElTableColumn label="店铺名称" prop="storeName" min-width="140" sortable="custom" />
        <ElTableColumn label="平台" prop="platForm" min-width="100" sortable="custom" />
        <ElTableColumn label="货号" prop="productNo" min-width="110" sortable="custom" />
        <ElTableColumn label="中文名称" prop="nameCn" min-width="120" sortable="custom" />
        <ElTableColumn label="英文名称" prop="nameEn" min-width="140" sortable="custom" />
        <ElTableColumn label="订单数" prop="orderNum" min-width="100" sortable="custom" />
      </template>
    </ArtTable>
  </div>
</template>

<script setup lang="ts">
  import type { OmsOrderRankItem } from '@/mock/oms-home'
  import type { DateRangeValue } from '../useOmsHomeData'

  defineOptions({ name: 'OmsRankingTable' })

  withDefaults(
    defineProps<{
      rows: OmsOrderRankItem[]
      compact?: boolean
      enterOffset?: number
    }>(),
    {
      compact: false,
      enterOffset: 0
    }
  )

  const emit = defineEmits<{
    sortChange: [payload: { prop?: string; order?: string | null }]
  }>()

  const dateRange = defineModel<DateRangeValue>('dateRange', { default: null })
  const pageSize = defineModel<number>('pageSize', { default: 10 })

  const disableFuture = (time: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return time.getTime() >= today.getTime()
  }

  const onSortChange = (payload: { prop?: string; order?: string | null }) => {
    emit('sortChange', payload)
  }
</script>
