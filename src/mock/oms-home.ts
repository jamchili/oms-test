/**
 * OMS 首页 mock 数据
 * 字段名对齐 GetFrontPageInformation 及附属接口（含 totolOrder 等历史拼写）
 */

export interface OmsCustomerInfo {
  userID: number
  name: string
  businessManager: string
  customerManager: string
  accountManager: string
  accountType: boolean
  accountPeriod: number
  temporaryQuota: number
  balance: number
}

export interface OmsShippedDetail {
  warehouseName: string
  qty: number
}

export interface OmsTransportInfo {
  shipped: number
  prearrival: number
  ontheway: number
  shippedDetailList: OmsShippedDetail[]
}

export interface OmsOrderInfo {
  totolOrder: number
  sentOrder: number
  errorRate: number
}

export interface OmsToDoInfo {
  shipOutOfStock: number
  shipReject: number
  timeOutOrder: number
  afterSaleOrder: number
}

export interface OmsOrderTrendItem {
  dateTime: string
  totolOrder: number
}

export interface OmsProperInvestmentItem {
  month: string
  totolOrder: number
  properInvestmentOrder: number
  pIrate: number
}

export interface OmsOrderCutInfo {
  totolOrder: number
  thrift: number
}

export interface OmsStockInfo {
  totolStock: number
  cargoType: number
  totalCapacity: number
}

export interface OmsAuthorizationItem {
  shopName: string
  platform: string
  expireTime: string
}

export interface OmsStockSummaryItem {
  warehouseName: string
  productInventory: number
  productStockTransport: number
}

export interface OmsOrderDistributionItem {
  state: string
  stateZh: string
  stateEn: string
  orderCount: number
  rate: number
}

export interface OmsOrderRankItem {
  rank: number
  storeName: string
  platForm: string
  productNo: string
  nameCn: string
  nameEn: string
  orderNum: number
}

export interface OmsAnnouncementItem {
  id: number
  titleZh: string
  titleEn: string
  createdTime: string
  type: number
}

export interface OmsWarehouseContact {
  id: number
  shortName: string
  contact: string
  contactPhone: string
}

export interface OmsInventoryWarning {
  id: number
  productNo: string
  availableInventory: number
}

export interface OmsHomePayload {
  customerInfo: OmsCustomerInfo
  transportInfo: OmsTransportInfo
  orderInfo: OmsOrderInfo
  toDoInfo: OmsToDoInfo
  orderTrendInfo: OmsOrderTrendItem[]
  properInvestmentInfo: OmsProperInvestmentItem[]
  orderCutInfo: OmsOrderCutInfo
  stockInfo: OmsStockInfo
  authorizationInfo: OmsAuthorizationItem[]
  stockSummary: OmsStockSummaryItem[]
  orderDistribution: OmsOrderDistributionItem[]
  orderRankList: OmsOrderRankItem[]
  announcementList: OmsAnnouncementItem[]
  warehouseInfoList: OmsWarehouseContact[]
  inventoryWarningList: OmsInventoryWarning[]
}

const ORDER_TREND_INFO: OmsOrderTrendItem[] = [
  { dateTime: '2026-09-01', totolOrder: 486 },
  { dateTime: '2026-09-02', totolOrder: 512 },
  { dateTime: '2026-09-03', totolOrder: 498 },
  { dateTime: '2026-09-04', totolOrder: 560 },
  { dateTime: '2026-09-05', totolOrder: 610 },
  { dateTime: '2026-09-06', totolOrder: 430 },
  { dateTime: '2026-09-07', totolOrder: 455 },
  { dateTime: '2026-09-08', totolOrder: 672 },
  { dateTime: '2026-09-09', totolOrder: 701 },
  { dateTime: '2026-09-10', totolOrder: 688 },
  { dateTime: '2026-09-11', totolOrder: 734 },
  { dateTime: '2026-09-12', totolOrder: 790 },
  { dateTime: '2026-09-13', totolOrder: 520 },
  { dateTime: '2026-09-14', totolOrder: 548 },
  { dateTime: '2026-09-15', totolOrder: 812 },
  { dateTime: '2026-09-16', totolOrder: 836 },
  { dateTime: '2026-09-17', totolOrder: 798 },
  { dateTime: '2026-09-18', totolOrder: 854 },
  { dateTime: '2026-09-19', totolOrder: 641 },
  { dateTime: '2026-09-20', totolOrder: 590 }
]

