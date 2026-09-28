<template>
  <div
    v-if="variant === 'grid'"
    class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover flex flex-col h-full"
    :style="{ animationDelay: `${enterOffset * 70}ms` }"
  >
    <div class="art-card-header">
      <div class="title">
        <h4>待办事项</h4>
        <p>
          待处理<span class="text-danger">{{ pendingCount }}</span>
        </p>
      </div>
      <span class="text-sm text-g-500 shrink-0">处理队列</span>
    </div>
    <div class="todo-grid flex-1 min-h-0 mt-2">
      <div class="flex-cb min-w-0 px-1" v-for="item in items" :key="item.key">
        <div class="flex-c min-w-0">
          <span class="size-8 rounded-lg flex-cc bg-theme/10 mr-3 shrink-0">
            <ArtSvgIcon :icon="item.icon" class="text-base text-theme" />
          </span>
          <p class="text-sm truncate">{{ item.label }}</p>
        </div>
        <ArtCountTo
          class="font-medium ml-2 shrink-0 text-lg"
          :class="item.value > 0 ? 'oms-danger-num' : ''"
          :target="item.value"
          :duration="1100"
        />
      </div>
    </div>
  </div>

  <div
    v-else-if="variant === 'list'"
    class="art-card p-5 mb-3 max-sm:mb-3 oms-enter oms-card-hover"
    :class="compact ? 'h-80 flex flex-col' : 'h-128'"
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
    <div
      :class="compact ? 'flex-1 min-h-0 mt-1 overflow-hidden' : 'h-[calc(100%-40px)] overflow-auto'"
    >
      <ElScrollbar>
        <div
          class="flex-cb border-b border-g-300 text-sm last:border-b-0"
          :class="compact ? 'h-12.5' : 'h-17.5'"
          v-for="item in items"
          :key="item.key"
        >
          <div class="flex-c">
            <span
              class="rounded-lg flex-cc bg-theme/10 mr-3"
              :class="compact ? 'size-7' : 'size-8'"
            >
              <ArtSvgIcon :icon="item.icon" class="text-base text-theme" />
            </span>
            <p class="text-sm">{{ item.label }}</p>
          </div>
          <ArtCountTo
            class="font-medium"
            :class="[compact ? 'text-base' : 'text-lg', item.value > 0 ? 'oms-danger-num' : '']"
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
      variant?: 'cards' | 'list' | 'grid'
      items: OmsTodoItem[]
      compact?: boolean
      enterOffset?: number
    }>(),
    {
      variant: 'cards',
      compact: false,
      enterOffset: 0
    }
  )

  const pendingCount = computed(() =>
    props.items.reduce((sum, item) => sum + Number(item.value || 0), 0)
  )
</script>

<style scoped>
  .todo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
  }
</style>
