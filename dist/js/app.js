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
(function(context) {
    
    function EventManager() {
        this.listeners = {};
    }
    EventManager.prototype = {
        on : function(name, fn) {
            (this.listeners[name] = this.listeners[name] || []).push(fn);
            return this;
        },
        fire : function(name, args) {
            var listeners = this.listeners[name];
            args = args;
            if(listeners !== undefined) {
                var data = {}, evt;
                for(var i = 0, len = listeners.length; i < len; i++) {
                    evt = new EventManager.EventArg(name, data);
                    
                    listeners[i].apply(window, [args].concat(evt));
                    
                    data = evt.data;
                    if(evt.removed) {
                        listeners.splice(i, 1);
                        len = listeners.length;
                        --i;
                    }
                    if(evt.cancelled) {
                        break;
                    }
                }
            }
            return this;
        }
    };
    EventManager.eventify = function(object, manager) {
        manager = manager || new EventManager();
        object.on = function() {
            manager.addListener.apply(manager, arguments);
        };
        object.fire = function() {
            manager.fire.apply(manager, arguments);
        };
        return manager;
    };
    
    EventManager.EventArg = function(name, data) {
        this.name = name;
        this.data = data;
        this.cancelled = false;
        this.removed = false;
    };
    EventManager.EventArg.prototype = {
        cancel : function() {
            this.cancelled = true;
        },
        remove : function() {
            this.removed = true;
        }
    };
    
    context.EventManager = context.EventManager ||  new EventManager();
})(window || global);
$(function(){
    Bootstrap.start();
});

function RandomImagesService() {
    this.getImage = function (id, width, height) {
        return `https://picsum.photos/id/${id}/${width}/${height}`;
    }
}
function NotificationsModel(imageService) {
    this.getAll = function () {
        return [];
    }
}

function ProductImageModel(imageService) {
    
    this.init = function(imagesService) {
        this.ImagesService = imagesService;
        
        this.data = [
            {
                id: 1, 
                mainImg: this.ImagesService.getImage(400, 235, 321),
                imgs: [ 
                        this.ImagesService.getImage(401,120,107),
                        this.ImagesService.getImage(402,120,107),
                        this.ImagesService.getImage(403,120,107)
                ]
            }
        ];
    }

    this.getInfo = function(id) {
        return this.data.find(obj => obj.id === id);
    }
}
function ProductInfoModel(imageService) {
    this.getAll = function () {
        return [];
    }
}

function ErrorController (el, view) {
    this.$el = $(el);
    this.view = view;

    this.init = function(){
        this.bindEvents();
        this.ERROR_DISPLAY_DURATION_SECONDS = 3;
    }

    this.bindEvents = function() {
        EventManager.on('general.error', this.errorThrown.bind(this));
    }

    this.errorThrown = function(errorMessage) {
        this.view.render(errorMessage);

        setTimeout(() => {
            this.view.clear();
        }, this.ERROR_DISPLAY_DURATION_SECONDS * 1000);
    }
}
function NotificationsController(el, view, model){
    this.$el = $(el);
    this.view = view;
    this.model = model;

    this.init = function(){
        this.view.render();
        this.bindEvents();
        this.syncLastUpdated();
    }

    this.bindEvents = function() {
        EventManager.on('page.loaded', this.notifyClicked.bind(this));
        this.$el.on('load', this.updateNotifier('page.loaded', 'Page loaded'));
        EventManager.on('action', this.notifyClicked.bind(this));
    }

    this.notifyClicked = function(notifyAction) {
        this.lastUpdated = notifyAction;
        this.time = 0;
    }
    
    this.syncLastUpdated = function() {
        this.time = 0;
        this.timer = setInterval(() => {
            this.view.updateNotify(this.lastUpdated, this.time);
            this.time++;
        }, 1000);
    }
    this.updateNotifier = function(event, name) {
        EventManager.fire(event, name);
    }
}

function ProductImageController(el, view, model){
    this.$el = $(el);
    this.view = view;
    this.model = model;

    this.init = function(){
        let data = this.model.getInfo(1);
        this.view.render(data);
        this.bindEvents();
        
    }

    this.bindEvents = function() {
        this.$el.on('click', '.js-addtocart-button', this.addtocartButtonClicked.bind(this));
        this.$el.on('click', '.js-addtowishlist-button', this.addtowishlistButtonClicked.bind(this));
        this.$el.on('click', '.js-click-image', this.imgClicked.bind(this));
    }

    this.addtocartButtonClicked = function(e) {
        this.updateNotifier('action', "add to cart button clicked");       
    }

    this.addtowishlistButtonClicked = function(e) {
        this.updateNotifier('action', "add to wishlist button clicked");       
    }

    this.imgClicked = function(e) {
        this.updateNotifier('action', `Image "${e.target.src}" clicked`);
    }

    this.updateNotifier = function(event, name) {
        EventManager.fire(event, name);
    }
}

function ProductInfoController(el, view, model){
    this.$el = $(el);
    this.view = view;
    this.model = model;

    this.init = function(){
        this.view.render();
        this.bindEvents();
    }

    this.bindEvents = function() {
        this.$el.on('click', '.js-change-infotab', this.tabChanged.bind(this));
    }

    this.tabChanged = function(e) {
        this.updateNotifier('action', `Tab "${e.target.text}" selected`);
    }

    this.updateNotifier = function(event, name) {
        EventManager.fire(event, name);
    }
}

