<template>
  <div>
    <div
      class="c-offcanvas"
      v-if="isOpen"
      :transition="offcanvasTransition"
      :class="[ modifierClass ]"
      :style="{ maxWidth: offcanvasMaxWidth }"
    >
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import eventBus from '../eventBus'

  export default {
    props: [
      {
        name: 'align',
        type: String,
        default: 'left'
      }, {
        name: 'width',
        type: Number,
        default: 300
      }, {
        name: 'ref',
        type: String,
        require: true
      }, {
        name: 'wrapperRef',
        type: String,
        require: true
      }, {
        name: 'modifier',
        type: [ String, Boolean ],
        default: false
      }
    ],
    data () {
      return {
        isOpen: false
      }
    },
    computed: {
      offcanvasTransition () {
        return `offcanvas-${this.align}`
      },
      modifierClass () {
        if (this.modifier) {
          return `c-offcanvas--${this.modifier}`
        }
        return ''
      },
      offcanvasMaxWidth () {
        return `${this.width}px`
      }
    },
    ready () {
      eventBus.on('toggle:offcanvas', this.onToggle)
      eventBus.on('close:offcanvas', this.onClose)
      eventBus.on('open:offcanvas', this.onOpen)
    },
    beforeDestroy () {
      eventBus.removeListener('toggle:offcanvas', this.onToggle)
      eventBus.removeListener('close:offcanvas', this.onClose)
      eventBus.removeListener('open:offcanvas', this.onOpen)
    },
    methods: {
      onToggle (offcanvasRef) {
        if (this.ref === offcanvasRef) {
          // toggle offcanvas
          if (this.isOpen) {
            eventBus.emit('close:offcanvasWrapper', this.wrapperRef)
          } else {
            eventBus.emit('open:offcanvasWrapper', {
              offcanvasWidth: this.width,
              offcanvasAlign: this.align,
              offcanvasRef: this.ref
            }, this.wrapperRef)
          }
        }
      },
      onClose (offcanvasRef) {
        if (this.ref === offcanvasRef) {
          // close offcanvas
          this.isOpen = false
        }
      },
      onOpen (offcanvasRef) {
        if (this.ref === offcanvasRef) {
          // open offcanvas
          this.isOpen = true
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~wocss-tools-bem-constructor';





  /*------------------------------------*\
    #Component
  \*------------------------------------*/

  @include component('offcanvas') {
    -webkit-overflow-scrolling: touch;
    bottom: 0;
    height: 100%;
    overflow: auto;
    position: fixed;
    top: 0;
    transition: transform 0.5s;
    width: 100%;
    z-index: 3;

    @include modifier('default') {
      background: #ffffff;
    }
  }





  /*------------------------------------*\
    #Vue CSS transitions
  \*------------------------------------*/

  .offcanvas-left {
    &-transition {
      left: 0;
      right: auto;
      transform: translate3d(0, 0, 0);
    }

    &-enter,
    &-leave {
      transform: translate3d(-100%, 0, 0);
    }
  }

  .offcanvas-right {
    &-transition {
      left: auto;
      right: 0;
      transform: translate3d(0, 0, 0);
    }

    &-enter,
    &-leave {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
