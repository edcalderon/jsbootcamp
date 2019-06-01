function ErrorView(el) {
    this.$el = $(el);

    this.render = function (errorMessage) {
        this.$el.html(`<div class="alert alert-danger">${errorMessage}</div>`);
    }

    this.clear = function () {
        this.$el.empty();
    }
}