export const OMS_HOME_MOCK: OmsHomePayload = {
  customerInfo: {
    userID: 1564,
    name: '深圳安美跨境',
    businessManager: '陈思远',
    customerManager: '林婉清',
    accountManager: '陈思远',
    accountType: true,
    accountPeriod: 30,
    temporaryQuota: 50000,
    balance: -1286.5
  },
  transportInfo: {
    shipped: 18,
    prearrival: 26,
    ontheway: 41,
    shippedDetailList: [
      { warehouseName: 'LAX 洛杉矶仓', qty: 8 },
      { warehouseName: 'ORD 芝加哥仓', qty: 6 },
      { warehouseName: 'EWR 纽约仓', qty: 4 }
    ]
  },
  orderInfo: {
    totolOrder: 12860,
    sentOrder: 11204,
    errorRate: 0.0236
  },
  toDoInfo: {
    shipOutOfStock: 12,
    shipReject: 3,
    timeOutOrder: 8,
    afterSaleOrder: 5
  },
  orderTrendInfo: ORDER_TREND_INFO,
  properInvestmentInfo: [
    { month: '2026-04', totolOrder: 9860, properInvestmentOrder: 9012, pIrate: 0.914 },
    { month: '2026-05', totolOrder: 10420, properInvestmentOrder: 9628, pIrate: 0.924 },
    { month: '2026-06', totolOrder: 11130, properInvestmentOrder: 10340, pIrate: 0.929 },
    { month: '2026-07', totolOrder: 11880, properInvestmentOrder: 10990, pIrate: 0.925 },
    { month: '2026-08', totolOrder: 12340, properInvestmentOrder: 11560, pIrate: 0.937 },
    { month: '2026-09', totolOrder: 12860, properInvestmentOrder: 12102, pIrate: 0.941 }
  ],
  orderCutInfo: {
    totolOrder: 2860,
    thrift: 412
  },
  stockInfo: {
    totolStock: 186420,
    cargoType: 328,
    totalCapacity: 1456.28
  },
  authorizationInfo: [
    { shopName: 'Anmei Home US', platform: 'Amazon', expireTime: '2026-09-28' },
    { shopName: 'Anmei Outdoor', platform: 'Walmart', expireTime: '2026-10-03' }
  ],
  stockSummary: [
    { warehouseName: 'LAX 洛杉矶仓', productInventory: 62480, productStockTransport: 12860 },
    { warehouseName: 'ORD 芝加哥仓', productInventory: 41230, productStockTransport: 8640 },
    { warehouseName: 'EWR 纽约仓', productInventory: 32110, productStockTransport: 9100 }
  ],
  orderDistribution: [
    { state: 'CA', stateZh: '加利福尼亚', stateEn: 'California', orderCount: 2800, rate: 0.28 },
    { state: 'TX', stateZh: '德克萨斯', stateEn: 'Texas', orderCount: 1500, rate: 0.15 },
    { state: 'FL', stateZh: '佛罗里达', stateEn: 'Florida', orderCount: 1200, rate: 0.12 },
    { state: 'NY', stateZh: '纽约', stateEn: 'New York', orderCount: 1100, rate: 0.11 },
    { state: 'WA', stateZh: '华盛顿', stateEn: 'Washington', orderCount: 800, rate: 0.08 },
    { state: 'IL', stateZh: '伊利诺伊', stateEn: 'Illinois', orderCount: 700, rate: 0.07 },
    { state: 'GA', stateZh: '乔治亚', stateEn: 'Georgia', orderCount: 600, rate: 0.06 },
    { state: 'NJ', stateZh: '新泽西', stateEn: 'New Jersey', orderCount: 500, rate: 0.05 },
    { state: 'PA', stateZh: '宾夕法尼亚', stateEn: 'Pennsylvania', orderCount: 400, rate: 0.04 },
    { state: 'OH', stateZh: '俄亥俄', stateEn: 'Ohio', orderCount: 400, rate: 0.04 }
  ],
  orderRankList: [
    {
      rank: 1,
      storeName: 'Anmei Home US',
      platForm: 'Amazon',
      productNo: 'AM-H-1024',
      nameCn: '折叠收纳凳',
      nameEn: 'Folding Storage Ottoman',
      orderNum: 1860
    },
    {
      rank: 2,
      storeName: 'Anmei Outdoor',
      platForm: 'Walmart',
      productNo: 'AM-O-3301',
      nameCn: '露营折叠椅',
      nameEn: 'Camping Folding Chair',
      orderNum: 1642
    },
    {
      rank: 3,
      storeName: 'Anmei Kitchen',
      platForm: 'Amazon',
      productNo: 'AM-K-2218',
      nameCn: '硅胶厨具套装',
      nameEn: 'Silicone Kitchen Set',
      orderNum: 1490
    },
    {
      rank: 4,
      storeName: 'Anmei Pet',
      platForm: 'Chewy',
      productNo: 'AM-P-0907',
      nameCn: '宠物航空箱',
      nameEn: 'Pet Airline Carrier',
      orderNum: 1288
    },
    {
      rank: 5,
      storeName: 'Anmei Home US',
      platForm: 'Wayfair',
      productNo: 'AM-H-0881',
      nameCn: '北欧落地灯',
      nameEn: 'Nordic Floor Lamp',
      orderNum: 1176
    },
    {
      rank: 6,
      storeName: 'Anmei Sports',
      platForm: 'Amazon',
      productNo: 'AM-S-4412',
      nameCn: '瑜伽垫套装',
      nameEn: 'Yoga Mat Kit',
      orderNum: 1094
    },
    {
      rank: 7,
      storeName: 'Anmei Baby',
      platForm: 'Target',
      productNo: 'AM-B-2105',
      nameCn: '婴儿推车挂钩',
      nameEn: 'Stroller Hook',
      orderNum: 986
    },
    {
      rank: 8,
      storeName: 'Anmei Garden',
      platForm: 'HomeDepot',
      productNo: 'AM-G-6710',
      nameCn: '园艺工具箱',
      nameEn: 'Garden Tool Box',
      orderNum: 872
    },
    {
      rank: 9,
      storeName: 'Anmei Auto',
      platForm: 'Amazon',
      productNo: 'AM-A-1550',
      nameCn: '车载收纳袋',
      nameEn: 'Car Organizer',
      orderNum: 764
    },
    {
      rank: 10,
      storeName: 'Anmei Office',
      platForm: 'Walmart',
      productNo: 'AM-F-3002',
      nameCn: '升降电脑桌',
      nameEn: 'Standing Desk',
      orderNum: 690
    },
    {
      rank: 11,
      storeName: 'Anmei Travel',
      platForm: 'Amazon',
      productNo: 'AM-T-0198',
      nameCn: '压缩旅行袋',
      nameEn: 'Compression Packing Bag',
      orderNum: 612
    },
    {
      rank: 12,
      storeName: 'Anmei Home US',
      platForm: 'Overstock',
      productNo: 'AM-H-0666',
      nameCn: '亚麻抱枕套',
      nameEn: 'Linen Cushion Cover',
      orderNum: 548
    }
  ],
  announcementList: [
    {
      id: 101,
      titleZh: '美西仓国庆旺季截单时间调整通知',
      titleEn: 'West Coast cutoff schedule for peak season',
      createdTime: '2026-09-18 10:20:00',
      type: 1
    },
    {
      id: 102,
      titleZh: '芝加哥仓周末入库预约须知',
      titleEn: 'ORD weekend inbound appointment notice',
      createdTime: '2026-09-16 15:02:00',
      type: 1
    },
    {
      id: 103,
      titleZh: 'FBA 转运附加费更新（9 月）',
      titleEn: 'FBA transshipment surcharge update (Sep)',
      createdTime: '2026-09-12 09:40:00',
      type: 1
    },
    {
      id: 104,
      titleZh: '系统将于周日 02:00-04:00 进行维护',
      titleEn: 'System maintenance on Sunday 02:00-04:00',
      createdTime: '2026-09-10 18:11:00',
      type: 1
    },
    {
      id: 105,
      titleZh: '新品上架质检照片规范',
      titleEn: 'New SKU QC photo guidelines',
      createdTime: '2026-09-06 11:05:00',
      type: 1
    },
    {
      id: 106,
      titleZh: '纽约仓临时额度申请通道开启',
      titleEn: 'EWR temporary quota application is open',
      createdTime: '2026-09-02 14:30:00',
      type: 1
    }
  ],
  warehouseInfoList: [
    { id: 1, shortName: 'LAX', contact: 'Jason Lee', contactPhone: '+1 213-555-0168' },
    { id: 2, shortName: 'ORD', contact: 'Mia Chen', contactPhone: '+1 312-555-0194' },
    { id: 3, shortName: 'EWR', contact: 'David Park', contactPhone: '+1 973-555-0112' }
  ],
  inventoryWarningList: [
    { id: 1, productNo: 'AM-H-1024', availableInventory: 18 },
    { id: 2, productNo: 'AM-O-3301', availableInventory: 9 },
    { id: 3, productNo: 'AM-K-2218', availableInventory: 24 },
    { id: 4, productNo: 'AM-P-0907', availableInventory: 6 }
  ]
}

export function getOmsHomeMock(): OmsHomePayload {
  return structuredClone(OMS_HOME_MOCK)
}

export function formatPercent(rate: number, digits = 2): string {
  return `${(Number(rate) * 100).toFixed(digits)}%`
}

export function padDate(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(date.getDate())}`
}

/** 结束日为昨天，开始日再往前 6 天，共 7 天 */
export function getLast7DaysRange(): [string, string] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(today)
  end.setDate(today.getDate() - 1)
  const start = new Date(end)
  start.setDate(end.getDate() - 6)
  return [formatDate(start), formatDate(end)]
}
