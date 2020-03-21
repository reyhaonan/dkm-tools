<template>
  <nav class="navigation">
    <div class="navigation__brand bg-white rounded shadow">
      <img src="@/assets/logo.svg" class="navigation__brand__logo" draggable="false">
      <span class="navigation__brand__name text-dovegray h4">
        DKM Master
      </span>
      <a-icon type="ellipsis" class="navigation__brand__more" @mouseover.prevent="$refs.menu.open"/>
    </div>

    <div class="navigation__routes">
      <router-link to="/beranda" class="navigation__routes__link"><a-icon type="home" theme="filled"/>Beranda</router-link>
      <router-link to="/data" class="navigation__routes__link"><a-icon type="folder" theme="filled"/>Data warga</router-link>
      <router-link to="/test" class="navigation__routes__link"><a-icon type="camera" theme="filled"/>Galeri</router-link>
      <a class="navigation__routes__link pointer" @click.prevent="logout"><a-icon type="logout" />Logout</a>
    </div>

    <VueContext ref="menu">
            <li>
                <a @click.prevent="reset">
                    Reset aplikasi
                </a>
            </li>
            <li>
                <a @click.prevent="openLinks('https://github.com/reyhaonan/dkm/issues/new')">
                    Laporkan kendala
                </a>
            </li>
            <li>
                <a @click.prevent="openLinks('https://github.com/reyhaonan/dkm')">
                    Tentang
                </a>
            </li>            
    </VueContext>
  </nav>
</template>

<script>
import VueContext from '@/components/VueContext'
import {shell} from 'electron'

export default {
  components:{
    VueContext
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    openLinks(url){
      shell.openExternal(url)
    },
    reset(){
      this.$http.delete('/reset')
    }
  }
}
</script>

<style lang="scss">
  .navigation{
    display: flex;
    flex-direction: column;
    flex-basis: 222px;

    &__brand{
      height: 50px;
      display: flex;
      margin-bottom: 3rem;

      &__logo{
        margin: margin($right:0,$left:1rem);
        height: 50%;
      }

      &__name{
        margin: margin($left:1rem);
      }

      &__more{
        margin: margin($right:1rem);
        cursor: default;
      }
    }


    &__routes{
      display: flex;
      flex-direction: column;

      &__link{
        @extend .text-cadetblue, .h4;
        text-decoration: none;
        margin: .5rem 0;
        display: flex;

        &:hover{
          color: $cadetBlue;
        }
      }

      .router-link-exact-active{
        @extend .text-dovegray;

        &:hover{
          color: $doveGray
        }
      }

      .anticon{
        font-size: 1rem;
        margin: margin($left:1.5rem,$right:1rem);
        transition: none !important;
      }
    }
  }
</style>