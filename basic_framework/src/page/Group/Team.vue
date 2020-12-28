<template>
  <div class="Leader">
      <van-nav-bar  title="团队"  left-arrow  @click-left="onClickLeft"/>
        
      <van-search
          v-model="SearchValue"
          show-action
          placeholder="请输入搜索团队"
          @search="onSearch"
          @cancel="onCancel">
      </van-search>

       <van-cell-group>
          <van-cell  v-for="item in $store.state.team.team_list" :key="item.name"  is-link @click="onClick({name:item.name,id:item.teamId})">
              <template #title>
                  <van-image :round=true style="height:1.4rem; width:1.4rem;float:left;display:inline-block;" :src="item.headPicture"/>
                  <span style='height:1.4rem;line-height:1.4rem;font-size:0.4rem'>&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</span>
              </template>
          </van-cell>
       </van-cell-group>
          
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      SearchValue:'',
    };
  },
  
  mounted(){
        this.$store.dispatch('getTeamList');
  },

    methods: {
      onClickLeft() {
       this.$router.push({  
            path: '/Leader_main',  
            query: {   
                
            }  
         })
      },

      onClick(data){
          this.$router.push({  
            path: '/Team/Team_dep',  
            query: {   
                t: data.name, 
                i: data.id,  
            }  
         })
      },


      onSearch(e) {
       
        this.SearchValue=e;
        var i;
        var isFind=false;
        var teamId;
        var name;
        var headPicture;
        for(i=0;i<this.$store.state.team.team_list_all.length;i++){
            if(this.$store.state.team.team_list_all[i].name==e){
              teamId=this.$store.state.team.team_list_all[i].teamId;
              name=this.$store.state.team.team_list_all[i].name;
              headPicture=this.$store.state.team.team_list_all[i].headPicture;
              isFind=true;
              this.$store.dispatch('getTeam',[{teamId:teamId,name:name,headPicture:headPicture}]);
              break;
            }
        }
         if(e==''){
          this.$store.dispatch('getTeamList');
          isFind=true;
        }
        if(!isFind)
          Toast('不存在该团队');
      },

      onCancel() {
        this.$store.dispatch('getTeamList');
      },
    },
}
</script>

<style>
#Leader {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}


</style>
