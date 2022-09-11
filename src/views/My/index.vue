<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{userInfo.name}}</span>
            </van-row>
          </van-col>

          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              style="height: 100%"
              align="center"
            >
              <van-button type="default" size="mini" round class="edit-btn"
                >默认按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false" style="color: white">
            <van-grid-item text="头条">
              <template #icon>
                <span>{{userInfo.art_count}}</span>
              </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>
                <span>{{ userInfo.fans_count }}</span>
              </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>
                <span>{{ userInfo.follow_count }}</span>
              </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>
                <span>{{ userInfo.like_count }}</span>
              </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        <img src="../../assets/images/mobile.png" class="mobile-img" />
        <span class="text">登录/注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button style="color: red" block v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userInfoAPI } from '@/api'
import { Dialog, Toast } from 'vant'
export default {
  name: 'profile',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },

  methods: {
    async logout() {
      await Dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出改账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const res = await userInfoAPI()
        this.userInfo = res.data.data
        console.log(res)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat;
  background-size: cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile-img {
    width: 1.76rem;
    height: 1.76rem;
  }
  .text {
    color: #fff;
    font-size: 30px;
    margin-top: 10px;
  }
}

.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
