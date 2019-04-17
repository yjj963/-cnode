<template>
  <div class="slidebar">
    <div class='summay'>
      <div class="topbar">作者</div>
    <router-link :to="{
          name:'user_info',
          params:{
            name:userinfo.loginname
          }
          }">
      <img :src="userinfo.avatar_url" alt="">
    </router-link>
    </div>
    <div class='topics'>
      <div class="topbar">作者最近主题</div>
      <ul>
      <li v-for="list in topcilimitby5">
        <router-link :to="{
        name:'post_content',
        params:{
          id:list.id,
          name:list.author.loginname
        }
        }">
        
          {{list.title}}
        </router-link>
      </li>
    </ul>
    </div>
    <div class='replies'>
      <div class="topbar">作者最近回复</div>
      <ul>
      <li v-for="list in replylimitby5">
        <router-link :to="{
        name:'post_content',
        params:{
          id:list.id,
          name:list.author.loginname
        }
        }">
          {{list.title}}
        </router-link>
      </li>
    </ul> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'slidebar',
  data:function(){
    return {
      isLoading:false,
      userinfo:{}
    }
  },
  computed:{
    topcilimitby5(){
      if(this.userinfo.recent_topics){
        return this.userinfo.recent_topics.splice(0,5)
      }
    },
    replylimitby5:function(){
      if(this.userinfo.recent_replies){
        return this.userinfo.recent_replies.splice(0,5)
      }
    }
  },
  methods:{
    getdata(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      .then((res)=>{
        this.isLoading=false
        this.userinfo=res.data.data
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  beforeMount(){
    this.getdata()
    this.isLoading=true
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.summay, .replies, .topics {
    background-color: #fff;
  }
  .slidebar {
    width: 328px;
    float: right;
    margin-top: 0;
  }
  li{
    padding: 3px 0 ;
  }
  .replies ul, .topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  .summay .topbar {
    margin-top: 0px;
  }
</style>
