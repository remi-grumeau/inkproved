- This very small script.
- just to talk about plugins.
- Let's start with the <b>carousel</b> plugin.

* [A carousel?]

- Yes, using the <b>CAROUSEL</b> tag.
- Just like with <b>IMAGE: image1.jpg</b> tag
#IMAGE: image1.jpg

- But providing multiple images, seperate by commas.

#CAROUSEL: image1.jpg,image2.jpg,image3.jpg,image4.jpg

- Syntax is very simple :
- <b>CAROUSEL: image1.jpg,image2.jpg,image3.jpg,image4.jpg</b>

- Not sure a carousel is something very useful but it's a good example on how a plugin of type "element" is working in <em>Inkproved</em>.

* [Ok, nice]

- Now, another plugin : <b>VFX</b>.
- This is a plugin of type "action", which means it doesn't generate a new element in the story flow, but do something.
- Here, VFX, helps you to activate visual effects.
- Since it's a very basic plugin, just for the demo, it only comes with a few options.

* [Activate grayscale] #VFX: grayscale,1

- Ok ... so now everything should be black & white.

* [Activate sepia] #VFX: sepia,1

- Sepia it is.
- Funny right?

* [Activate blur] #VFX: blur,3

- Well, activating blur is probably not the smartest thing you did...
- Want to remove it?

* [Yes please remove blur] #VFX: blur,0

- Ok.
- Last one, it's not an effect but an animation: shake.

* [Shake it baby] #VFX: shake

- If tag <b>VFX</b> value has no comma, then it sets an <em>data-vfx</em> attribute on the <b>ink__container</b> HTML element. All you need then is to create a CSS class to apply an animation for this attribute value.

- Have fun

- Bye :)

-> END
