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
