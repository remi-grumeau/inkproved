# Inkproved
Yet another version of the [Inky editor](https://www.inklestudios.com/ink/) web export, focusing to ease creating interactive stories on the web for non-techies, yet adding plugins specifically for the web.

See [examples](https://github.com/remi-grumeau/inkproved/tree/main/examples) for more info.

*Check the [official Inkle Ink tools collection](https://github.com/inkle/ink-library/) for any other languages. For NodeJS/React lovers, you should give [Atrament Preact](https://github.com/technix/atrament-preact-ui) a look*

## Why yet another Ink javascript library?
The main goal of this library is to make it simple to integrate for non-techies or in a webpage with other elements (teaching platform, website, ...). That's why pretty much all HTML elements are prefixed with **ink__**, and Javascript object is prefixed too as **_INK**.

Also, i found it pretty hard to understand how variables & callbacks were working, so i tried to make this simplier.

Last but not least, since i'm focusing only on web export, i wanted to add web-centric plugins so you can leverage everything a web browser can do as part of your Ink story. Date & time, weather, geolocation, showing maps, interactive elements, ... so your Ink story can be more personalized, interactive & modern.

### Please, don't use it in production for now
This really is a Work In Progress for now, you'd probably better wait a few weeks/months before using this library as part of your real project...
