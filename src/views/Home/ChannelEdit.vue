<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="mini"
        class="btn"
        @click="isEdit = !isEdit"
        style="color: red; border-color: red"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我的频道 -->
    <div class="my-pannel">
      <van-grid :column-num="4" :border="false" gutter="10">
        <van-grid-item
          v-for="(item,index) in myChannels"
          :class = "{active:item.name ==='推荐'}"
          :key="item.id"
          :text="item.name"
          @click="handleChannels(item,index)"
          :icon="isEdit && item.name !=='推荐' ? 'cross' : ''"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell> 推荐频道 </van-cell>
    <div class="recommend-pannel">
      <van-grid :column-num="4" :border="false" gutter="10">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel',item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
// 推荐频道= 所有频道-我的频道
import { AllChannelsAPI } from '@/api'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await AllChannelsAPI()
      this.allChannels = data.data.channels
    },
    handleChannels({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('remove-channel', id)
      } else {
        // 关闭弹窗 切换频道
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannelsItem) => {
        return !this.myChannels.find((myChannelsItem) =>
          myChannelsItem.id === allChannelsItem.id
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: #ff69b4;
  }
}
.channel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
