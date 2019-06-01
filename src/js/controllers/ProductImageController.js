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
