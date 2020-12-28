<template>
  <div id='Team_dep'>
    <van-nav-bar :title.sync='tit' id='nav' left-arrow  @click-left="onClickLeft"/> 
    
    <div id='nav2'>
        <span style="height:1.3rem;font-size:0.4rem;margin-left:0.5rem;line-height:1.3rem;">统计信息</span>
        <van-dropdown-menu class='menu' style="height:1.3rem">
            <van-dropdown-item v-model="opValue" :options="option1" @change="onChange" />
        </van-dropdown-menu>
    </div>


    <van-grid :border="false" :column-num="3" style="width:100%">
        <van-grid-item>
            <div class='item_top'>新增联系人</div>
            <div style='padding-top:0.3rem'>
                <span class='item_bot1' v-if="opValue=='month'">{{$store.state.team.team_add_contact_m}}</span> 
                <span class='item_bot1' v-else>{{$store.state.team.team_add_contact_y}}</span> 
                <span class='item_bot2'>人</span>
            </div>
        </van-grid-item>
        
        <van-grid-item>
            <div class='item_top'>新增拜访</div>
            <div style='padding-top:0.3rem'>
                <span class='item_bot1' v-if="opValue=='month'">{{$store.state.team.team_add_visit_m}}</span> 
                <span class='item_bot1' v-else>{{$store.state.team.team_add_visit_y}}</span> 
                <span class='item_bot2'>人</span>
            </div>
        </van-grid-item>

        <van-grid-item>
            <div class='item_top'>新增公司</div>
            <div style='padding-top:0.3rem'>
                <span class='item_bot1' v-if="opValue=='month'">{{$store.state.team.team_add_company_m}}</span>
                <span class='item_bot1' v-else>{{$store.state.team.team_add_company_y}}</span>
                <span class='item_bot2'>个</span>
            </div>
        </van-grid-item>
    </van-grid>

    <div>
        <button style="height:0.6rem;margin-left:0.3rem;margin-top:0.3rem;border:0;background:#F5F5F5;color:#2d7eff;font-size:0.4rem;">负责客户数排行</button>
    </div>

    <van-cell-group border:false style='margin-top:0.3rem'>
          <van-cell style="height:2rem;"  v-for="(item,i) in $store.state.team.team_contact_list" :key="item.name"  @click="onClick({name:item.name,staffId:item.staffId,headPicture:item.headPicture})">
              <template #title>
                    <van-image :round=true style="height:1.4rem; width:1.4rem;float:left;display:inline-block;" :src="item.headPicture"/>
                    <label style='width:1.5rem;height:1rem;display:inline-block;font-size:0.5rem;margin-top:0.5rem;margin-left:0.4rem;float:left'>{{item.name}}</label>
                    <div style='float:left;height:0.5rem;display:inline-block;margin-left:0.3rem; '>
                        <div class='lab_w'>负责<span class='lab_n'>{{item.allContactCount}}</span>个联系人</div>
                        <div class="lab_w">新增拜访记录<span class='lab_n'>{{item.newlyAddedVisitRecordCount}}</span>条</div>
                    </div>
                    <label style='width:1.5rem;height:1rem;display:inline-block;margin-top:0.5rem;float:right;font-size:0.4rem'>第<span style='font-size:0.8rem'>{{i+1}}</span>名</label>
              </template>
          </van-cell>
    </van-cell-group>

   </div>
</template>


<script>
import { NavBar } from 'vant';
import { Toast } from 'vant';
 
export default {
    name: 'Team_dep',

    data() {
        return {
            tit:"",
            name:'',
            teamId:'',
            opValue:"month",
           
            option1: [
            { text: '本月', value: 'month' },
            { text: '本年', value: 'year' },
            ],

        };
    },  

    mounted(){
        this.getParam();
        this.$store.dispatch('getDataM',this.teamId);
    },

    methods: {
        onClickLeft() {
            this.$router.push({  
            path: '/Team',  
            query: {   
            }  
         })
        },

        onClick(data){
          this.$router.push({  
            path: '/Team/Team_person',  
            query: {   
                name:data.name,
                staffId:data.staffId,
                teamId:this.teamId,
                headPicture:data.headPicture,
                dn: this.tit,
            }  
          })
        },

        onChange(value){
           if(value=='month'){
               this.$store.dispatch('getDataM',this.teamId);
           }else{
               this.$store.dispatch('getDataY',this.teamId);
           }

        },

        getParam () {
            this.tit=this.$route.query.t;
            this.name=this.$route.query.t;
            this.teamId=this.$route.query.i;
        }
    },

   
}
</script>

<style>
#Team_dep {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  position:absolute;
  width:100%;
  height:100%;
  background: #F5F5F5;
}

.line{
    width:100%;
    height:0.5px;
    background:#CFCFCF;
}


#nav2{
   margin-top:0.5rem;
   width:100%;
   height:1.3rem;
   font-size:0.4rem;
   background:white;
}

.menu{
    float:right;
    width:2rem;
}

.lab_w{
    font-size:0.4rem;
    color:#90a4c1;
}

.lab_n{
    font-size:0.5rem;
    color:black;
  
}

.item_top{
    font-size:0.4rem;
}

.item_bot1{
    font-size:0.8rem;
    line-height:0.8rem;
}
.item_bot2{
    font-size:0.4rem;
    line-height:0.8rem
}
</style>
