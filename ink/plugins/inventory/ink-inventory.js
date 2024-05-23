(function(){
// PLUGIN IS BASED ON THE BABYLONJS LIBRARY
// https://www.babylonjs.com/
// USING ITS VIEWER

_INK.plugins.3DMODEL = {
    type:   'element',
    ready:  false,
    folder: './';

    init : function()
    {
        let dependancy = document.createElement('script');
        dependancy.src='babylon.viewer.js';
        document.head.appendChild(dependancy);

        this.ready = true;
    },

    getElement : function(opt)
    {
        if(this.ready)
        {
            let babylonElement = _ce('babylon':{'extends':'minimal'});
            let modelElement = _ce('model':{'url':this.folder+'/'+file});
        }
    }
}

_INK.plugins.3DMODEL.init();

}());
