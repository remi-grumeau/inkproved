Let's make a tour of all TAGS included by default with Inkproved.
Most are also available with standard Ink library, some are exclusive to Inkproved.

 * Yes, let's go ! #CLASS: me

- So first, a TAG is something you can add in your Ink script that does not show, but is parsed by Ink when rendering each line.
- It's a hash, followed by its label, separate from its value by :

* Please explain me a bit more #CLASS: me
    -> LIST_OF_TAGS
    
* Just test them #CLASS: me
    -> TEST_TAGS
    

=== LIST_OF_TAGS
- There is a few TAGS by default in Ink as the followings:
  > IMAGE
  > AUDIO
  > AUDIOLOOP
  > VIDEO
  > VIDEOLOOP
  > LINK
  > LINKOPEN
  > BACKGROUND
  > CLASS
  > CLEAR
  > RESTART

- Their names are pretty self explaining.
- They all need a value which you set as <b>IMAGE: image.jpg</b> or <b>LINKOPEN: pages/page1.html</b>.
- Except <b>CLEAR</b> and <b>RESTART</b>, which doesn't need any value.
- As an example, all answers in this script have a TAG <b>CLASS: me</b> TAG right after its text so a CSS class is defined as <b>"me"</b> to put them on the right with a specified color.

* OK #CLASS: me

- Specifically to Inkproved, all assets must be in a <em>assets</em> folder next to your <em>index.html</em> file.
- <b>AUDIO: mysound1.mp3</b> and <b>AUDIOLOOP: mysound1.mp3</b> loads the file as <em>assets/audio/mysound1.mp3</em>.
- <b>IMAGE: myimage.jpg</b> loads the file as <em>assets/images/myimage.jpg</em>.
- <b>LINK: mydocument.html</b> and <b>LINKOPEN: mydocument.html</b> loads the file as <em>assets/documents/mydocument.html</em>.
- <b>BACKGROUND: mybackground.jpg</b> loads the file as <em>assets/backgrounds/mybackground.jpg</em> as a background on the "ink__container" HTML element.
- <b>CLEAR</b> reverts to the previous step.
- <b>RESTART</b> restarts the full story from the beginning.

- Of course, you can add subfolders if you want, like <b>IMAGE: <u>dungeon/</u>path1.jpg</b>.

* OK #CLASS: me

- Inkproved comes with some new <b>TAGS</b> to help you add web/interactive content to your story.
    > <b>AUDIOLOOPSTOP</b> stops the last audio loop added.
    > <b>VIDEO: myvideo.mp4</b> and <b>VIDEOLOOP: myvideo.mp4</b> loads the file as <em>assets/videos/myvideo.mp4</em>.
    > <b>IFRAME: mydocument.html</b> loads the document <em>assets/documents/mydocument.html</em> inside a frame block.

- For all images, audio, video, background but also links & iframes, you can use external https url. Just replace <b>https:/\/\</b> by <b>HTTPS</b> (ex: HTTPSwww.youtube.com/video/...).

- Also, Inkproved comes with a plugin mechanism, so depending on the plugin you add to your project some new <b>TAGS</b> might be available. (see each plugin documentation to know more).

* OK let's test each TAG #CLASS: me
    -> TEST_TAGS

* I'm good, thanks #CLASS: me
    -> FINISH



=== TEST_TAGS
- First, the very storying related <b>TAGS</b>.
- Using <b>CLEAR</b>, you empty everything within the story container.

* Really? #CLASS: me

#CLEAR
- Yep... <b>CLEAR</b> really clears everything.
- It clears what has been generated, but not variables state, progression in the story flow neither stop playing sounds. You just "jump" to another page, not cleaning & restarting everything.
- It you really want to restart from the beginning (player is dead, die & retry gameplay, ...) you can use the <b>RESTART</b> tag.

* Ok #CLASS: me

- You can switch to another document/webapge using the <b>LINK</b> tag.
- Assuming you split your Ink story in different chapters, you could navigate to <em>/chapter2.html</em> using <b>LINK: chapter2.html</b>.

