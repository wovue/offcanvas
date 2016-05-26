# Offcanvas

The `wovue-offcanvas` module contains the offcanvas component.

Install using npm:

```sh
$ npm install --save wovue-offcanvas
```

**Note** this will only works with `webpack` build system.

## Usage

```js
import { Offcanvas, OffcanvasButton, OffcanvasWrapper } from 'wovue-offcanvas'

new Vue({
  components: {
    Offcanvas,
    OffcanvasButton,
    OffcanvasWrapper
  }
})
```

```html
<offcanvas ref="menu" wrapper-ref="main" align="right" :width="300">
  <offcanvas-button ref="menu" >Toggle menu offcanvas</offcanvas-button>
  <!-- here offcanvas content -->
</offcanvas>
<offcanvas-wrapper ref="main">
  <offcanvas-button ref="menu" >Toggle menu offcanvas</offcanvas-button>
  <!-- here your content -->
</offcanvas-wrapper>
```

### Props

### offcanvas-wrapper

| Name | Type | Default | Description |
|------|:----:|:--------|:------------|
| ref | String | (required) | A unique identifier for the offcanvas-wrapper. |
| showOverlay | Boolean | true | Show the overlay or no. Click over the overlay will close the current offcanvas. |
| push | Boolean | true | Push content if it is true. |
| modifier | String, Boolean | false | Modifier class name for custom style rules. |

#### offcanvas

| Name | Type | Default | Description |
|------|:----:|:--------|:------------|
| ref | String | (required) | A unique identifier for the offcanvas. |
| wrapperRef | String | (required) | offcanvas-wrapper reference. |
| align | String | `"left"` | Offcanvas position. The support align values are `left` and `right`. |
| width | Number | `300` | Offcanvas width. |
| modifier | String, Boolean | `false` | Modifier class name for custom style rules. |

#### offcanvas-button

| Name | Type | Default | Description |
|------|:----:|:--------|:------------|
| offcanvasRef | String | (required) | offcanvas reference. |
