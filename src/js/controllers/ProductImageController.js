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
