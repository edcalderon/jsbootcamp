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