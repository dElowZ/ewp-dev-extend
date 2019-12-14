# Ewp Dev Extend

This script will help the development, by making it much more easier.

The current version includes:
- Create fix position header with only plenty of code.
- Create dynamic footer position, making it appear always at the bottom of the page.

## Installation

npm install ewp-dev-extend

## Usage

```javascript
import EwpDevExtend from 'ewp-dev-extend'

// Call the script

new EwpDevExtend()

```
## Options

### Header options
Argument | Options | Description
--- | --- | ---
**enableHeader** | `true, false` | *Enables or disables the fixed header. Default is true*
**headerSelector** | `string` | *You can add custom selector. Default is 'header' tag*
**addClassAfterScrollPos** | `int` | *Specify the scroll position, where the header will get a new class. Also enables this function*
**headerScrolledClass** | `string` | *If addClassAfterScrollPos is enabled, custom class can be added. Default is header-scrolled*

### Footer options
Argument | Options | Description
--- | --- | ---
**enableFooter** | `true, false` | *Enables or disables the dynamic footer. Default is true*
**footerSelector** | `string` | *You can add custom selector here. Default is footer tag*

## License
[MIT](https://opensource.org/licenses/MIT)