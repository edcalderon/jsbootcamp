var Bootstrap = (function () {

    function loadModule(moduleName) {
        $("[data-controller='"+ moduleName +"']").each(function() {
            console.log(moduleName+ 'View')
            let view = new window[moduleName + 'View'](this);
            let model = new window[moduleName + 'Model']();
            let ctrl = new window[moduleName + 'Controller'](this, view, model);
            ctrl.init();
        });
    }

    function initializeModules(modulesNames) {
        modulesNames.forEach(moduleName => {
           loadModule(moduleName);
        });
    }

    return {
        start: function () {
           let appModules = ['ProductImage'];
           initializeModules(appModules);
        }
    }
})();
