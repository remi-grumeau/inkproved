(function(){

    let _testerHeader = document.createElement('div');
    _testerHeader.id = 'ink__header';
    let _testerHeaderContent = '<a href="https://www.inklestudios.com/ink/" target="_blank">Written with Ink</a>';
    _testerHeaderContent += '<div id="ink__header-menu">';
    _testerHeaderContent += '   <a onclick="_INK.restart()">restart</a>';
    _testerHeaderContent += '   <a onclick="_INK.rewind()">rewind</a>';
    _testerHeaderContent += '   <a onclick="_INK.save()">save</a>';
    _testerHeaderContent += '</div>';
    _testerHeader.innerHTML = _testerHeaderContent;
    document.body.insertBefore(_testerHeader, document.getElementById('ink__container'));

}());
