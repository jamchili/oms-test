import { echarts } from '@/plugins/echarts'
import usaJson from '@/assets/maps/usa.json'

export const USA_MAP_NAME = 'USA'

/** 把阿拉斯加 / 夏威夷 / 波多黎各挪到美国本土附近，布局对齐 OMS */
const USA_SPECIAL_AREAS = {
  Alaska: {
    left: -131,
    top: 25,
    width: 15
  },
  Hawaii: {
    left: -110,
    top: 28,
    width: 5
  },
  'Puerto Rico': {
    left: -76,
    top: 26,
    width: 2
  }
}

let hasRegisteredUsaMap = false

export function registerUsaMap() {
  if (hasRegisteredUsaMap) return

  echarts.registerMap(
    USA_MAP_NAME,
    usaJson as Parameters<typeof echarts.registerMap>[1],
    USA_SPECIAL_AREAS
  )
  hasRegisteredUsaMap = true
}
