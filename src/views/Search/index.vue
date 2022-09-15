<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model.trim="value"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      >
      </van-search>
    </form>
    <component :is="componentName" :value="value"
      @change-keywords="onSearch"
      > </component>
  </div>
</template>

<script>
import SearchHistory from './cnps/SearchHistory.vue'
import SearchResult from './cnps/SearchResult.vue'
import SearchSuggestion from './cnps/SearchSuggestion.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Search',
  components: { SearchHistory, SearchSuggestion, SearchResult },

  data() {
    return {
      value: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.value === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      this.value = keywords
      this.isShowSearchResult = true
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  [role='button'] {
    color: #fff;
  }
}
</style>
