(function(){
    const _pluginType = 'action';
    let _pluginIsReady = false;

_INK.plugins.VFX = {

    type:   function(){ return _pluginType },

    setAction : function(action)
    {
        if(_pluginIsReady)
        {
            if(_INK.logging)
                console.log('INK PLUGIN :: VFX '+action);

            if(action.indexOf(',')>-1)
            {
                let actionParam = action.split(',');
                if(actionParam[0]=='grayscale')
                    ink__container.style.filter = 'grayscale('+actionParam[1]+')';
                if(actionParam[0]=='blur')
                    ink__container.style.filter = 'blur('+actionParam[1]+'px)';
                if(actionParam[0]=='sepia')
                    ink__container.style.filter = 'sepia('+actionParam[1]+')';
            }
            else
                ink__container.setAttribute('data-vfx',action);

            return true;
        }
        else
            return false;
    }
}

function _init()
{
    let pluginStyle = document.createElement('link');
    pluginStyle.rel='stylesheet';
    pluginStyle.href='ink/plugins/vfx/ink-vfx.css';
    document.head.appendChild(pluginStyle);

    _pluginIsReady = true;
    if(_INK.logging)
        console.log('INK PLUGIN :: VFX LOADED');
}
_init();

}());
