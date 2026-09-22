<template>
  <div class="min-h-100" v-loading="loading">
    <template v-if="customer">
      <AccountHeader variant="bar" :greeting="greeting" :customer="customer" />

      <ElRow :gutter="20">
        <ElCol :sm="24" :md="24" :lg="16">
          <ElRow :gutter="20">
            <ElCol :sm="24" :md="12" :lg="12">
              <MetricGroup
                variant="panel"
                title="出运"
                subtitle="待出运 / 预到仓 / 在途"
                :items="shipmentMetrics"
                :enter-offset="1"
              />
            </ElCol>
            <ElCol :sm="24" :md="12" :lg="12">
              <MetricGroup
                variant="panel"
                title="订单"
                subtitle="当日运营快照"
                :items="orderMetrics"
                show-date
                v-model:date="orderDate"
                :enter-offset="2"
              />
            </ElCol>
          </ElRow>

          <TodoCards variant="cards" :items="todoItems" :enter-offset="3" />

          <OrderDistribution
            v-model:date-range="distributionRange"
            :rows="distributionRows"
            :map-data="distributionMapData"
            :total="distributionTotal"
            compact
            :enter-offset="7"
          />

          <ElRow :gutter="20">
            <ElCol :sm="24" :md="24" :lg="14">
              <OrderTrend
                v-model:date-range="orderTrendRange"
                :data="trendSeries"
                :x-axis-data="trendXAxis"
                :enter-offset="8"
              />
            </ElCol>
            <ElCol :sm="24" :md="24" :lg="10">
              <DeliveryRate
                v-model:month="deliveryMonth"
                :rows="deliveryRows"
                compact
                :enter-offset="9"
              />
            </ElCol>
          </ElRow>

          <RankingTable
            v-model:date-range="rankRange"
            v-model:page-size="rankPageSize"
            :rows="rankRows"
            compact
            :enter-offset="10"
            @sort-change="handleRankSort"
          />
        </ElCol>

        <ElCol :sm="24" :md="24" :lg="8">
          <StockPanel
            compact
            :pie-data="stockPieData"
            :in-stock-qty="inStockQty"
            :on-the-way-qty="onTheWayStockQty"
            :stock-info="stockInfo"
            :table-rows="stockTableRows"
            :table-columns="stockTableColumns"
            :enter-offset="2"
          />
          <SideLists
            :sections="['cutOrder', 'warehouse', 'warning', 'notice']"
            :cut-order="orderCutInfo"
            :warehouse-list="warehouseInfoList"
            :warning-list="inventoryWarningList"
            :notice-list="announcementList"
            :enter-offset="4"
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

  defineOptions({ name: 'ConsoleTwoB' })

  const {
    loading,
    greeting,
    customer,
    shipmentMetrics,
    orderMetrics,
    orderDate,
    todoItems,
    distributionRange,
    distributionRows,
    distributionMapData,
    distributionTotal,
    orderTrendRange,
    trendSeries,
    trendXAxis,
    deliveryMonth,
    deliveryRows,
    rankRange,
    rankPageSize,
    rankRows,
    handleRankSort,
    stockPieData,
    inStockQty,
    onTheWayStockQty,
    stockInfo,
    stockTableRows,
    stockTableColumns,
    orderCutInfo,
    warehouseInfoList,
    inventoryWarningList,
    announcementList
  } = useOmsHomeData()
</script>
