<template>
  <div v-if="variant === 'panel'" class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover">
    <div class="art-card-header flex-wrap gap-2">
      <div class="title">
        <h4>{{ title }}</h4>
        <p v-if="subtitle">
          {{ subtitle }}
        </p>
      </div>
      <ElDatePicker
        v-if="showDate"
        v-model="date"
        class="oms-date-picker-sm"
        type="date"
        size="small"
        placeholder="选择日期"
        value-format="YYYY-MM-DD"
        :disabled-date="disableFuture"
        clearable
      />
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="flex-1 min-w-32 py-2" v-for="item in items" :key="item.key">
        <div class="flex items-center text-sm text-g-600">
          <span class="size-8 rounded-lg flex-cc bg-theme/10 mr-2">
            <ArtSvgIcon :icon="item.icon" class="text-base text-theme" />
          </span>
          {{ item.label }}
          <ElPopover v-if="item.details?.length" placement="bottom" :width="320" trigger="click">
            <ArtTable
              :data="item.details"
              size="small"
              :border="false"
              :stripe="false"
              :header-cell-style="{ background: 'transparent' }"
            >
              <template #default>
                <ElTableColumn label="仓库" prop="warehouseName" />
                <ElTableColumn label="可出运货柜" prop="qty" width="110" />
              </template>
            </ArtTable>
            <template #reference>
              <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
            </template>
          </ElPopover>
          <ElTooltip v-else-if="item.tooltip" :content="item.tooltip" placement="top">
            <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
          </ElTooltip>
        </div>
        <ArtCountTo
          class="text-[26px] font-medium mt-3 ml-10"
          :class="item.danger ? 'oms-danger-num' : ''"
          :target="item.value"
          :duration="1300"
          :decimals="item.decimals ?? 0"
          :prefix="item.prefix ?? ''"
          :suffix="item.suffix ?? ''"
        />
      </div>
    </div>
  </div>

  <ElRow v-else :gutter="12" class="flex">
    <ElCol v-for="(item, index) in items" :key="item.key" :sm="12" :md="8" :lg="4">
      <div
        class="art-card relative flex flex-col justify-center h-35 px-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
        :style="{ animationDelay: `${(enterOffset + index) * 70}ms` }"
      >
        <span class="text-g-700 text-sm flex-c">
          {{ item.label }}
          <ElPopover v-if="item.details?.length" placement="bottom" :width="320" trigger="click">
            <ArtTable
              :data="item.details"
              size="small"
              :border="false"
              :stripe="false"
              :header-cell-style="{ background: 'transparent' }"
            >
              <template #default>
                <ElTableColumn label="仓库" prop="warehouseName" />
                <ElTableColumn label="可出运货柜" prop="qty" width="110" />
              </template>
            </ArtTable>
            <template #reference>
              <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
            </template>
          </ElPopover>
          <ElTooltip v-else-if="item.tooltip" :content="item.tooltip" placement="top">
            <ArtSvgIcon icon="ri:question-line" class="ml-1 text-g-500 c-p" />
          </ElTooltip>
        </span>
        <ArtCountTo
          class="text-[26px] font-medium mt-2"
          :class="item.danger ? 'oms-danger-num' : ''"
          :target="item.value"
          :duration="1300"
          :decimals="item.decimals ?? 0"
          :prefix="item.prefix ?? ''"
          :suffix="item.suffix ?? ''"
        />
        <div
          class="absolute top-0 bottom-0 right-5 m-auto size-12.5 rounded-xl flex-cc bg-theme/10"
        >
          <ArtSvgIcon :icon="item.icon" class="text-xl text-theme" />
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import type { OmsMetricItem } from '../useOmsHomeData'

  defineOptions({ name: 'OmsMetricGroup' })

  withDefaults(
    defineProps<{
      variant?: 'cards' | 'panel'
      title?: string
      subtitle?: string
      items: OmsMetricItem[]
      showDate?: boolean
      enterOffset?: number
    }>(),
    {
      variant: 'cards',
      title: '',
      subtitle: '',
      showDate: false,
      enterOffset: 0
    }
  )

  const date = defineModel<string>('date', { default: '' })

  const disableFuture = (time: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return time.getTime() >= today.getTime()
  }
</script>
