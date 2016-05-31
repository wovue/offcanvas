# Offcanvas

The `wovue-offcanvas` module contains the offcanvas component. You can add multiples offcanvas and  offcanvas-wrapper.

Install using npm:

```sh
$ npm install --save wovue-offcanvas
```

**Note** this will only works with `webpack` build system.

## Usage

```js
import { WvOffcanvas, WvOffcanvasButton, WvOffcanvasWrapper } from 'wovue-offcanvas'

new Vue({
  components: {
    WvOffcanvas,
    WvOffcanvasButton,
    WvOffcanvasWrapper
  }
})
```

```html
<wv-offcanvas ref="menu" wrapper-ref="main" align="right" :width="300">
  <wv-offcanvas-button offcanvas-ref="menu" >Toggle menu offcanvas</wv-offcanvas-button>
  <!-- here offcanvas content -->
</wv-offcanvas>
<wv-offcanvas-wrapper ref="main">
  <wv-offcanvas-button offcanvas-ref="menu" >Toggle menu offcanvas</wv-offcanvas-button>
  <!-- here your content -->
</wv-offcanvas-wrapper>
```

### Props

#### offcanvas-wrapper

| Name | Type | Default | Description |
|------|:----:|:--------|:------------|
| ref | String | (required) | A unique identifier for the offcanvas-wrapper. |
| showOverlay | Boolean | `true` | Show the overlay or no. Click over the overlay will close the current offcanvas. |
| push | Boolean | `true` | Push content if it is true. |
| modifier | String, Boolean | `false` | Modifier class name for custom style rules. |

#### offcanvas

| Name | Type | Default | Description |
|------|:----:|:--------|:------------|
| ref | String | (required) | A unique identifier for the offcanvas. |
| wrapperRef | String | (required) | Offcanvas wrapper reference. |
| align | String | `'left'` | Offcanvas position. The support align values are `left` and `right`. |
| width | Number | `300` | Offcanvas width. |
| modifier | String, Boolean | `false` | Modifier class name for custom style rules. |

#### offcanvas-button

| Name | Type | Default | Description |
|------|:----:|:--------|:------------|
| offcanvasRef | String | (required) | Offcanvas reference. |
