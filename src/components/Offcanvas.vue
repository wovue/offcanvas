<template>
  <div class="c-offcanvas"
    :class="[ modifierClass, offcanvasModifier, { 'is-open' : isOpen } ]"
    :style="{ maxWidth: offcanvasMaxWidth }">
    <div>
      <slot></slot>
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
      modifierClass () {
        if (this.modifier) {
          return `c-offcanvas--${this.modifier}`
        }
        return ''
      },
      offcanvasMaxWidth () {
        return `${this.width}px`
      },
      offcanvasTransition () {
        return `offcanvas-slide-${this.align}`
      },
      offcanvasModifier () {
        return `c-offcanvas--${this.align}`
      }
    },
    ready () {
      eventBus.on('toggle:offcanvas', (offcanvasRef) => {
        if (this.ref === offcanvasRef) {
          this.toggle()
        }
      })

      eventBus.on('close:offcanvas', (offcanvasRef) => {
        if (this.ref === offcanvasRef) {
          this.close()
        }
      })

      eventBus.on('open:offcanvas', (offcanvasRef) => {
        if (this.ref === offcanvasRef) {
          this.open()
        }
      })
    },
    methods: {
      toggle () {
        if (this.isOpen) {
          eventBus.emit('close:offcanvasWrapper', this.wrapperRef)
        } else {
          eventBus.emit('open:offcanvasWrapper', {
            offcanvasWidth: this.width,
            offcanvasAlign: this.align,
            offcanvasRef: this.ref
          }, this.wrapperRef)
        }
      },
      open () {
        this.isOpen = true
      },
      close () {
        this.isOpen = false
      }
    }
  }
</script>

<style lang="scss">
  @import '~sass-bem-constructor/dist/bem-constructor';

  @include component('offcanvas') {
    -webkit-overflow-scrolling: touch;
    bottom: 0;
    height: 100%;
    overflow: auto;
    position: fixed;
    top: 0;
    transition: transform 0.5s;
    width: 100%;
    z-index: 2;

    @include modifier('left') {
      left: 0;
      right: auto;
      transform: translate3d(-100%, 0, 0);
    }

    @include modifier('right') {
      left: auto;
      right: 0;
      transform: translate3d(100%, 0, 0);
    }

    @include state('open') {
      transform: translate3d(0, 0, 0);
    }

    @include modifier('default') {
      background: #ffffff;
    }
  }
</style>
