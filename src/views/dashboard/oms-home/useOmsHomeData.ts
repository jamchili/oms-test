import { computed, onMounted, reactive, ref } from 'vue'
import {
  formatPercent,
  getLast7DaysRange,
  getOmsHomeMock,
  type OmsHomePayload,
  type OmsOrderRankItem
} from '@/mock/oms-home'

export type DateRangeValue = [string, string] | null

export interface OmsMetricItem {
  key: string
  label: string
  value: number
  icon: string
  decimals?: number
  suffix?: string
  prefix?: string
  tooltip?: string
  details?: { warehouseName: string; qty: number }[]
  danger?: boolean
}

export interface OmsTodoItem {
  key: string
  label: string
  value: number
  icon: string
}

export interface OmsAccountCardItem {
  key: string
  label: string
  value: number
  display?: string
  icon: string
  decimals?: number
  prefix?: string
  suffix?: string
  danger?: boolean
  hint?: string
}

const LOAD_DELAY = 420

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function inRange(date: string, range: DateRangeValue): boolean {
  if (!range) return true
  const [start, end] = range
  if (!start || !end) return true
  return date >= start && date <= end
}

export function useOmsHomeData() {
  const loading = ref(true)
  const payload = ref<OmsHomePayload | null>(null)

  const orderDate = ref('')
  const orderTrendRange = ref<DateRangeValue>(null)
  const deliveryMonth = ref('')
  const distributionRange = ref<DateRangeValue>(null)
  const rankRange = ref<DateRangeValue>(null)
  const rankPageSize = ref(10)
  const rankSort = reactive<{ prop: string; order: 'ascending' | 'descending' | null }>({
    prop: '',
    order: null
  })

  const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour < 12) return '上午好'
    if (hour < 18) return '下午好'
    return '晚上好'
  })

  const customer = computed(() => payload.value?.customerInfo)
  const transport = computed(() => payload.value?.transportInfo)
  const orderInfo = computed(() => payload.value?.orderInfo)
  const toDoInfo = computed(() => payload.value?.toDoInfo)
  const stockInfo = computed(() => payload.value?.stockInfo)
  const orderCutInfo = computed(() => payload.value?.orderCutInfo)
  const warehouseInfoList = computed(() => payload.value?.warehouseInfoList ?? [])
  const inventoryWarningList = computed(() => payload.value?.inventoryWarningList ?? [])
  const announcementList = computed(() => payload.value?.announcementList ?? [])
  const stockSummary = computed(() => payload.value?.stockSummary ?? [])

  const isNegativeBalance = computed(() => Number(customer.value?.balance ?? 0) < 0)

  const accountCards = computed<OmsAccountCardItem[]>(() => {
    const info = customer.value
    if (!info) return []
    return [
      {
        key: 'customer',
        label: '客户',
        value: 0,
        display: info.name,
        icon: 'ri:user-3-line',
        hint: `业务 ${info.businessManager} · 客服 ${info.customerManager}`
      },
      {
        key: 'period',
        label: '账期',
        value: info.accountPeriod,
        icon: 'ri:calendar-check-line',
        suffix: ' 天',
        hint: `最晚账期 ${info.accountPeriod} 天内`
      },
      {
        key: 'balance',
        label: '账户余额',
        value: info.balance,
        icon: 'ri:wallet-3-line',
        prefix: '$',
        decimals: 2,
        danger: info.balance < 0,
        hint: info.balance < 0 ? '余额不足，请先充值' : '可用余额'
      },
      {
        key: 'quota',
        label: '临时额度',
        value: info.temporaryQuota,
        icon: 'ri:safe-2-line',
        prefix: '$',
        decimals: 0,
        hint: '可用于出运抵扣'
      }
    ]
  })

  const shipmentMetrics = computed<OmsMetricItem[]>(() => {
    const info = transport.value
    if (!info) return []
    return [
      {
        key: 'shipped',
        label: '待出运',
        value: info.shipped,
        icon: 'ri:ship-line',
        tooltip: '可出运货柜数量',
        details: info.shippedDetailList
      },
      {
        key: 'prearrival',
        label: '预到仓',
        value: info.prearrival,
        icon: 'ri:home-4-line'
      },
      {
        key: 'ontheway',
        label: '在途',
        value: info.ontheway,
        icon: 'ri:truck-line',
        tooltip: '已出运尚未到仓的货柜'
      }
    ]
  })

  const orderMetrics = computed<OmsMetricItem[]>(() => {
    const info = orderInfo.value
    if (!info) return []
    return [
      {
        key: 'totolOrder',
        label: '总订单',
        value: info.totolOrder,
        icon: 'ri:file-list-3-line'
      },
      {
        key: 'sentOrder',
        label: '已发订单',
        value: info.sentOrder,
        icon: 'ri:send-plane-line'
      },
      {
        key: 'errorRate',
        label: '异常率',
        value: Number(info.errorRate) * 100,
        icon: 'ri:error-warning-line',
        decimals: 2,
        suffix: '%',
        danger: Number(info.errorRate) > 0.02
      }
    ]
  })

  const kpiMetrics = computed(() => [...shipmentMetrics.value, ...orderMetrics.value])

  const todoItems = computed<OmsTodoItem[]>(() => {
    const info = toDoInfo.value
    if (!info) return []
    return [
      { key: 'stock', label: '缺货出运', value: info.shipOutOfStock, icon: 'ri:box-3-line' },
      { key: 'reject', label: '出运拒收', value: info.shipReject, icon: 'ri:close-circle-line' },
      { key: 'timeout', label: '超时订单', value: info.timeOutOrder, icon: 'ri:time-line' },
      {
        key: 'afterSale',
        label: '售后工单',
        value: info.afterSaleOrder,
        icon: 'ri:customer-service-2-line'
      }
    ]
  })

  const pendingTodoCount = computed(() =>
    todoItems.value.reduce((sum, item) => sum + Number(item.value || 0), 0)
  )

  const trendSource = computed(() => {
    const list = payload.value?.orderTrendInfo ?? []
    return list.filter((item) => inRange(item.dateTime, orderTrendRange.value))
  })

  const trendXAxis = computed(() => trendSource.value.map((item) => item.dateTime.slice(5)))
  const trendSeries = computed(() => trendSource.value.map((item) => item.totolOrder))

  const deliveryRows = computed(() => {
    const list = payload.value?.properInvestmentInfo ?? []
    if (!deliveryMonth.value) return list
    return list.filter((item) => item.month === deliveryMonth.value)
  })

  const distributionRows = computed(() => {
    const list = payload.value?.orderDistribution ?? []
    return list.map((item, index) => ({
      rank: index + 1,
      state: `${item.stateZh} (${item.state})`,
      orderCount: item.orderCount,
      rate: item.rate
    }))
  })

  const distributionTotal = computed(() =>
    distributionRows.value.reduce((sum, item) => sum + item.orderCount, 0)
  )

  const distributionMapData = computed(() =>
    (payload.value?.orderDistribution ?? []).map((item) => ({
      name: item.stateEn,
      value: item.orderCount
    }))
  )

  const rankRows = computed<OmsOrderRankItem[]>(() => {
    const list = [...(payload.value?.orderRankList ?? [])]
    const { prop, order } = rankSort
    if (prop && order) {
      list.sort((a, b) => {
        const left = a[prop as keyof OmsOrderRankItem]
        const right = b[prop as keyof OmsOrderRankItem]
        if (typeof left === 'number' && typeof right === 'number') {
          return order === 'ascending' ? left - right : right - left
        }
        return order === 'ascending'
          ? String(left).localeCompare(String(right), 'zh')
          : String(right).localeCompare(String(left), 'zh')
      })
    }
    return list.slice(0, rankPageSize.value)
  })

  const stockPieData = computed(() =>
    stockSummary.value.map((item) => ({
      name: item.warehouseName,
      value: item.productInventory
    }))
  )

  const inStockQty = computed(() =>
    stockSummary.value.reduce((sum, item) => sum + item.productInventory, 0)
  )

  const onTheWayStockQty = computed(() =>
    stockSummary.value.reduce((sum, item) => sum + item.productStockTransport, 0)
  )

  const stockTableRows = computed(() => {
    const inventoryRow: Record<string, string | number> = { type: '在库' }
    const transportRow: Record<string, string | number> = { type: '在途' }
    const totalRow: Record<string, string | number> = { type: '合计' }
    stockSummary.value.forEach((item) => {
      inventoryRow[item.warehouseName] = item.productInventory
      transportRow[item.warehouseName] = item.productStockTransport
      totalRow[item.warehouseName] = item.productInventory + item.productStockTransport
    })
    return [inventoryRow, transportRow, totalRow]
  })

  const stockTableColumns = computed(() => [
    { prop: 'type', label: '', width: 80 },
    ...stockSummary.value.map((item) => ({
      prop: item.warehouseName,
      label: item.warehouseName,
      minWidth: 110
    }))
  ])

  const load = async () => {
    loading.value = true
    await wait(LOAD_DELAY)
    payload.value = getOmsHomeMock()
    const last7 = getLast7DaysRange()
    distributionRange.value = last7
    rankRange.value = last7
    loading.value = false
  }

  const handleRankSort = (sortPayload: { prop?: string; order?: string | null }) => {
    rankSort.prop = sortPayload.prop ?? ''
    rankSort.order =
      sortPayload.order === 'ascending' || sortPayload.order === 'descending'
        ? sortPayload.order
        : null
  }

  onMounted(() => {
    load()
  })

  return {
    loading,
    payload,
    greeting,
    customer,
    transport,
    orderInfo,
    toDoInfo,
    stockInfo,
    orderCutInfo,
    warehouseInfoList,
    inventoryWarningList,
    announcementList,
    stockSummary,
    isNegativeBalance,
    accountCards,
    shipmentMetrics,
    orderMetrics,
    kpiMetrics,
    todoItems,
    pendingTodoCount,
    orderDate,
    orderTrendRange,
    deliveryMonth,
    distributionRange,
    rankRange,
    rankPageSize,
    trendXAxis,
    trendSeries,
    deliveryRows,
    distributionRows,
    distributionTotal,
    distributionMapData,
    rankRows,
    stockPieData,
    inStockQty,
    onTheWayStockQty,
    stockTableRows,
    stockTableColumns,
    handleRankSort,
    formatPercent
  }
}
