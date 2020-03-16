<template>
  <main class="loginView">
    <div class="m-auto">
      <form @submit.prevent="login" class="loginform">
        <h2 class="text-dovegray">Login</h2>
        <div class="loginform__errorcard rounded h5 text-white" v-show="error">
          <i class="material-icons h4">error_outline</i>
          <span class="loginform__errorcard__message">{{ error }}</span>
          <i class="loginform__errorcard__close material-icons h4 pointer" @click="error = ''">close</i>
        </div>
        <input class="loginform__field textform h4 rounded" type="text" v-model="username" placeholder="Username">
        <input class="loginform__field textform h4 rounded" type="password" v-model="password" placeholder="Password">
        <button type="submit" class="loginform__button bg-chateaugreen rounded text-bold text-white pointer">Login</button>
      </form>
      <img src="/static/decoration.svg" draggable="false" class="deco">
    </div>
  </main>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        username: '',
        password: '',
        data: '',
        error: ''
      }
    },
    methods: {
      login(){
        if (this.username == '' && this.password == '') {
          this.error = "Isi kolom username dan password"
        }

        else if(this.username == '') {
          this.error = "Mohon isi kolom username"
        }

        else if(this.username !== '' && this.password == '') {
          this.error = "Mohon isi kolom password"
        }
        
        else{
          this.$http.post('/login', {
            username: this.username,
            password: this.password
          })
          .then(res => {
            this.$store.dispatch('login', {
              username: this.username,
              password: this.password
            })
            this.$router.push('/beranda')
            
          })
          .catch(err => this.error = err.response.data)
        }


        
        
      }
    }
  }
</script>

<style lang="scss">
  .loginView{
    background-color: $whiteLilac !important;
    box-shadow: none;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    border-radius: 0;
  }

  .loginform{
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 2;

    &__field{
      padding: .5rem 1rem;
      margin: .3rem 0;
      background: #fff;
      min-width: 200px;
    }

    &__button{
      border: none;
      margin: .3rem 0;
      padding: .5rem 1rem;
    }

    &__errorcard{
      background: #F75676;
      padding: .5rem 1rem;
      margin-bottom: .3rem;
      display: flex;

      &__message{
        margin: margin($left:.5rem);
      }

      i:nth-child(1){
        margin: margin($left:-.4rem,$right:0);
      }
      &__close{
        margin: margin($right:-.4rem);
        color: #FCBBC8;
      }

    }
  }

  .deco{
    position: absolute;
    bottom: -1px;
    left: -1px;
    width: calc(100% + 2px);
    opacity: .2;
    z-index: 1;

    &::selection{
      background: none;
    }
  }
</style>