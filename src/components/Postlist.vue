<template>
  <div class="Postlist">
    <div>
      <ul>
        <li>
          <div class="topbar">
            <router-link :to='{name:"root"}'>
              <span class="active">全部</span>
            </router-link>
            <router-link to='./Good'>
              <span>精华</span>
            </router-link>
            <router-link to='./Share'>
              <span>分享</span>
            </router-link>
            <router-link to='./Ask'>
              <span>问答</span>
            </router-link>
            <span>招聘</span>
          </div>
          <div class='loading' v-if='isLoading'>
            <img src='../assets/loading.gif'/>
          </div>
        </li>
        <li v-for='post in posts'>
          <router-link :to="{
            name:'user_info',
            params:{
              name:post.author.loginname
            }
          }">
            <img :src='post.author.avatar_url'/>
          </router-link>
          <span class='allcount'>
            <span class='reply_count'>{{post.reply_count}}</span>
            /<span class='visit_count'>{{post.visit_count}}</span>
          </span>
          <span :class="[{put_good:post.good,put_top:post.top,'topiclist-tab':(post.good  != true && post.top  != true)}]">
          {{post | tabFormatter}}
          </span>
          <router-link :to='{
            name:"post_content",
            params:{
              id:post.id,
              name:post.author.loginname
            }
          }'>
            <span class='title'>{{post.title}}</span>
          </router-link>
          <span class='last_reply'>
            {{post.last_reply_at | dateFormatter}}
          </span>
        </li>
        <li>
          <pagination @handlelist='renderlist'></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from './Pagination'
export default {
  name: 'Postlist',
  data:function(){
    return{
      isLoading:false,
      posts:[],
      postpage:1
    }
  },
  components:{
    pagination
  },
  methods:{
    renderlist(value){
      this.postpage=value
      this.getdata()
    },
    getdata(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{
          page:this.postpage,
          limit:10
        }
      })
      .then((res)=>{
        this.isLoading=false
        this.posts=res.data.data
        console.log(this.posts)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  beforeMount(){
    this.isLoading=true
    this.getdata()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
    text-align: center;
    padding-top: 300px;
  }
.Postlist{
  width:80%;
  margin:0 auto;
  background:white;
}
.topbar{
  height:40px;
  background:#f5f5f5;
}
.topbar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .topbar span:hover {
    color: #9e78c0;
  }
  .topbar a:hover {
    text-decoration:none;
  }
  .topbar span.active{
    background:#80bd01;
    color:white;
    padding:5px;
    border-radius:2px;
  }
  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
    cursor:pointer;
  }
.title:hover {
    text-decoration: underline;
}
ul li:not(:first-child){
  border-top:1px solid #f0f0f0;
  padding:9px;
}
ul li:not(:first-child):hover{
  cursor:pointer;
  background:#f5f5f5;
}
ul li img{
  width:30px;
  height:30px;
  vertical-align:middle;
  border-radius:3px;
}
.allcount{
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
.reply_count{
  color:#9e78c0;
  font-size:14px;
}
.put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

</style>
