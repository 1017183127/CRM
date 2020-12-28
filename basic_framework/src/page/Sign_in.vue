<template>
    <div>
        
        <div>
            <!--输入ID-->
            <van-cell-group>
            <van-field v-model="ID" placeholder="请输入">
                <template #label>
                    <label style="color:#A9A9A9">ID:</label>
                </template>
            </van-field>
            </van-cell-group>
        </div>
        
        <div>
            <!--输入密码-->
            <van-cell-group>
            <van-field v-model="password" type="password" placeholder="请输入">
              <template #label>
                <label style="color:#A9A9A9">密码:</label>
              </template>
            </van-field>
            </van-cell-group>
        </div>

        <div >
            <!--登录-->
            <van-button type="primary" @click="denglu">登录</van-button>
        </div>
        
    </div>
</template>

<script>
import http from '../net/httpService';
import GLOBAL_CONFIG from '../net/api';
export default {
    name: "Sign_in",
    data() {
        return {
        }
    },
    computed:{
        ID:
        {
            get()
            {
                return this.$store.state.staffInfo.staffId
            },
            set(val)
            {
                this.$store.commit("staffInfo/shuruid",val)
            }
        },
        password:
        {
            get()
            {
                return this.$store.state.staffInfo.password
            },
            set(val)
            {
                this.$store.commit("staffInfo/shurupassword",val)
            }
        }
    },
    methods: {
        denglu()
        {
            let params={
                staffId:this.ID,
                password:this.password
            }
            http.post(GLOBAL_CONFIG.denglu, params).then((res)=>{
                if (res.retCodeMsg.status) {
                    console.log(res);
                    //commit("setistrue",res.verifyPass)
                    if(res.verifyPass)
                    {
                        this.$store.commit("staffInfo/setInfo",res.staffInfo)
                        //console.log(res);
                        if(this.$store.state.staffInfo.position=="领导")
                        {
                            this.$router.push("Leader_main")
                        }
                        else
                        {
                            this.$router.push("Staff_main")
                        }
                    }
                }
                else{
                console.log('返回json错误');
                }
            }).catch(function (err) {
                console.log('err kawaii!!!', err)
            })
            /*this.$store.dispatch("staffInfo/denglu",params).then(()=>{
                // 接口请求完成后
                console.log(this.$store.state.staffInfo.istrue);
                /*if(this.$store.state.staffInfo.istrue)
                {
                    if(this.$store.state.staffInfo.position=="领导")
                    {
                        this.$router.push("Leader_main")
                    }
                    else
                    {
                        this.$router.push("Staff_main")
                    }
                }
            })*/
        }
    }
}
</script>

<style scoped>

</style>