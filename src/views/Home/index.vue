<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-button icon="search" size="small" round block color="#5babfb"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow=true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      >
      <ChannelEdit
        :myChannels="channelsList"
        @change-active="[(isShow=false),active = $event]"
        @remove-channel="removeChannel"
        @add-channel=" addChannel"
        ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { channelAPI, delChannelsAPI, addChannelAPI } from '@/api'
import ArticleList from './ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
import { Toast } from 'vant'
export default {
  name: 'Home',
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channelsList: [],
      isShow: false
    }
  },
  created() {
    this.initChannels()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannels() {
      if (this.isLogin) {
        // 如果登录了 应该发请求获取用户自己的频道
        this.getChannel()
      } else {
        // 没有登录
        // 本地存储里没有数据 发送请求获取默认的频道数据
        // 本地存储里有数据 用本地存储的频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channelsList = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const res = await channelAPI()
        this.channelsList = res.data.data.channels
      } catch (error) {
        if (error.response && error.response.status === 507) {
          Toast.fail('请刷新')
        } else {
          throw error
        }
      }
    },
    async removeChannel(id) {
      try {
        const newChannels = this.channelsList.filter(item => item.id !== id)
        if (this.isLogin) {
          await delChannelsAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }
        this.channelsList = newChannels
        Toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channelsList.length)
        } else {
          this.SET_MY_CHANNELS([...this.channelsList, channel])
        }
        this.channelsList.push(channel)
        Toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Toast.fail('请登录再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--block {
    width: 7.4rem;
  }
  .van-icon {
    color: #fff;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
