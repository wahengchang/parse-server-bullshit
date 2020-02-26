<script>
import LeftNav from "@/components/LeftNav";

export default {
  components: {
      LeftNav
  }
};
</script>

<template>
  <div>
    <LeftNav />
    <div class="content-page">
        <div class="content">
          <div class="page-content-wrapper">
              <div class="container-fluid">
              <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>