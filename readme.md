# Ewp Dev Extend

This script will help the development, by making it much more easier.

The current version includes:
- Create fix position header with only plenty of code.
- Option to hide header after specified scroll position
- Option to add specified class after specific scroll position
- Create dynamic footer position, making it appear always at the bottom of the page.


## Installation

npm install ewp-dev-extend

## Usage

```javascript
import EwpDevExtend from 'ewp-dev-extend/assets/js/ewp-dev-extend-core.js'

// Call the script

new EwpDevExtend()

```
## Options

### Header options
Argument | Options | Description
--- | --- | ---
**enableHeader** | `bool` | *Enables or disables the fixed header. Default is false*
**headerSelector** | `string` | *You can add custom selector. Default is the 'header' tag*
**addClassAfterScrollPos** | `int` | *Specify the scroll position, where the header will get a new class. Also enables this function*
**headerScrolledClass** | `string` | *If addClassAfterScrollPos is enabled, custom class can be added. Default is header-scrolled*
**hideHeaderOnScroll** | `bool` | *If true, header will hide on scrolling down.*
**hideHeaderAfter** | `int` | *Specify the scroll position where the header will hide. On if 'hideHeaderOnScroll is enabled'. Default is 0*

### Footer options
Argument | Options | Description
--- | --- | ---
**enableFooter** | `bool` | *Enables or disables the dynamic footer. Default is false*
**footerSelector** | `string` | *You can add custom selector here. Default is the footer tag*

## License
[MIT](https://opensource.org/licenses/MIT)