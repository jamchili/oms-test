<template>
  <div
    v-if="sections.includes('cutOrder') && cutOrder"
    class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
    :class="cutOrderCardClass"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>截单节省</h4>
        <p>合并出运节约票数</p>
      </div>
    </div>
    <div v-if="compact" class="cut-order-grid flex-1 min-h-0 mt-2">
      <div class="flex flex-col items-center justify-center">
        <p class="text-xs text-g-500">总订单</p>
        <ArtCountTo
          class="text-2xl font-medium text-g-900 mt-2"
          :target="cutOrder.totolOrder"
          :duration="1100"
        />
      </div>
      <div class="flex flex-col items-center justify-center">
        <p class="text-xs text-g-500">节省票数</p>
        <ArtCountTo
          class="text-2xl font-medium text-theme mt-2"
          :target="cutOrder.thrift"
          :duration="1100"
        />
      </div>
    </div>
    <div v-else :class="cutOrderBodyClass">
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
    :class="cardHeightClass"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>仓库信息</h4>
        <p>
          联系人<span class="text-theme">{{ warehouseList.length }}</span>
        </p>
      </div>
    </div>
    <div :class="listAreaClass">
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
    :class="cardHeightClass"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>库存预警</h4>
        <p>
          低库存<span class="text-danger">{{ warningList.length }}</span>
        </p>
      </div>
    </div>
    <div :class="listAreaClass">
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
    :class="cardHeightClass"
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
    <div :class="listAreaClass">
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

  const props = withDefaults(
    defineProps<{
      sections: OmsSideSection[]
      cutOrder?: OmsOrderCutInfo | null
      warehouseList?: OmsWarehouseContact[]
      warningList?: OmsInventoryWarning[]
      noticeList?: OmsAnnouncementItem[]
      fillHeight?: boolean
      flexFill?: boolean
      compact?: boolean
      panel?: boolean
      enterOffset?: number
    }>(),
    {
      cutOrder: null,
      warehouseList: () => [],
      warningList: () => [],
      noticeList: () => [],
      fillHeight: false,
      flexFill: false,
      compact: false,
      panel: false,
      enterOffset: 0
    }
  )

  const cardHeightClass = computed(() => {
    if (props.compact) return 'h-80 flex flex-col'
    if (props.flexFill) return 'min-h-0 flex-1 flex flex-col !mb-0'
    if (props.fillHeight) return 'h-128 flex flex-col'
    return ''
  })

  const cutOrderCardClass = computed(() => {
    if (props.panel) return 'h-full flex flex-col'
    return cardHeightClass.value
  })

  const cutOrderBodyClass = computed(() => {
    if (props.panel) return 'flex-1 flex-b items-center mt-4'
    return 'flex-b mt-4'
  })

  const listAreaClass = computed(() => {
    if (props.compact || props.fillHeight || props.flexFill) {
      return 'flex-1 min-h-0 mt-2 overflow-hidden'
    }
    return 'max-h-70 mt-2 overflow-hidden'
  })
</script>

<style scoped>
  .cut-order-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
</style>
