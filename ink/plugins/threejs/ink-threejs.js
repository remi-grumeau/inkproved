(function(){
// PLUGIN IS BASED ON THE THREEJS LIBRARY

_INK.plugins.THREEJS = {
    type:   'element',

    ready:  false,
    folder: './',

    getElement : function(file)
    {
        if(this.ready)
        {
            if(_INK.logging)
                console.log('INK PLUGIN :: THREEJS '+file);

            let pluginElement = document.createElement('threejs');
            //pluginElement.setAttribute('extends','minimal');
            pluginElement.setAttribute('model',this.folder+file);
            /*
            let modelElement = document.createElement('model');
            modelElement.setAttribute('url',this.folder+file);
            pluginElement.appendChild(modelElement);
            */
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
    pluginStyle.href='ink/plugins/threejs/ink-threejs.css';
    document.head.appendChild(pluginStyle);

    let pluginScript = document.createElement('script');
    pluginScript.src='ink/plugins/threejs/babylon.viewer.js';
    document.head.appendChild(pluginScript);

    _INK.plugins.THREEJS.ready = true;
}
_init();

}());
