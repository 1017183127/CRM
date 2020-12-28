<!-- 带有标签的cell，需要输入name，position，company，标签ftag为固定标签集，ctag为自定义标签集 -->
<template>
    <div>
    <van-cell >
        <template #title>

          <van-row type="flex" >
            <van-col class="custom-name" span="6">{{name}}</van-col>
            <van-col class="custom-company" span="6">{{company}}</van-col>
            <van-col class="custom-position" span="6">{{position}}</van-col>
          </van-row>
          <!-- 固定标签行 -->
          <van-row type="flex" gutter=10px >
            <van-col v-for="ftag in ftags" :key="ftag" span="3">
              <van-tag color="#f2826a" plain>{{ftag}}</van-tag>
            </van-col>
          </van-row>
          <!-- 自定义标签行 -->
          <van-row type="flex" >
            <van-col v-for="ctag in ctags" :key="ctag" span="6">
              <van-tag plain>{{ctag}}</van-tag>
            </van-col>
          </van-row>     
               
        </template> 
    </van-cell>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    props: {
        name: {
            type: String,
            default: "名字",
            required: true
        },
        company: {
            type: String,
            default: "公司",
            required: true
        },
        position: {
            type: String,
            default: "职位",
            required: true
        },
        ftags: {
            type: Array,
            default: function() {
                return []
            },
            required: false
        },
        ctags: {
            type: Array,
            default: function() {
                return []
            },
            required: false
        }
  },
    computed:{

    },
    methods:{

    }
}
</script>

<style scoped>
.custom-name {
    font-size: 0.5rem;
    /* font-weight: bold; */
    font-family: Microsoft YaHei 
}
.custom-company {
    font-size: 0.4rem;
    font-family: Microsoft YaHei
}
.custom-position {
    font-size: 0.3rem;
    color: grey;
    font-family: Microsoft YaHei
}
</style>