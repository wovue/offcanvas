<template>
  <div
    class="c-offcanvas-wrapper"
    :class="[ modifierClass, { 'is-open' : isOpen } ]"
  >
    <div
      class="c-offcanvas-wrapper__overlay"
      @click.stop="close"
      v-if="showOverlay"
    ></div>
    <slot name="offcanvas"></slot>
    <div
      class="c-offcanvas-wrapper__content"
      :style="{ transform: contentTransform }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import eventBus from '../eventBus'

  export default {
    props: [
      {
        name: 'ref',
        type: String,
        require: true
      }, {
        name: 'showOverlay',
        type: Boolean,
        default: true
      }, {
        name: 'push',
        type: Boolean,
        default: true
      }, {
        name: 'modifier',
        type: [ String, Boolean ],
        default: false
      }
    ],
    data () {
      return {
        isOpen: false,
        offcanvasWidth: 0,
        offcanvasAlign: '',
        offcanvasRef: ''
      }
    },
    computed: {
      modifierClass () {
        if (this.modifier) {
          return `c-offcanvas-wrapper--${this.modifier}`
        }
        return ''
      },
      contentTransform () {
        if (this.isOpen && this.push) {
          if (this.offcanvasAlign === 'right') {
            return `translate3d(-${this.offcanvasWidth}px, 0, 0)`
          }
          return `translate3d(${this.offcanvasWidth}px, 0, 0)`
        }
        return ''
      }
    },
    ready () {
      eventBus.on('open:offcanvasWrapper', this.onOpen)
      eventBus.on('close:offcanvasWrapper', this.onClose)
    },
    beforeDestroy () {
      eventBus.removeListener('open:offcanvasWrapper', this.onOpen)
      eventBus.removeListener('close:offcanvasWrapper', this.onClose)
    },
    methods: {
      close () {
        this.isOpen = false

        eventBus.emit('close:offcanvas', this.offcanvasRef)
      },
      open ({ offcanvasWidth, offcanvasAlign, offcanvasRef }) {
        this.offcanvasWidth = offcanvasWidth
        this.offcanvasAlign = offcanvasAlign
        this.offcanvasRef = offcanvasRef

        this.isOpen = true

        eventBus.emit('open:offcanvas', this.offcanvasRef)
      },
      onOpen (offcanvasProps, wrapperRef) {
        if (this.ref === wrapperRef) {
          this.open(offcanvasProps)
        }
      },
      onClose (wrapperRef) {
        if (this.ref === wrapperRef) {
          this.close()
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

  @include component('offcanvas-wrapper') {
    @include element('overlay') {
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      transition: opacity .3s;
      z-index: 1;
    }

    @include element('content') {
      transition: transform 0.5s;
    }

    @include modifier('default') {
      @include modifies-element('overlay') {
        background-color: rgba(#000000, 0.5);
      }
    }

    @include state('open') {
      overflow: hidden;
    }
  }





  /*------------------------------------*\
    #Vue CSS transitions
  \*------------------------------------*/

  .offcanvas-left {
    &-transition {
      opacity: 1;
    }

    &-enter,
    &-leave {
      opacity: 0;
    }
  }
</style>
