<template>
  <div class="Message">
    <Nav></Nav>
    <div class="main">
      <div class="content">
        <article>
          <section>
            <h2>留言板</h2>
            <p>沟通交流，拉近你我！</p>
            <RichText></RichText>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from '../components/Nav';
  import RichText from '../components/RichText';
  export default {
    name: 'Message',
    components : {
      Nav,
      RichText,
    }
  };
</script>

<style scoped lang="scss">
  .Message{
    >.main{
      box-sizing: border-box;
      max-width: 1360px;
      padding: 70px 50px;
      margin: 0 auto;
      >.content{
        width: 100%;
        background-color: #fff;
        >article{
          section:nth-child(1){
            box-sizing: border-box;
            width: 100%;
            padding: 20px 15px;
            >h2{
              font-weight: 700;
              font-size: 2rem;
              text-align: center;
            }
            >p{
              font-size: 1.25rem;
              margin: 1rem 0;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
