<template>
  <div>
    <!-- 个人信息导航 -->
    <van-nav-bar
      class="nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" accept=".png,.pdf,.jpg,.jpeg" @change="selectPhoto">
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="user.photo"
      />
    </van-cell>
    <!-- 昵称 -->
    <van-cell title="昵称" is-link :value="user.name" @click="isShowNickName = true"></van-cell>
    <van-cell title="性别" :value="user.gender ? '女' : '男'" is-link @click="isShowGenders = true" />
    <van-cell title="生日" :value="user.birthday || '1997-00-00'" is-link @click="isShowBirthday = true" />

    <!-- 更新头像弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateAvatar :photo="photo" v-if="isShowPhoto" :avator.sync="avator"></UpdateAvatar>
    </van-popup>
    <!-- 更新昵称弹出层 -->
    <van-popup
      v-model="isShowNickName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateNickName v-model="user.name" v-if="isShowNickName"></UpdateNickName>
    </van-popup>
    <!-- 更新性别弹出层 -->
    <van-popup
      v-model="isShowGenders"
      position="bottom"
      :style="{ height: '30%' }"
    >
    <UpdateGender v-if="isShowGenders" v-model="user.gender"></UpdateGender>
    </van-popup>
    <!-- 更新生日弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '30%' }"
    >
    <UpdateBirthday v-if="isShowBirthday" v-model="user.birthday"></UpdateBirthday>
    </van-popup>

  </div>
</template>

<script>
import UpdateAvatar from './cnps/UpdateAvatar'
import UpdateNickName from './cnps/UpdateNickName'
import UpdateGender from './cnps/UpdateGender'
import UpdateBirthday from './cnps/UpdateBirthday'
import { resolveToBase64 } from '@/utils'
import { getUserProfile } from '@/api'
import { Toast } from 'vant'
export default {
  name: 'User',
  components: { UpdateAvatar, UpdateNickName, UpdateGender, UpdateBirthday },
  data() {
    return {
      isShowPhoto: false,
      isShowNickName: false,
      isShowGenders: false,
      isShowBirthday: false,
      photo: '',
      avator: '',
      user: {}
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },
    async loadProfile() {
      try {
        const res = await getUserProfile()
        this.user = res.data.data
      } catch {
        Toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
