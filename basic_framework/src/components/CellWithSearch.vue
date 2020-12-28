<template>
    <div class="test"> 
        <div class="icon">
            <van-icon class="return-icon" name="arrow-left" @click="onClickLeft"/>
        </div>

        <div class="search">
            <van-search v-model="value" placeholder="请输入人名或关键词进行搜索" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        }
    },
    props: {
        value: {
            type: String,
            default: "",
            required: false,
        },
    },
}
</script>

<style scoped>
.test {
    display: flex;
    flex-flow: row, nowrap;
    justify-content: start;
    align-items: center;
    background-color: white;
}
.icon {
    flex-grow: 0;
    margin-top: 0.25rem;
    margin-left: 0.1rem;
    
}
.search {
    flex-grow: 1;
}
</style>