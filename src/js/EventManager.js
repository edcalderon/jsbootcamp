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