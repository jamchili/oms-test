<template>
  <div v-if="sections.includes('cutOrder') && cutOrder" class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover">
    <div class="art-card-header">
      <div class="title">
        <h4>截单节省</h4>
        <p>合并出运节约票数</p>
      </div>
    </div>
    <div class="flex-b mt-4">
      <div>
        <p class="text-2xl font-medium text-g-900">{{ cutOrder.totolOrder }}</p>
        <p class="text-xs text-g-500 mt-1">总订单</p>
      </div>
      <div>
        <p class="text-2xl font-medium text-theme">{{ cutOrder.thrift }}</p>
        <p class="text-xs text-g-500 mt-1">节省票数</p>
      </div>
    </div>
  </div>

  <div
    v-if="sections.includes('warehouse')"
    class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
    :class="fillHeight ? 'h-128' : ''"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>仓库信息</h4>
        <p>
          联系人<span class="text-theme">{{ warehouseList.length }}</span>
        </p>
      </div>
    </div>
    <div :class="fillHeight ? 'h-9/10 mt-2 overflow-hidden' : 'max-h-70 mt-2 overflow-hidden'">
      <ElScrollbar>
        <div
          class="h-17.5 leading-none border-b border-g-300 text-sm last:border-b-0 flex flex-col justify-center"
          v-for="item in warehouseList"
          :key="item.id"
        >
          <p class="text-g-800 font-medium">
            {{ item.shortName }}
            <span class="mx-2 text-g-600 font-normal">{{ item.contact }}</span>
          </p>
          <p class="text-g-500 mt-1">{{ item.contactPhone }}</p>
        </div>
      </ElScrollbar>
    </div>
  </div>

  <div
    v-if="sections.includes('warning')"
    class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
    :class="fillHeight ? 'h-128' : ''"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>库存预警</h4>
        <p>
          低库存<span class="text-danger">{{ warningList.length }}</span>
        </p>
      </div>
    </div>
    <div :class="fillHeight ? 'h-9/10 mt-2 overflow-hidden' : 'max-h-70 mt-2 overflow-hidden'">
      <ElScrollbar>
        <div
          class="h-17.5 leading-none border-b border-g-300 text-sm last:border-b-0 flex flex-col justify-center"
          v-for="item in warningList"
          :key="item.id"
        >
          <p class="text-g-800 font-medium">{{ item.productNo }}</p>
          <p class="text-g-500 mt-1">
            可用库存
            <span class="text-danger font-medium">{{ item.availableInventory }}</span>
          </p>
        </div>
      </ElScrollbar>
    </div>
  </div>

  <div
    v-if="sections.includes('notice')"
    class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
    :class="fillHeight ? 'h-128' : ''"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>公告</h4>
        <p>
          新增<span class="text-success">{{ noticeList.length }}</span>
        </p>
      </div>
    </div>
    <div :class="fillHeight ? 'h-9/10 mt-2 overflow-hidden' : 'max-h-70 mt-2 overflow-hidden'">
      <ElScrollbar>
        <div
          class="h-17.5 leading-none border-b border-g-300 text-sm last:border-b-0 flex flex-col justify-center"
          v-for="item in noticeList"
          :key="item.id"
        >
          <p class="text-g-800 font-medium truncate">{{ item.titleZh }}</p>
          <p class="text-g-500 mt-1">{{ item.createdTime }}</p>
        </div>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type {
    OmsAnnouncementItem,
    OmsInventoryWarning,
    OmsOrderCutInfo,
    OmsWarehouseContact
  } from '@/mock/oms-home'

  defineOptions({ name: 'OmsSideLists' })

  type OmsSideSection = 'cutOrder' | 'warehouse' | 'warning' | 'notice'

  withDefaults(
    defineProps<{
      sections: OmsSideSection[]
      cutOrder?: OmsOrderCutInfo | null
      warehouseList?: OmsWarehouseContact[]
      warningList?: OmsInventoryWarning[]
      noticeList?: OmsAnnouncementItem[]
      fillHeight?: boolean
      enterOffset?: number
    }>(),
    {
      cutOrder: null,
      warehouseList: () => [],
      warningList: () => [],
      noticeList: () => [],
      fillHeight: false,
      enterOffset: 0
    }
  )
</script>
