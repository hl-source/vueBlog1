<template>
  <div>
    <Nav></Nav>
    <div style="margin-top: 60px;">
      <div class="mainBody">
         <div class="content"><article-content></article-content></div>
        <ul class="sideNav">
          <li :class="{dropAnimation : ifDrop}"><TagsView></TagsView></li>
          <li><ListView></ListView></li>
          <li><PhotoWall></PhotoWall></li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
  import Nav from '../components/Nav';
  import TagsView from '../components/TagsView';
  import ListView from '../components/ListView';
  import PhotoWall from '../components/PhotoWall';
  import articleContent from '../components/articleContent';
  export default {
    name: 'Blog',
    data(){
      return {
        ifDrop : 0
      };
    },
    components: {
      PhotoWall,
      Nav,
      TagsView,
      ListView,
      articleContent,
    },
    methods : {
      dropAni(){
        this.ifDrop = document.documentElement.scrollTop >= 800;
      }
    },
    mounted() {
      this.dropAni();
      window.addEventListener("scroll", this.dropAni);
    },
    destroyed() {
      window.removeEventListener('scroll',this.dropAni);
    }

  };
</script>

<style scoped lang="scss">
  .mainBody {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    max-width: 1380px;
    min-width: 1046px;
    margin: 0 auto;
    padding: 0 50px;
    &::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .content {
      flex: 3;
      margin-top: 20px;
      width: 100%;
      max-width: 960px;
    }
    .sideNav {
      width: 300px;
      height: 800px;
      margin: 20px 0 0 20px;
      position: relative;
      >li {
        margin-bottom: 20px;
      }
      .dropAnimation {
        position: fixed;
        top : -300px;
        animation: dropAni .8s 1 ease-in-out forwards;
      }
      @keyframes dropAni {
        0% {
          top: -300px;
        }
        40% {
          top: 80px;
        }
        60% {
          top : 70px;
        }
        100% {
          top : 80px;
        }
      }
    }
  }
</style>
