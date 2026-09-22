<template>
  <div class="min-h-100" v-loading="loading">
    <template v-if="customer">
      <AccountHeader
        variant="cards"
        :greeting="greeting"
        :customer="customer"
        :cards="accountCards"
      />

      <MetricGroup variant="cards" :items="kpiMetrics" :enter-offset="4" />

      <ElRow :gutter="12">
        <ElCol :sm="24" :md="12" :lg="14">
          <OrderTrend
            v-model:date-range="orderTrendRange"
            :data="trendSeries"
            :x-axis-data="trendXAxis"
            :enter-offset="10"
          />
        </ElCol>
        <ElCol :sm="24" :md="12" :lg="10">
          <StockPanel
            :pie-data="stockPieData"
            :in-stock-qty="inStockQty"
            :on-the-way-qty="onTheWayStockQty"
            :stock-info="stockInfo"
            :enter-offset="11"
          />
        </ElCol>
      </ElRow>

      <ElRow :gutter="12">
        <ElCol :sm="24" :md="24" :lg="12">
          <OrderDistribution
            v-model:date-range="distributionRange"
            :rows="distributionRows"
            :map-data="distributionMapData"
            :total="distributionTotal"
            :enter-offset="12"
          />
        </ElCol>
        <ElCol :sm="24" :md="12" :lg="6">
          <TodoCards variant="list" :items="todoItems" :enter-offset="13" />
        </ElCol>
        <ElCol :sm="24" :md="12" :lg="6">
          <SideLists
            :sections="['notice']"
            :notice-list="announcementList"
            fill-height
            :enter-offset="14"
          />
        </ElCol>
      </ElRow>

      <ElRow :gutter="12">
        <ElCol :sm="24" :md="24" :lg="12">
          <DeliveryRate
            v-model:month="deliveryMonth"
            :rows="deliveryRows"
            :enter-offset="15"
          />
        </ElCol>
        <ElCol :sm="24" :md="24" :lg="12">
          <RankingTable
            v-model:date-range="rankRange"
            v-model:page-size="rankPageSize"
            :rows="rankRows"
            :enter-offset="16"
            @sort-change="handleRankSort"
          />
        </ElCol>
      </ElRow>
    </template>
  </div>
</template>

<script setup lang="ts">
  import '../oms-home/oms-home.scss'
  import AccountHeader from '../oms-home/modules/account-header.vue'
  import MetricGroup from '../oms-home/modules/metric-group.vue'
  import TodoCards from '../oms-home/modules/todo-cards.vue'
  import OrderTrend from '../oms-home/modules/order-trend.vue'
  import DeliveryRate from '../oms-home/modules/delivery-rate.vue'
  import OrderDistribution from '../oms-home/modules/order-distribution.vue'
  import RankingTable from '../oms-home/modules/ranking-table.vue'
  import StockPanel from '../oms-home/modules/stock-panel.vue'
  import SideLists from '../oms-home/modules/side-lists.vue'
  import { useOmsHomeData } from '../oms-home/useOmsHomeData'

  defineOptions({ name: 'ConsoleTwo' })

  const {
    loading,
    greeting,
    customer,
    accountCards,
    kpiMetrics,
    todoItems,
    orderTrendRange,
    trendSeries,
    trendXAxis,
    stockPieData,
    inStockQty,
    onTheWayStockQty,
    stockInfo,
    distributionRange,
    distributionRows,
    distributionMapData,
    distributionTotal,
    announcementList,
    deliveryMonth,
    deliveryRows,
    rankRange,
    rankPageSize,
    rankRows,
    handleRankSort
  } = useOmsHomeData()
</script>
