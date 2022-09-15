<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      @load="searchResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :title="item.title"
        v-for="item in resultsList"
        :key="item.art_id"
        @click="$router.push({
          path: '/detail',
          query: { articleId: item.art_id}
        })"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { searchResultsAPI } from '@/api'
export default {
  name: 'SearchResult',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      resultsList: [],
      finished: false,
      error: false
    }
  },
  created() {
    this.searchResults()
  },
  methods: {
    async searchResults() {
      try {
        const { data } = await searchResultsAPI(
          this.page++,
          this.perPage,
          this.value
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        this.resultsList = [...this.resultsList, ...results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-results {
    height: calc(100vh - 108px );
    overflow: auto;
  }

</style>
