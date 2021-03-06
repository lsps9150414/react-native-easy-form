# react-native-easy-form
An easy to use modularized and customizable React Native form component.

## Installation
`npm i react-native-easy-form --save`

## Usage
Web version depends on material-ui, which uses react-tap-event-plugin:
https://github.com/callemall/material-ui#react-tap-event-plugin

## Available Fields
- SelectField
- SelectOption
- TimeRangeField
- DateField
- TextInputField
- Separator

### SelectField
### SelectOption
### TimeRangeField
### DateField
### TextInputField
### Separator

## Roadmap
### Data
#### v1.0
- [ ] Input validation

### Components
#### v1.0
- [x] Separator
- [x] Grid/List view for `<SelectField>`
- [x] `<DateField>`
- [x] `<TimeRangeField>`
- [x] Support custom `<SelectOption>` component (pass props from `<SelectField>` via context)

#### Future
- [ ] `<DateRangeField>`
- [ ] `<NumberRangeField>` for integer/floating point
- [ ] `<PickerField>` as native `Picker` (iOS: wrap iOS Picker/action sheet with modal)
- [ ] Support time/dateTime picking mode (`<DateField>` => `<DateTimeField>`)
- [ ] Support seconds in `<TimeRangeField>`

### Styles
#### v1.0
- [x] Set `<Separator>` color with theme
- [x] Customizable `<Separator>` style
- [ ] Set label text style with form prop `labelTextStyle`
- [ ] Set label text color with theme textColor
- [ ] Customizable label text style
- [ ] Set input text style with form prop `inputTextStyle`
- [ ] Set input text color with theme textColor
- [ ] Customizable input text style
- [x] Customizable option text style

#### Future
- [ ] Customizable `<SelectOption>` container style
- [ ] Customizable android date picker color
