<!-- 美国州热力地图 -->
<template>
  <div
    ref="chartRef"
    class="relative w-full"
    :style="{ height: props.height }"
    v-loading="props.loading"
  ></div>
</template>

<script setup lang="ts">
  import type { EChartsOption } from '@/plugins/echarts'
  import { getCssVar } from '@/utils/ui'
  import { useChartOps, useChartComponent } from '@/hooks/core/useChart'
  import type { MapChartProps, MapDataItem } from '@/types/component/chart'
  import { registerUsaMap, USA_MAP_NAME } from './register-usa-map'

  defineOptions({ name: 'ArtMapChart' })

  registerUsaMap()

  const DEFAULT_USA_NAME_MAP: Record<string, string> = {
    Alabama: '阿拉巴马',
    Alaska: '阿拉斯加',
    Arizona: '亚利桑那',
    Arkansas: '阿肯色',
    California: '加利福尼亚',
    Colorado: '科罗拉多',
    Connecticut: '康涅狄格',
    Delaware: '特拉华',
    'District of Columbia': '哥伦比亚特区',
    Florida: '佛罗里达',
    Georgia: '佐治亚',
    Hawaii: '夏威夷',
    Idaho: '爱达荷',
    Illinois: '伊利诺伊',
    Indiana: '印第安纳',
    Iowa: '艾奥瓦',
    Kansas: '堪萨斯',
    Kentucky: '肯塔基',
    Louisiana: '路易斯安那',
    Maine: '缅因',
    Maryland: '马里兰',
    Massachusetts: '马萨诸塞',
    Michigan: '密歇根',
    Minnesota: '明尼苏达',
    Mississippi: '密西西比',
    Missouri: '密苏里',
    Montana: '蒙大拿',
    Nebraska: '内布拉斯加',
    Nevada: '内华达',
    'New Hampshire': '新罕布什尔',
    'New Jersey': '新泽西',
    'New Mexico': '新墨西哥',
    'New York': '纽约',
    'North Carolina': '北卡罗来纳',
    'North Dakota': '北达科他',
    Ohio: '俄亥俄',
    Oklahoma: '俄克拉荷马',
    Oregon: '俄勒冈',
    Pennsylvania: '宾夕法尼亚',
    'Puerto Rico': '波多黎各',
    'Rhode Island': '罗得岛',
    'South Carolina': '南卡罗来纳',
    'South Dakota': '南达科他',
    Tennessee: '田纳西',
    Texas: '得克萨斯',
    Utah: '犹他',
    Vermont: '佛蒙特',
    Virginia: '弗吉尼亚',
    Washington: '华盛顿',
    'West Virginia': '西弗吉尼亚',
    Wisconsin: '威斯康星',
    Wyoming: '怀俄明'
  }

  const props = withDefaults(defineProps<MapChartProps>(), {
    height: useChartOps().chartHeight,
    loading: false,
    isEmpty: false,
    colors: () => useChartOps().colors,
    data: () => [],
    mapData: () => [],
    serieName: '订单量',
    roam: true,
    showVisualMap: true,
    nameMap: () => ({}),
    selectedRegion: '',
    showLabels: false,
    showScatter: false
  })

  const getSeriesData = (): MapDataItem[] => {
    if (props.data?.length) return props.data
    return props.mapData ?? []
  }

  const getDisplayName = (name: string) => {
    return props.nameMap?.[name] || DEFAULT_USA_NAME_MAP[name] || name
  }

  const getThemeColor = (token: string) => getCssVar(token).trim()

  const { chartRef, isDark, getAnimationConfig, getTooltipStyle } = useChartComponent({
    props,
    checkEmpty: () => {
      const seriesData = getSeriesData()
      return !seriesData.length || seriesData.every((item) => Number(item.value ?? 0) === 0)
    },
    watchSources: [
      () => props.data,
      () => props.mapData,
      () => props.colors,
      () => props.nameMap,
      () => props.showVisualMap,
      () => props.showLabels,
      () => props.roam,
      () => props.serieName
    ],
    generateOptions: (): EChartsOption => {
      const seriesData = getSeriesData()
      const valueList = seriesData
        .map((item) => Number(item.value ?? 0))
        .filter((value) => Number.isFinite(value))
      const hasData = valueList.length > 0
      const minValue = hasData ? Math.min(...valueList) : 0
      const rawMaxValue = hasData ? Math.max(...valueList) : 1
      const maxValue = minValue === rawMaxValue ? rawMaxValue + 1 : rawMaxValue

      const primary = getThemeColor('--el-color-primary')
      const light1 = getThemeColor('--el-color-primary-light-1')
      const light3 = getThemeColor('--el-color-primary-light-3')
      const light5 = getThemeColor('--el-color-primary-light-5')
      const light7 = getThemeColor('--el-color-primary-light-7')
      const light8 = getThemeColor('--el-color-primary-light-8')
      const light9 = getThemeColor('--el-color-primary-light-9')

      const areaColor = isDark.value ? '#1f1f1f' : light9 || '#f5f8ff'
      const borderColor = isDark.value ? '#3a3a3a' : '#ffffff'
      const emphasisColor = isDark.value ? light5 || primary : light7 || '#c7defd'
      const visualMapColors = [light8, light5, light3, light1, primary].filter(Boolean)

      return {
        tooltip: getTooltipStyle('item', {
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: (params: { name: string; value?: number }) => {
            const displayName = getDisplayName(params.name)
            const value = Number(params.value)
            if (!Number.isFinite(value)) return displayName
            return `${displayName} / ${props.serieName}: ${value}`
          }
        }),
        visualMap:
          props.showVisualMap && hasData
            ? {
                show: true,
                left: 'left',
                min: minValue,
                max: maxValue,
                inRange: {
                  color: visualMapColors
                },
                text: ['高', '低'],
                textStyle: {
                  color: isDark.value ? '#ccc' : '#666'
                },
                calculable: true
              }
            : {
                show: false,
                min: 0,
                max: maxValue
              },
        series: [
          {
            name: props.serieName,
            type: 'map',
            map: USA_MAP_NAME,
            roam: props.roam,
            layoutCenter: ['52%', '52%'],
            layoutSize: '118%',
            data: seriesData,
            itemStyle: {
              areaColor,
              borderColor,
              borderWidth: 1
            },
            label: {
              show: props.showLabels,
              color: isDark.value ? '#ccc' : '#666',
              fontSize: 10,
              formatter: (params: { name: string }) => getDisplayName(params.name)
            },
            emphasis: {
              itemStyle: {
                areaColor: emphasisColor
              },
              label: {
                show: true,
                color: isDark.value ? '#fff' : '#333',
                formatter: (params: { name: string }) => getDisplayName(params.name)
              }
            },
            ...getAnimationConfig()
          }
        ]
      }
    }
  })
</script>