function ErrorView(el) {
    this.$el = $(el);

    this.render = function (errorMessage) {
        this.$el.html(`<div class="alert alert-danger">${errorMessage}</div>`);
    }

    this.clear = function () {
        this.$el.empty();
    }
}
function NotificationsView(el) {
    this.$el = $(el);

    this.render = function () {
        this.$el.append(`<div class="js-update col-md-12">
            Last Action: 
        </div>
          `);
    }
    this.updateNotify = function (event, time) {
        this.$el.find('.js-update').text(`Last Action: ${event} (${time} seconds ago)`);
    }
}

function ProductImageView(el) {
    this.$el = $(el);

    this.render = function (data) {
        this.$el.append(`<div class="col-md-12">
          <div class="product col-md-3 service-image-left">
            <center>
              <img id="item-display" src="${data.mainImg}" alt="" class="js-click-image" />
          </center>
        </div>

        <div class="container service1-items col-sm-2 col-md-2 pull-left">
          <center>
            <a id="item-1" class="service1-item js-click-image" >
              <img src="https://picsum.photos/id/401/120/107" alt="" />
            </a>
            <a id="item-2" class="service1-item js-click-image">
              <img src="https://picsum.photos/id/402/120/107" alt="" />
            </a>
            <a id="item-3" class="service1-item js-click-image">
              <img src="https://picsum.photos/id/403/120/107" alt="" />
            </a>
          </center>
        </div>
        </div>

        <div class="col-md-7">
        <div class="product-title">Corsair GS600 600 Watt PSU</div>
        <div class="product-desc">The Corsair Gaming Series GS600 is the ideal price/performance choice for mid-spec gaming PC</div>
        <div class="product-rating"><i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star gold"></i> <i class="fa fa-star-o"></i> </div>
        <hr>
        <div class="product-price">$ 1234.00</div>
        <div class="product-stock">In Stock</div>
        <hr>
        <div class="btn-group cart">
          <button type="button" class="btn btn-success js-addtocart-button">
            Add to cart
          </button>
        </div>
        <div class="btn-group wishlist js-addtowishlist-button">
          <button type="button" class="btn btn-danger">
            Add to wishlist
          </button>
        </div>
        </div>
          `);
    }
}

function ProductInfoView(el) {
    this.$el = $(el);

    this.render = function () {
        this.$el.append(`<div class="col-md-12 product-info">
        <ul id="myTab" class="nav nav-tabs nav_tabs">

            <li class="active"><a href="#service-one" class="js-change-infotab" data-toggle="tab">DESCRIPTION</a></li>
            <li><a href="#service-two" class="js-change-infotab" data-toggle="tab">PRODUCT INFO</a></li>
            <li><a href="#service-three" class="js-change-infotab" data-toggle="tab">REVIEWS</a></li>

        </ul>
        <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade in active" id="service-one">

                    <section class="container product-info">
                        The Corsair Gaming Series GS600 power supply is the ideal price-performance solution for building or upgrading a Gaming PC. A single +12V rail provides up to 48A of reliable, continuous power for multi-core gaming PCs with multiple graphics cards. The ultra-quiet, dual ball-bearing fan automatically adjusts its speed according to temperature, so it will never intrude on your music and games. Blue LEDs bathe the transparent fan blades in a cool glow. Not feeling blue? You can turn off the lighting with the press of a button.

                        <h3>Corsair Gaming Series GS600 Features:</h3>
                        <li>It supports the latest ATX12V v2.3 standard and is backward compatible with ATX12V 2.2 and ATX12V 2.01 systems</li>
                        <li>An ultra-quiet 140mm double ball-bearing fan delivers great airflow at an very low noise level by varying fan speed in response to temperature</li>
                        <li>80Plus certified to deliver 80% efficiency or higher at normal load conditions (20% to 100% load)</li>
                        <li>0.99 Active Power Factor Correction provides clean and reliable power</li>
                        <li>Universal AC input from 90~264V — no more hassle of flipping that tiny red switch to select the voltage input!</li>
                        <li>Extra long fully-sleeved cables support full tower chassis</li>
                        <li>A three year warranty and lifetime access to Corsair’s legendary technical support and customer service</li>
                        <li>Over Current/Voltage/Power Protection, Under Voltage Protection and Short Circuit Protection provide complete component safety</li>
                        <li>Dimensions: 150mm(W) x 86mm(H) x 160mm(L)</li>
                        <li>MTBF: 100,000 hours</li>
                        <li>Safety Approvals: UL, CUL, CE, CB, FCC Class B, TÜV, CCC, C-tick</li>
                    </section>

                </div>
            <div class="tab-pane fade" id="service-two">

            <section class="container product-info">
                    Product Information
            </section>

                </div>
                <div class="tab-pane fade" id="service-three">
                    <section class="container product-info">
                            Reviews
                    </section>
                </div>
            </div>
            <hr>
        </div>
          `);
    }
}    