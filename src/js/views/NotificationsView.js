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
