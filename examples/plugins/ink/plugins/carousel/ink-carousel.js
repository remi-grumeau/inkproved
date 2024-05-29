(function(){
    const _pluginType = 'element';
    let _pluginIsReady = false;

    const _pluginAssetsFolder = './assets/images/';

_INK.plugins.CAROUSEL = {

    type:   function(){ return _pluginType },

    getElement : function(files)
    {
        if(_pluginIsReady)
        {
            if(_INK.logging)
                console.log('INK PLUGIN :: CAROUSEL '+files);

            let pluginElement = document.createElement('div');
            pluginElement.className = 'ink__plugin_carousel';

            // CREATE A WRAPPER AND INSERT ALL IMAGES IN IT
            let pluginWrapper = document.createElement('div');
            pluginWrapper.className = 'ink__plugin_carousel_wrapper';
            let items = files.split(',');
            for(let i=0,inb=items.length;i<inb;i++)
            {
                let imageElement = document.createElement('img');
                imageElement.setAttribute('src',_pluginAssetsFolder+items[i]);
                imageElement.addEventListener('load', function(){_INK.resizeContentContainer()},false);
                pluginWrapper.appendChild(imageElement);
            }
            pluginElement.appendChild(pluginWrapper);

            // ADD A QUICK N DIRTY HORIZONTAL SCROLL SUPPORT FOR TOUCHSCREENS
            pluginElement.addEventListener('touchstart',function(ev){
                this.setAttribute('data-touchstart', parseInt(ev.touches[0].clientX));
                this.setAttribute('data-scrollstart', parseInt(this.scrollLeft));
            },false);
            pluginElement.addEventListener('touchmove',function(ev){
                let touchStart = parseInt(this.getAttribute('data-touchstart'));
                let scrollStart = parseInt(this.getAttribute('data-scrollstart'));
                this.scrollLeft = scrollStart - (ev.touches[0].clientX - touchStart);
            },false);
            pluginElement.addEventListener('touchend',function(ev){
                this.removeAttribute('data-touchstart');
                this.removeAttribute('data-scrollstart');
            },false);

            // RETURN THE PLUGIN ELEMENT TO INKPROVED
            // SO IT CAN INJECT IT IN THE STORY FLOW
            return pluginElement;
        }
        else
            return false;
    }
}

function _init()
{
    let pluginStyle = document.createElement('link');
    pluginStyle.rel='stylesheet';
    pluginStyle.href='ink/plugins/carousel/ink-carousel.css';
    document.head.appendChild(pluginStyle);

    _pluginIsReady = true;
    if(_INK.logging)
        console.log('INK PLUGIN :: CAROUSEL LOADED');
}
_init();

}());
