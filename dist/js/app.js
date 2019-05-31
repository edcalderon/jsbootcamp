var Bootstrap = (function () {

    function loadModule(moduleName) {
        $("[data-controller='"+ moduleName +"']").each(function() {
            
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

$(function(){
    Bootstrap.start();
});

function ProductImageModel(imageService) {
    this.getAll = function () {
        return [];
    }
}

function ProductImageController(el, view, model){
    this.$el = $(el);
    this.view = view;
    this.model = model;

    this.init = function(){
        console.log("hola")
        this.view.render();

        this.bindEvents();
    }

    this.bindEvents = function() {
        this.$el.on('click', '.js-gallery-image', this.imageClicked.bind(this));
    }

    this.imageClicked = function (e) {
        console.log('This image clicked', e.target.src);
    }
}

function ProductImage(el) {
    this.$el = $(el);

    this.render = function () {
      console.log("hola")
        this.$el.append(`<div class="col-md-12">
          <div class="product col-md-3 service-image-left">
            <center>
              <img id="item-display" src="https://picsum.photos/id/400/235/321" alt="" />
          </center>
        </div>

        <div class="container service1-items col-sm-2 col-md-2 pull-left">
          <center>
            <a id="item-1" class="service1-item">
              <img src="https://picsum.photos/id/401/120/107" alt="" />
            </a>
            <a id="item-2" class="service1-item">
              <img src="https://picsum.photos/id/402/120/107" alt="" />
            </a>
            <a id="item-3" class="service1-item">
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
          <button type="button" class="btn btn-success">
            Add to cart
          </button>
        </div>
        <div class="btn-group wishlist">
          <button type="button" class="btn btn-danger">
            Add to wishlist
          </button>
        </div>
        </div>
          `);
    }
}
