<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { searchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
import { Toast } from 'vant'
export default {
  name: 'SearchSuggestion',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'searchSuggestion'
    }
  },
  methods: {
    searchSuggestion: debounce(async function () {
      try {
        const res = await searchSuggestionsAPI(this.value)
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          Toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.value, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match} </span>`
        )
      })
    }
  }
}
</script>

<style></style>
