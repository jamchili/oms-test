<template>
  <div class="min-h-100" v-loading="loading">
    <template v-if="customer">
      <AccountHeader variant="bar" :greeting="greeting" :customer="customer" />

      <!-- 运营快照：出运 / 订单 / 截单节省 -->
      <ElRow :gutter="12" class="flex">
        <ElCol :sm="24" :md="8" :lg="8" class="flex mb-3">
          <MetricGroup
            variant="panel"
            title="出运"
            subtitle="待出运 / 预到仓 / 在途"
            :items="shipmentMetrics"
            :enter-offset="1"
          />
        </ElCol>
        <ElCol :sm="24" :md="8" :lg="8" class="flex mb-3">
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
        <ElCol :sm="24" :md="8" :lg="8" class="flex mb-3">
          <MetricGroup
            variant="panel"
            title="截单节省"
            subtitle="合并出运节约票数"
            :items="cutOrderMetrics"
            :enter-offset="3"
          />
        </ElCol>
      </ElRow>

      <!-- 风险履约：库存预警 / 妥投率 / 待办 / 公告 -->
      <ElRow :gutter="12">
        <ElCol :sm="24" :md="12" :lg="6">
          <SideLists
            :sections="['warning']"
            :warning-list="inventoryWarningList"
            compact
            :enter-offset="4"
          />
        </ElCol>
        <ElCol :sm="24" :md="12" :lg="6">
          <DeliveryRate
            v-model:month="deliveryMonth"
            :rows="deliveryRows"
            compact
            :enter-offset="5"
          />
        </ElCol>
        <ElCol :sm="24" :md="12" :lg="6">
          <TodoCards variant="list" compact :items="todoItems" :enter-offset="6" />
        </ElCol>
        <ElCol :sm="24" :md="12" :lg="6">
          <SideLists
            :sections="['notice']"
            :notice-list="announcementList"
            compact
            :enter-offset="7"
          />
        </ElCol>
      </ElRow>

      <!-- 订单分布 + 趋势 / 在库 + 仓库信息 -->
      <ElRow :gutter="12">
        <ElCol :sm="24" :md="24" :lg="16">
          <OrderTrend
            v-model:date-range="orderTrendRange"
            :data="trendSeries"
            :x-axis-data="trendXAxis"
            :enter-offset="8"
          />
          <OrderDistribution
            v-model:date-range="distributionRange"
            :rows="distributionRows"
            :map-data="distributionMapData"
            :total="distributionTotal"
            :enter-offset="10"
          />
        </ElCol>
        <ElCol :sm="24" :md="24" :lg="8">
          <StockPanel
            :pie-data="stockPieData"
            :in-stock-qty="inStockQty"
            :on-the-way-qty="onTheWayStockQty"
            :stock-info="stockInfo"
            :enter-offset="9"
          />
          <SideLists
            :sections="['warehouse']"
            :warehouse-list="warehouseInfoList"
            fill-height
            :enter-offset="11"
          />
        </ElCol>
      </ElRow>

      <!-- 订单排行 -->
      <RankingTable
        v-model:date-range="rankRange"
        v-model:page-size="rankPageSize"
        :rows="rankRows"
        :enter-offset="13"
        @sort-change="handleRankSort"
      />
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
    cutOrderMetrics,
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
    warehouseInfoList,
    inventoryWarningList,
    announcementList
  } = useOmsHomeData()
</script>
