(function(){

    // Global tags - those at the top of the ink file
    // We support:
    //  # theme: dark
    //  # author: Your Name
    let inkSavedTheme;
    let inkGlobalTagTheme;
    let inkHasSave;

    let inkContainer = _gbi('ink__container');
    let inkStoryContainer = _gbi('ink__story');
    let inkStoryChoicesContainer = _gbi('ink__choices');

    let inkStoryContent;


    // Shortcut function to get an HTML element by its ID
    function _gbi(id) {
        return document.getElementById(id);
    }

    // Shortcut to create an HTML object
    function _ce(obj) {
        var el = false, tag, att;
        for (tag in obj) {
            if (obj[tag].hasOwnProperty) {
                el = document.createElement(tag);
                for (att in obj[tag]) {
                    if (obj[tag][att].hasOwnProperty) {
                        if(att=='_text')
                            el.innerHTML = obj[tag][att];
                        else if(typeof obj[tag][att] === 'string')
                            el.setAttribute(att, obj[tag][att]);
                    }
                }
                break;
            }
        }
        return el;
    }

    // Helper for parsing out tags of the form:
    //  # PROPERTY: value
    // e.g. IMAGE: source path
    function _splitPropertyTag(tag) {
        let property,val=null;
        let propertySplitIdx=tag.indexOf(":");
        if(propertySplitIdx>-1)
        {
            property = tag.substr(0, propertySplitIdx).trim();
            val = tag.substr(propertySplitIdx+1).trim();
            if(val.substr(0,5)=='HTTPS')
                val = 'https://'+val.substr(5);
        }
        else
            property = tag;

        return {
            property: property,
            val: val
        };
    }

    function _continueStory(firstTime) {

        if(_INK.logging)
            console.log('INK :: continueStory');

        let paragraphIndex = 0;
        let delay = 0.0;

        // Don't over-scroll past new content
        let previousBottomEdge = firstTime ? 0 : _contentBottomEdgeY();

        // Generate story text - loop through available content
        while(_INK.story.canContinue)
        {
            // Get ink to generate the next paragraph
            let paragraphText = _INK.story.Continue();
            let tags = _INK.story.currentTags;

            // Any special tags included with this line
            let customClasses = [];
            for(let i=0; i<tags.length; i++)
            {
                let tag = tags[i];

                // Detect tags of the form "X: Y". Currently used for IMAGE and CLASS but could be
                // customised to be used for other things too.
                let splitTag = _splitPropertyTag(tag);

                if(_INK.logging)
                    console.log('INK :: TAG '+splitTag.property+' --> '+splitTag.val);

                if(_INK.tagCallback && splitTag.property!='CLASS')
                    _INK.tagCallback(splitTag.property,splitTag.val);


                if(splitTag)
                {
                    // AUDIO: src
                    if( splitTag.property == "AUDIO") {
                        let srcVal = (splitTag.val.substr(0,5)=='https')?splitTag.val:'assets/sounds/'+splitTag.val;
                        this.audio = new Audio(srcVal);
                        this.audio.play();
                    }

                    // AUDIOLOOP: src
                    else if( splitTag.property == "AUDIOLOOP" )
                    {
                        let srcVal = (splitTag.val.substr(0,5)=='https')?splitTag.val:'assets/sounds/'+splitTag.val;

                        if('audioloop' in this){
                            this.audioloop.pause();
                            this.audioloop.removeAttribute('src');
                        }
                        this.audioloop = new Audio(srcVal);
                        this.audioloop.loop = true;
                        this.audioloop.play();
                    }
                    // AUDIOLOOP: src
                    else if( splitTag.property == "AUDIOLOOPSTOP" )
                    {
                        this.audioloop.pause();
                    }

                    // IMAGE: src
                    else if( splitTag.property == "IMAGE" )
                    {
                        let srcVal = (splitTag.val.substr(0,5)=='https')?splitTag.val:'assets/images/'+splitTag.val;

                        let paragraphElement = _ce({'p':{'class':'ink__image ink__hide'}});
                        let imageElement = _ce({'img':{src:srcVal}});
                        imageElement.addEventListener('load', function(){_INK.resizeContentContainer()},false);
                        imageElement.addEventListener('error', function(){this.setAttribute('src','assets/images/offline.jpg');},false);
                        paragraphElement.appendChild(imageElement);
                        inkStoryContainer.appendChild(paragraphElement);

                        _showAfter(delay, paragraphElement);
                        delay += 200.0;
                    }

                    // VIDEO: src
                    else if( splitTag.property == "VIDEO" || splitTag.property == "VIDEOLOOP" )
                    {
                        let srcVal = (splitTag.val.substr(0,5)=='https')?splitTag.val:'assets/videos/'+splitTag.val;

                        let paragraphElement = _ce({'p':{'class':'ink__video ink__hide'}});
                        let videoElement = _ce({'video':{src:srcVal,autoplay:'true',inline:'true'}});
                        if(splitTag.property == "VIDEOLOOP")
                            videoElement.setAttribute('loop','');
                        else
                            videoElement.setAttribute('controls','');
                        videoElement.addEventListener('canplay', function(){_INK.resizeContentContainer()},false);
                        paragraphElement.appendChild(videoElement);
                        inkStoryContainer.appendChild(paragraphElement);

                        _showAfter(delay, paragraphElement);
                        delay += 200.0;
                    }

                    // IFRAME: src
                    else if( splitTag.property == "IFRAME" )
                    {
                        let srcVal = (splitTag.val.substr(0,5)=='https')?splitTag.val:'assets/documents/'+splitTag.val;

                        let paragraphElement = _ce({'p':{'class':'ink__iframe ink__hide'}});
                        let iframeElement = _ce({'iframe':{src:srcVal,scrolling:'auto',frameborder:'0',seamless:'true'}});
                        paragraphElement.appendChild(iframeElement);
                        inkStoryContainer.appendChild(paragraphElement);

                        _showAfter(delay, paragraphElement);
                        delay += 200.0;
                    }

                    // LINK: url
                    else if( splitTag.property == "LINK" ) {
                        window.location.href = splitTag.val;
                    }

                    // LINKOPEN: url
                    else if( splitTag.property == "LINKOPEN" ) {
                        window.open(splitTag.val);
                    }

                    // BACKGROUND: src
                    else if( splitTag.property == "BACKGROUND" ) {
                        let srcVal = (splitTag.val.substr(0,5)=='https')?splitTag.val:'assets/backgrounds/'+splitTag.val;
                        inkContainer.style.backgroundImage = 'url('+srcVal+')';
                    }

                    // CLASS: className
                    else if( splitTag.property == "CLASS" ) {
                        customClasses.push(splitTag.val);
                    }

                    // CLEAR - removes all existing content.
                    // RESTART - clears everything and restarts the story from the beginning
                    else if( tag == "CLEAR" || tag == "RESTART" ) {
                        _removeAll("p");
                        _removeAll("img");
                        _clearChoices();

                        if( tag == "RESTART" ) {
                            _restart();
                            return;
                        }
                    }
                    else
                    {
                        // CHECK IF SOME PLUGIN MIGHT SUPPORT THIS TAG
                        if(_INK.plugins[splitTag.property]!=undefined)
                        {
                            if(_INK.plugins[splitTag.property].type()=="element")
                            {
                                let pluginElement=false;
                                if(pluginElement = _INK.plugins[splitTag.property].getElement(splitTag.val))
                                {
                                    let paragraphElement = _ce({'p':{'class':splitTag.property.toLowerCase()+' ink__hide'}});
                                    paragraphElement.appendChild(pluginElement);
                                    inkStoryContainer.appendChild(paragraphElement);
                                    _showAfter(delay, paragraphElement);
                                    delay += 200.0;
                                }
                            }
                            else if(_INK.plugins[splitTag.property].type()=="action")
                            {
                                _INK.plugins[splitTag.property].setAction(splitTag.val);
                            }
                        }
                    }
                }
            }

            // Create paragraph element (initially hidden)
            let paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = paragraphText;
            inkStoryContainer.appendChild(paragraphElement);

            // Add any custom classes derived from ink tags
            for(let i=0; i<customClasses.length; i++)
                paragraphElement.classList.add(customClasses[i]);

            // Fade in paragraph after a short delay
            _showAfter(delay, paragraphElement);
            delay += 200.0;
        }

        // Create HTML choices from ink choices
        _INK.story.currentChoices.forEach(function(choice) {

            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("ink__choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`

            // If there is a ink__choices element, put choices in interval
            // otherwise, just keep adding it in the story flow
            if(inkStoryChoicesContainer)
                inkStoryChoicesContainer.appendChild(choiceParagraphElement);
            else
                inkStoryContainer.appendChild(choiceParagraphElement);

            // Fade choice in after a short delay
            _showAfter(delay, choiceParagraphElement);
            delay += 200.0;

            // Click on choice
            var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
            choiceAnchorEl.addEventListener("click", function(event) {

                // Don't follow <a> link
                event.preventDefault();

                _clearChoices();

                // Tell the story where to go next
                _INK.story.ChooseChoiceIndex(choice.index);

                // This is where the save button will save from
                _INK.savePoint = _INK.story.state.toJson();

                // Aaand loop
                _continueStory();
            });
        });

        // Extend height to fit
        // We do this manually so that removing elements and creating new ones doesn't
        // cause the height (and therefore scroll) to jump backwards temporarily.
        setTimeout(_resizeContentContainer,10);

        if( !firstTime )
            _scrollDown(previousBottomEdge);

    }


    // -----------------------------------
    // Various Helper functions
    // -----------------------------------

    // Fades in an element after a specified delay
    function _showAfter(delay, el) {
        el.classList.add("ink__hide");
        setTimeout(function() { el.classList.remove("ink__hide") }, delay);
    }

    // Scrolls the page down, but no further than the bottom edge of what you could
    // see previously, so it doesn't go too far.
    function _scrollDown(previousBottomEdge) {

        // Line up top of screen with the bottom of where the previous content ended
        let target = previousBottomEdge;

        // Can't go further than the very bottom of the page
        let limit = inkContainer.scrollHeight - inkContainer.clientHeight;
        if( target > limit )
            target = limit;

        let start = inkContainer.scrollTop;

        let dist = target - start;
        let duration = 300 + 300*dist/100;
        let startTime = null;
        function step(time) {
            if( startTime == null ) startTime = time;
            var t = (time-startTime) / duration;
            var lerp = 3*t*t - 2*t*t*t; // ease in/out
            inkContainer.scrollTo(0, (1.0-lerp)*start + lerp*target);
            if( t < 1 ) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // The Y coordinate of the bottom end of all the story content, used
    // for growing the container, and deciding how far to scroll.
    function _contentBottomEdgeY() {
        var bottomElement = inkStoryContainer.lastElementChild;
        return bottomElement ? bottomElement.offsetTop + bottomElement.offsetHeight : 0;
    }

    function _resizeContentContainer()
    {
        if(inkStoryChoicesContainer!=null){
            inkStoryContainer.style.height = "auto";
            inkContainer.style.paddingBottom = inkStoryChoicesContainer.offsetHeight+"px";
        }
        else
            inkStoryContainer.style.height = _contentBottomEdgeY()+"px";

        if(_INK.autoScroll){
            _scrollDown(_contentBottomEdgeY());
        }
    }
    window.addEventListener('resize',_resizeContentContainer);



    // Remove all elements that match the given selector. Used for removing choices after
    // you've picked one, as well as for the CLEAR and RESTART tags.
    function _removeAll(selector)
    {
        var allElements = inkStoryContainer.querySelectorAll(selector);
        for(var i=0; i<allElements.length; i++) {
            var el = allElements[i];
            el.parentNode.removeChild(el);
        }
    }

    function _clearChoices()
    {
        var allElements = inkContainer.querySelectorAll('.ink__choice');
        for(var i=0; i<allElements.length; i++) {
            var el = allElements[i];
            el.parentNode.removeChild(el);
        }
    }

    // Used for hiding and showing the header when you CLEAR or RESTART the story respectively.
    function _setVisible(selector, visible)
    {
        var allElements = inkStoryContainer.querySelectorAll(selector);
        for(var i=0; i<allElements.length; i++) {
            var el = allElements[i];
            if( !visible )
                el.classList.add("ink__invisible");
            else
                el.classList.remove("ink__invisible");
        }
    }



    // Loads save state if exists in the browser memory
    function _loadSavePoint() {

        try {
            let savedState = window.localStorage.getItem('ink-save-state');
            if (savedState) {
                _INK.story.state.LoadJson(savedState);
                return true;
            }
        } catch (e) {
            console.debug("Couldn't load save state");
        }
        return false;
    }




    window._INK = {

        logging     : false,
        story       : null,
        savePoint   : "",
        autoScroll  : true,

        plugins     : [],

        tags        : [],
        tagCallback : null,

        loadStory : function(obj,autoStart=true)
        {
            if(_INK.logging)
                console.log('INK :: loadStory');

            inkStoryContent = obj;
            _INK.init(autoStart);
        },

        init : function(autoStart=true)
        {
            if(_INK.logging)
                console.log('INK :: init (autoStart : '+autoStart+')');

            // In case you need choices to go out of the paragraph flow
            inkStoryChoicesContainer = _gbi('ink__choices');

            if(inkStoryContent)
            {
                // Main story processing function. Each time this is called it generates
                // all the next content up as far as the next set of choices.
                _INK.story = new inkjs.Story(inkStoryContent);
                _INK.story.onError = function(err){
                    console.error(err);
                }

                _INK.tags = this.story.globalTags;
/*
                if(this.tags)
                {
                    for(var i=0; i<_INK.tags.length; i++)
                    {
                        let splitTag = _splitPropertyTag(this.story.globalTags[i]);
                    }
                }
*/

                _loadSavePoint();

                // Set initial save point
                _INK.savePoint = this.story.state.toJson();

                // Kick off the start of the story!
                if(autoStart)
                    _INK.start();
            }
        },

        resizeContentContainer : function() { _resizeContentContainer() },

        reload : function()
        {
            _removeAll("p");
            _clearChoices();

            if('localStorage' in window)
            {
                let savedState = window.localStorage.getItem('ink-save-state');
                if(savedState)
                    _INK.story.state.LoadJson(savedState);
            }
            else
                console.warn("Couldn't load saved state");

            _continueStory(true);
        },

        start : function()
        {
            if(_INK.logging)
                console.log('INK :: start');

            _continueStory(true);
        },

        gotoKnot : function(knot)
        {
            _INK.story.ChoosePathString(knot);
            _continueStory(true);
        },

        continue : function()
        {
            if(_INK.logging)
                console.log('INK :: continue');

            _continueStory(true);
        },

        restart : function()
        {
            if(_INK.logging)
                console.log('INK :: restart');

            _INK.story.ResetState();
            _removeAll("p");
            _clearChoices();

            // set save point to here
            _INK.savePoint = _INK.story.state.toJson();
            _continueStory(true);

            inkContainer.scrollTo(0, 0);
        },

        rewind : function()
        {
            if(_INK.logging)
                console.log('INK :: rewind');

            _removeAll("p");
            _clearChoices();

            _INK.restart();
        },

        save : function()
        {
            if(_INK.logging)
                console.log('INK :: save');

            if('localStorage' in window)
                window.localStorage.setItem('ink-save-state', _INK.savePoint);
            else
                console.warn("Your browser does not support save state");
        },

        setVariable : function(name,val)
        {
            if(_INK.logging)
                console.log('INK :: setVar '+name+' to '+val);

            if(_INK.story.variablesState[name]!==null)
                _INK.story.variablesState[name]=val;
            else
                console.error('Variable '+name+' does not exists in this INK story');
        },

        getVariable : function(name)
        {
            if(_INK.logging)
                console.log('INK :: getVar '+name);

            if(_INK.story.variablesState[name]!==null)
                return _INK.story.variablesState[name];
            else
                console.error('Variable '+name+' does not exists in this INK story');
        },

        listenVariables : function(arrayOfFunctions)
        {
            for(let i=0,inb=arrayOfFunctions.length;i<inb;i++){
                _INK.story.ObserveVariable(arrayOfFunctions[i], window[arrayOfFunctions[i]]);
            }
        },

        setExternals : function(arrayOfFunctions)
        {
            for(let i=0,inb=arrayOfFunctions.length;i<inb;i++){
                _INK.story.BindExternalFunction(arrayOfFunctions[i], window[arrayOfFunctions[i]], true);
            }
        },


        setTheme : function(val)
        {
            if(!document.getElementById('ink_theme_file'))
                document.getElementsByTagName('head')[0].innerHTML+='<link rel="stylesheet" id="ink_theme_file">';
            if(val!='')
                ink_theme_file.setAttribute('href','assets/themes/theme-'+val+'.css');
            else
                ink_theme_file.removeAttribute('href');
        },

        loadPlugin : function(pluginName)
        {
            if(!document.getElementById('ink_plugin_'+pluginName))
            {
                let pluginScript = document.createElement('script');
                pluginScript.id = 'ink_plugin_'+pluginName;
                pluginScript.type='text/javascript';
                pluginScript.src='ink/plugins/'+pluginName+'/ink-'+pluginName+'.js';
                document.head.appendChild(pluginScript);
                if(_INK.logging)
                    console.log('INK :: Load plugin '+pluginName);
            }
            else
            {
                if(_INK.logging)
                    console.info('INK :: plugin '+pluginName+' already loaded');
            }
        }
    };


})();
