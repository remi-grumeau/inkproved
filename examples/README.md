# Inkproved - examples

## Basic
Very raw example using the raw The Intercept story.

It just show you how to work with a very basic *Inkproved* file.

```html
<div id="ink__container">
    <div id="ink__story"></div>
</div>

<script src="ink/scripts/ink.js"></script>
<script src="ink/scripts/inkproved.js"></script>
<script src="mystory.js"></script>

<script>_INK.loadStory(storyContent,true);</script>
```



## Basic - Bottom choices
A small improvement in Inkproved: if an element **ink__choices** exists in **ink__container**, all choices will be inserted into it rather than in the story flow.

```html
<div id="ink__container">
    <div id="ink__story"></div>
    <div id="ink__choices"></div>
</div>
```



## Basic - Tester
Similar to the default Inky export, the tester script is ading a control bar on top, with buttons to restart, go back to previous story node, and a bit of styling to define each block of content easily.

```html
<head>
...
<link rel="stylesheet" href="ink/css/inkproved-tester.css">
</head>


<script src="ink/scripts/ink.js"></script>
<script src="ink/scripts/inkproved.js"></script>
<script src="ink/scripts/inkproved-tester.js"></script>
<script src="mystory.js"></script>
```



## Basic - Themes
A "choose theme" block on top right changes the theme using ```_INK.setTheme(themeName)``` function.
So make it simple, *Inkproved* always loads the theme CSS file from the folder *assets/themes/*, and the file should be named *theme-yourThemeName.css*.

```javascript
_INK.setTheme('dark');
```
loads the file **assets/themes/theme-dark.css**.




## Tags
A complete guide written in Ink on how to use **TAGS** in Ink with *Inkproved*, with an example for each tag.

It's all pretty well explained in the example story, but in a nutshell :
- new tag AUDIOLOOPSTOP
- new tag VIDEOLOOP
- new tag IFRAME
- Use external online assets using *HTTPSmy.website.com/assets/file.ext* since **Ink** bugs if you do use https://<wbr>www...

```ink
- Check this document #IFRAME: myfile.pdf

- Your text in ink before the image.
#IMAGE: HTTPSwww.icegif.com/wp-content/uploads/rickroll-icegif-1.gif
- Your text below the image
```




## Variables
Specific story, so you might check at both the Ink file and the HTML file.
Looking at the HTML file, you can see we load the story but NOT autoloading it. Then doing stuffs, then start the story.

```javascript
// set autoload to false
_INK.loadStory(storyContent,false);

let _daysName = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
let _dayName  = _daysName[new Date().getDay()];
_INK.setVariable("_day", _dayName );

_INK.start();

```

Here, Javascript ```new Date().getDay()``` generates a number from 0 to 6, O equals to sunday up to 6 equals to saturday. So we detect what day it is now on player's computer, and set it inside our **Ink** story using
```javascript
_INK.setVariable("variableNameInInk", variableValue );
```

The example comes also with 3 buttons. The first two buttons just use ```_INK.getVariable() ``` method to get this variable value in your Ink story.

```javascript
_INK.getVariable("variableNameInInk")
```

Last, we put a listener on a variable so everytime its value is modified in your **Ink** story, a function with the same name is called in Javascript.
```javascript
_INK.listenVariables(['_whereAmI']);

function _whereAmI(varName,newValue){
    alert(varName+' : '+newValue);
}
```

Note that listenVariables uses an array, so you can listen to multiple variables directly.

In short,

```javascript
_INK.listenVariables(['myVariable1','myVariable2'])
```

equals to

```javascript
_inkStory.ObserveVariable("myVariable1", (string varName, object newValue) => {
    myVariable1(newValue);
});
_inkStory.ObserveVariable("myVariable2", (string varName, object newValue) => {
    myVariable2(newValue);
});
```





## External functions
Specific story (same as Variables) so you might check at both the Ink file and the HTML file.
Looking at the HTML file, you can see we load the story but NOT autoloading it. Then we set all external functions using
```javascript
_INK.setExternals(array)
```
set a few functions in Javascript, then load the story.

Difference with Variables example is that your **Ink** story will trigger those external (to Ink) functions when called inside your **Ink** script.

It's a shortcut to the regular *BindExternalFunction* in **Ink**, but making it simplier by using the same label for both variable & callback function.

In short,

```javascript
_INK.setExternals(['myFunction1','myFunction2'])
```

equals to

```javascript
_inkStory.BindExternalFunction("myFunction1", (string name) => {
    myFunction1(name);
});
_inkStory.BindExternalFunction("myFunction2", (string name) => {
    myFunction2(name);
});
```

Then, in your **Ink** script, you can just call the function just like a regular Ink one, using ``` ~ myFunction1()```.

This function runs inside the player's web browser so it can do absolutely anything: set a CSS class to create a visual effect, trigger an API to send an email or sms, ask player's geolocation, get time, date, manipulate an inventory, get data from a database, communicate using websocket to create realtime multiplayer games, ...




## Plugins
This example goal is not to show you cool plugins, but how the plugin mechanism works with *Inkproved*.
Plugins should be located inside the *ink/plugins/* folder. Then, load you plugin using
```javascript
_INK.loadPlugin('pluginName');
```

So when loading a plugin, it loads the main plugin Javascript file called **pluginName/ink-pluginName.js**. Using ```_INK.loadPlugin('vfx');``` includes the file *ink/plugins/vfx/ink-vfx.js*.

If your plugin needs extra Javascript or CSS files to be included, load them within this script.

Then you must put you plugin object inside **_INK.plugins** using ***THE SAME NAME*** of the tag you want to use in your Ink story. For VFX, everything is in **_INK.plugins.VFX** and you can call it in your *Ink* story using ``` #VFX: shake ```.

There is two type of plugins: **element** and **action**. Both should have a ```type()``` method, returning this type as a string. An element plugin must have a ```getElement()``` method for *Inkproved* to get the content to insert in the story flow. An action plugin must have a ```setAction()``` method for *Inkproved* to trigger.

Note that *Inkproved* passes the parameter directly to ```getElement(param)``` or ```setAction(param)``` so it's up to you how you deal with it. For VFX, i choose to use comma for extra parameters. So i use ```#VFX: shake``` to apply an animation, but ```#VFX: grayscale,1``` or ```#VFX: grayscale,0``` to set the grayscale filter level.

And that's pretty much it, just open the files, it's pretty simple.


## Debugging
You will get a lot of logs in the webinspector by activating logging.
```javascript
_INK.logging = true;
```

## That's all folks
Hope you found what you were looking for, and good luck with your project.

Sky is the limit :)
