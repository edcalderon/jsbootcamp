function ProductImageView(el) {
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
