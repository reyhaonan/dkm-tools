<template>
  <nav class="navigation">
    <div class="navigation__brand bg-white rounded shadow">
      <span class="navigation__brand__name text-dovegray h4">
        DKM Manage
      </span>
      <i class="navigation__brand__more material-icons text-cadetblue">more_horiz</i>
    </div>

    <div class="navigation__routes">
      <router-link to="/" class="navigation__routes__link"><i class="material-icons">home</i>Beranda</router-link>
      <router-link to="/test" class="navigation__routes__link"><i class="material-icons">folder</i>Data warga</router-link>
      <router-link to="/" class="navigation__routes__link"><i class="material-icons">collections</i>Galeri</router-link>
    </div>
  </nav>
</template>

<script>
export default {

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

      &__name{
        margin: margin($left:1rem);
      }

      &__more{
        margin: margin($right:1rem);
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
      }

      .router-link-exact-active{
        @extend .text-dovegray;
      }

      .material-icons{
        font-size: 1rem;
        margin: margin($left:1.5rem,$right:1rem);
      }
    }
  }
</style>