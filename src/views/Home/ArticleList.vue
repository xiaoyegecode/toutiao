<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh = "getNextPageArticle">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync = "error"
        error-text = "请求失败，点击重新加载"
        finished-text="没有更多文章了~~~"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleListAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      pretimeStamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const res = await articleListAPI(this.id, +new Date())
        this.articles = res.data.data.results
        this.pretimeStamp = res.data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        const res = await articleListAPI(this.id, this.pretimeStamp)
        if (!res.data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...res.data.data.results)
        } else {
          this.articles.push(...res.data.data.results)
        }
        this.pretimeStamp = res.data.data.pre_timestamp
        console.log(res.data)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
