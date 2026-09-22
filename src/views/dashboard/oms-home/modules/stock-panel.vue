<template>
  <div
    class="art-card p-5 mb-5 max-sm:mb-4 overflow-hidden oms-enter oms-card-hover"
    :class="compact ? '' : 'h-105'"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>库存总览</h4>
        <p>
          货型 <span class="text-theme">{{ stockInfo?.cargoType ?? 0 }}</span>
        </p>
      </div>
    </div>

    <ArtRingChart
      :height="compact ? '240px' : '240px'"
      :data="pieData"
      :show-legend="true"
      legend-position="bottom"
      center-text="在库"
      :radius="['48%', '72%']"
    />

    <div class="flex-b mt-3 px-1">
      <div>
        <p class="text-xl font-medium text-g-900">{{ inStockQty.toLocaleString() }}</p>
        <p class="text-xs text-g-500 mt-1 flex-c">
          在库
          <ElTooltip content="各仓库可售库存合计" placement="top">
            <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
          </ElTooltip>
        </p>
      </div>
      <div>
        <p class="text-xl font-medium text-g-900">{{ onTheWayQty.toLocaleString() }}</p>
        <p class="text-xs text-g-500 mt-1 flex-c">
          在途
          <ElTooltip content="已出运尚未入仓的库存" placement="top">
            <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
          </ElTooltip>
        </p>
      </div>
      <div>
        <p class="text-xl font-medium text-g-900">
          {{ Number(stockInfo?.totalCapacity ?? 0).toFixed(2) }}
        </p>
        <p class="text-xs text-g-500 mt-1 flex-c">
          总体积
          <ElTooltip content="在库货物体积（CBM）" placement="top">
            <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
          </ElTooltip>
        </p>
      </div>
    </div>

    <ArtTable
      v-if="compact"
      class="w-full mt-3"
      :data="tableRows"
      size="small"
      :border="false"
      :stripe="false"
      :header-cell-style="{ background: 'transparent' }"
    >
      <template #default>
        <ElTableColumn
          v-for="col in tableColumns"
          :key="col.prop"
          :label="col.label"
          :prop="col.prop"
          :width="col.width"
          :min-width="col.minWidth"
        />
      </template>
    </ArtTable>
  </div>
</template>

<script setup lang="ts">
  import type { OmsStockInfo } from '@/mock/oms-home'

  defineOptions({ name: 'OmsStockPanel' })

  withDefaults(
    defineProps<{
      pieData: Array<{ name: string; value: number }>
      inStockQty: number
      onTheWayQty: number
      stockInfo?: OmsStockInfo | null
      tableRows?: Record<string, string | number>[]
      tableColumns?: Array<{ prop: string; label: string; width?: number; minWidth?: number }>
      compact?: boolean
      enterOffset?: number
    }>(),
    {
      stockInfo: null,
      tableRows: () => [],
      tableColumns: () => [],
      compact: false,
      enterOffset: 0
    }
  )
</script>
