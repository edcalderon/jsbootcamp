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
