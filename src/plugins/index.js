import registerVant from '@/plugins/vant'
import registerFilters from '@/plugins/filters'
const plugins = (Vue) => {
  registerVant(Vue)
  registerFilters(Vue)
}
export default plugins
