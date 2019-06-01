var Bootstrap = (function () {

    function loadModule(moduleName, servicesToInject) {

        $controllerContainers = $("[data-controller='" + moduleName + "']");

        if ($controllerContainers.length == 0) {
            console.warn(moduleName + ' html container not found!');
            return;
        }

        $controllerContainers.each(function () {
            let view = new window[moduleName + 'View'](this);

            let model = null;
            if (window[moduleName + 'Model']) {
                model = new window[moduleName + 'Model']();

                if (servicesToInject && servicesToInject.length > 0) {
                    let servicesInstances = [];
                    servicesToInject.forEach( injectionDefinition => {
                        servicesInstances.push(new window[injectionDefinition.service + 'Service']);
                    });

                    model.init.apply(model, servicesInstances);
                }
            }
            let ctrl = new window[moduleName + 'Controller'](this, view, model);
            ctrl.init();
        });
    }

    function initializeModules(modulesNames, modelsServices) {
        modulesNames.forEach(moduleName => {
            let servicesToInject = modelsServices
                .filter(injectionDefinition => injectionDefinition.module == moduleName);

            loadModule(moduleName, servicesToInject);
        });
    }

    return {
        start: function () {
            let appModules = ['ProductImage', 'ProductInfo', 'Notifications', 'Error'];
            let modelsServices = [
                {
                    module: 'ProductImage',
                    service: 'RandomImages' //'KittenImages', 'DogImages', 'NatureImages'
                }
            ];
            initializeModules(appModules, modelsServices);
        }
    }
})();