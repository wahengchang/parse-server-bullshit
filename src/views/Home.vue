<template>
  <!-- Banner -->
    <section id="banner">
      <div class="inner">
        <h1>Industrious</h1>
        <p>A responsive business oriented template with a video background<br />
        designed by <a href="https://templated.co/">TEMPLATED</a> and released under the Creative Commons License.</p>
        <router-link class='button primary large' to="/igfetch">Try Now</router-link>
      </div>
      <video autoplay loop muted playsinline src="images/banner.mp4"></video>
    </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
  }
}
</script>
