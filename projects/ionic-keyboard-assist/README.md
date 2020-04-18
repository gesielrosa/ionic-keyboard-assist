# ionic-keyboard-assist

This wizard corrects the bug when the keyboard overlaps/cover the screen and does not allow it to scroll. The user cannot see what is typing in the field.
(Android 9 reported issue)

It is necessary "cordova-plugin-ionic-keyboard" plugin installed.
- https://github.com/ionic-team/cordova-plugin-ionic-keyboard

## Tested in versions:
Ionic: `@^4`

Keyboard Plugin: `cordova-plugin-ionic-keyboard@^2.2.0`

iOS: `13`

Android: `9`

## Installation

To install the library:
```
npm install ionic-keyboard-assist --save
```

Add the service to your `app.module.ts` as a provider and set `scrollPadding` and `scrollAssist` to false:
```
import { IonicKeyboardAssist } from 'ionic-keyboard-assist';

@NgModule({
  ...
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: false
  }),
  ...
  providers: [ IonicKeyboardAssist ],
  ...
})
export class AppModule { }
```

Set KeyboardResize plugin preference to false on `config.xml` (for iOS):
[Read more](https://github.com/ionic-team/cordova-plugin-ionic-keyboard#keyboardresize-for-ios-only)

```
<preference name="KeyboardResize" value="false" />
```

Then, import and inject into the `app.component.ts` constructor and start the service:
```
import { IonicKeyboardAssist } from 'ionic-keyboard-assist';

constructor(private keyboardAssist: IonicKeyboardAssist ) { 
  this.keyboardAssist.init();
}
```

## Preferences

### scrollPadding

> Boolean (true by default)

#### Possible values
- `true`: Add a `padding-bottom` to the screen the same size as the keyboard.
- `false`: Does not change the screen padding.

(Depending on the device, the `cordova-plugin-ionic-keyboard` calculates the wrong height)

### scrollAssist

> Boolean (true by default)

#### Possible values
- `true`: Position the active/focused field in the center of the screen.
- `false`: Does not give assistance to scroll.

###### Set the configs
```
...
  this.keyboardAssist.init({scrollPadding: true, scrollAssist: true});
...
or
...
  this.keyboardAssist.setOptions({scrollPadding: true, scrollAssist: true});
...
```
