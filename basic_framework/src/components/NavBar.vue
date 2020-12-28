<!-- 组件说明 -->
<template>
  <div class>
    <van-nav-bar
      :title="title"
      :left-text="left"
      :right-text="right"
      :fixed="true"
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
//import x from ''
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "标题",
      required: false
    },
    left: {
      type: String,
      default: "返回",
      required: false
    },
    right: {
      type: String,
      default: "更多",
      required: false
    }
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onClickRight() {
      Toast("提示信息");
    }
  }
};
</script>

<style scoped>
</style>