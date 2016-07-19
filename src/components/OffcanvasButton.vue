<template>
  <button @click.stop="toggleOffcanvas" type="button">
    <slot></slot>
  </button>
</template>

<script>
  import eventBus from '../eventBus'

  export default {
    props: [
      {
        name: 'offcanvasRef',
        type: String,
        require: true
      }
    ],
    methods: {
      toggleOffcanvas () {
        eventBus.emit('toggle:offcanvas', this.offcanvasRef)
      }
    }
  }
</script>
