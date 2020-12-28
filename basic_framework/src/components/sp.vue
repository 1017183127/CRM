<template>
  <div class="sp">

    <van-nav-bar title="筛选信息"  right-text="确定" @click-right="onClickRight" @click-left="onClickLeft">
      <template #left>
        <van-icon :name="icon_back"/>
      </template>
    </van-nav-bar>

    <form action="/">
      <van-search
        v-model="value"
        show-action
        label=""
        placeholder="请输入关键字"
        @search="onSearch"
      >
      <template #action>
        <div @click="onSearch"></div>
      </template>
      </van-search>
    </form>

    



  </div>

</template>

<script>
import { Toast } from 'vant';

export default {
    data () {
    return {
      value: '',
      rank1: 12,
      rank2: 26,

      icon_search: require('../assets/icon/search.png'),
      icon_back: require('../assets/icon/back.png'),

    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // Toast('返回');
    },
    onSearch(val) {
      Toast(val);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