* Ok #CLASS: me

- To open another document/webpage in a new window/tab outside your Ink story, you can rather use the <b>LINKOPEN</b> tag.
#LINKOPEN: HTTPSwww.inklestudios.com/
- The inkstudioes.com website probably just did open.

* Ok #CLASS: me

- Good !
- Now, images.
#IMAGE: image1.jpg
- This image is loaded from the local <em>assets/images/</em> folder. It has probably loaded within a few milliseconds.

* Yeap #CLASS: me

#IMAGE: HTTPSimages.unsplash.com/photo-1715937527911-14a019e0bd95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
- This image is loaded from the Unspash website (credits to Maëva Vigier).
- Depending on your internet connection it could take a second or more.
- Note that Inkproved waits for it to load before it continues.

* Fully loaded! #CLASS: me

- Of course you can use the image format of your choice. JPG, PNG, WebP, GIF, SVG ... as far as a regular web browser supports it, it's OK.
- Inkproved renders images at 100% its container width by default, but feel free to customize this behavior in your CSS file if needed.
- While we're on images, let's now change the background.

* New background indeed #CLASS: me

- Here is the first background.
#BACKGROUND: background1.png

* Humm... Let's set background2 #CLASS: me

- You're right, background2 it is.
#BACKGROUND: background2.jpg
- Background behavior (tiling, attachement, position, ...) is to be set in your CSS file. Default is tiling from top left.


* What about audio #CLASS: me

- Two ways to play an audio file in Ink. Play it once with <b>AUDIO</b>, or play it in loop with <b>AUDIOLOOP</b>.
* Play a BIP once first #CLASS: me

- BIP #AUDIO: bip.mp3

* Play it in loop now #CLASS: me

- BIP BIP BIP BIP BIP... #AUDIOLOOP: HTTPScdn.freesound.org/previews/736/736267_15090270-lq.mp3
- this sound is loaded from freesound.org.

* OK stop it #CLASS: me

- To stop the sound in loop, use <b>AUDIOLOOPSTOP</b>, no value needed. #AUDIOLOOPSTOP

- Now that the audio loop has stopped, let's do the same with video.

* Let's grab the popcorn! #CLASS: me

#VIDEO: big-buck-bunny-intro.mp4

- Using <b>VIDEO</b>, this is the intro of the Big Buck Bunny film from the Blender Foundation.

- And using the <b>VIDEOLOOP</b>, this helmet is a 10-seconds video playing in loop. #VIDEOLOOP: yellow-hardhat.mp4

* Ok, nice #CLASS: me

- A new TAG in Inkproved, <b>IFRAME</b> can include an external document such as a PDF file any external HTML document inside your Ink story.
- This is page1.html file inside <em>assets/documents</em>.
#IFRAME: page1.html
- which could be a mini-game, a form, or whatever you want/need that no Ink plugin can help you to make.

* Ok #CLASS: me

#IFRAME: HTTPSwww.inklestudios.com/
- Of course, you can also include remote website if their web server policy accepts being included inside an iframe.

* Nice #CLASS: me

- Last but not least, CLASS.
- You can set a classname to each paragraph using CLASS: myclass.
- Then you need to define this class in your CSS file
#IMAGE: class-me.png
- And tadaaa
- you can customize how each line of text looks like.

* Ok #CLASS: me

- So feel free to create the classes you like, like a blockquote:
- A few moments later...  #CLASS: blockquote
- or adding your characters' name as they were texting:
- Hello, i'm Peter #CLASS: peter
- Hello Peter, i'm Steve #CLASS: steve
- ...
- CSS also comes with hover modifiers, so it changes how a line looks when your mouse goes over it. #CLASS: hovering
- Infinite possibilities :)

* Sure does #CLASS: me
    -> FINISH

-> DONE



=== FINISH
- OK !
- I guess that's it for today.
- You now know how <b>TAGS</b> work in Ink & Inkproved.
- Have a good day :)
    -> END