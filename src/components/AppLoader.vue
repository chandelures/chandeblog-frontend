<template>
  <div class="text-center">
    <v-responsive
      v-if="!isLoad"
      :min-height="pageHeight"
      @mousewheel.prevent
      @touchmove.prevent
    >
      <v-overlay :value="!isLoad" opacity="0">
        <v-progress-circular indeterminate color="green darken-3" size="40">
        </v-progress-circular>
      </v-overlay>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: "AppLoader",
  props: {
    isLoad: Boolean,
  },
  computed: {
    pageHeight() {
      return document.documentElement.clientHeight;
    },
  },
};
</script>
