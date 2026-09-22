<template>
  <div
    v-if="variant === 'list'"
    class="art-card h-128 p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>待办事项</h4>
        <p>
          待处理<span class="text-danger">{{ pendingCount }}</span>
        </p>
      </div>
    </div>
    <div class="h-[calc(100%-40px)] overflow-auto">
      <ElScrollbar>
        <div
          class="flex-cb h-17.5 border-b border-g-300 text-sm last:border-b-0"
          v-for="item in items"
          :key="item.key"
        >
          <div class="flex-c">
            <span class="size-8 rounded-lg flex-cc bg-theme/10 mr-3">
              <ArtSvgIcon :icon="item.icon" class="text-base text-theme" />
            </span>
            <p class="text-sm">{{ item.label }}</p>
          </div>
          <ArtCountTo
            class="text-lg font-medium"
            :class="item.value > 0 ? 'oms-danger-num' : ''"
            :target="item.value"
            :duration="1100"
          />
        </div>
      </ElScrollbar>
    </div>
  </div>

  <ElRow v-else :gutter="12" class="flex">
    <ElCol v-for="(item, index) in items" :key="item.key" :sm="12" :md="12" :lg="6">
      <div
        class="art-card relative flex flex-col justify-center h-28 px-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
        :style="{ animationDelay: `${(enterOffset + index) * 70}ms` }"
      >
        <span class="text-g-700 text-sm">{{ item.label }}</span>
        <ArtCountTo
          class="text-[26px] font-medium mt-2"
          :class="item.value > 0 ? 'oms-danger-num' : ''"
          :target="item.value"
          :duration="1200"
        />
        <div class="absolute top-0 bottom-0 right-5 m-auto size-10 rounded-xl flex-cc bg-theme/10">
          <ArtSvgIcon :icon="item.icon" class="text-lg text-theme" />
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import type { OmsTodoItem } from '../useOmsHomeData'

  defineOptions({ name: 'OmsTodoCards' })

  const props = withDefaults(
    defineProps<{
      variant?: 'cards' | 'list'
      items: OmsTodoItem[]
      enterOffset?: number
    }>(),
    {
      variant: 'cards',
      enterOffset: 0
    }
  )

  const pendingCount = computed(() =>
    props.items.reduce((sum, item) => sum + Number(item.value || 0), 0)
  )
</script>
