<template>
  <div class="article">
    <div class='loading' v-if='isLoading'>
      <img src='../assets/loading.gif'/>
    </div>
    <div v-else>
      <div class='article_header'>
        <div class='title'>
          <span :class="{put_good:post.good,put_top:post.top,'topiclist-tab':(post.good  != true && post.top  != true)}">{{post | tabFormatter}}</span>
          {{post.title}}
        </div>
        <ul>
          <li>•发布于：{{post.create_at | dateFormatter}}</li>
          <li>• 作者：
          {{post.author.loginname}}
          </li>
          <li>• {{post.visit_count}}次浏览</li>
          <li>•来自{{post | tabFormatter}}</li>
        </ul>
        <div v-html="post.content" class="topic_content" id='content'></div>
      </div>
      <div id="reply">
      <div class="topbar">回复</div>
      <div v-for="(reply,index) in post.replies" class="replySec">
        <div class="replyUp">
          <router-link :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }">
            <img :src="reply.author.avatar_url" alt="">
          </router-link>
          <router-link :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }">
            <span>{{reply.author.loginname}}</span>
          </router-link>
          <span>
            {{index+1}}楼
          </span>
          <span v-if="reply.ups.length>0" >
          ☝ {{reply.ups.length}}
          </span>
          <span v-else>
          </span>
        </div>
        <div class='replyDown'>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data:function(){
    return {
      isLoading:false,
      post:{}
    }
  },
  methods:{
    getArticleData(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
      .then((res)=>{
        this.isLoading=false
        this.post=res.data.data
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  beforeMount(){
    this.isLoading=true
    this.getArticleData()
  },
  watch:{
    '$route'(to,from){
      this.getArticleData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/markdown-github.css');
.article{background:white;}
.put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }
  
  .article_header ul{display:flex;}
  .article_header {
    padding: 10px;
  }

  .article_header .title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .article_header ul {
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .article_header ul li {
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }
  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }
  .replyDown{
    padding-left:50px;
  }
</style>
