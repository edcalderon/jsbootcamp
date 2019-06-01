function ProductInfoView(el) {
    this.$el = $(el);

    this.render = function () {
        this.$el.append(`<div class="col-md-12 product-info">
        <ul id="myTab" class="nav nav-tabs nav_tabs">

            <li class="active"><a href="#service-one" class="js-change-infotab" data-toggle="tab">DESCRIPTION</a></li>
            <li><a href="#service-two" class="js-change-infotab" data-toggle="tab">PRODUCT INFO</a></li>
            <li><a href="#service-three" class="js-change-infotab" data-toggle="tab">REVIEWS</a></li>

        </ul>
        <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade in active" id="service-one">

                    <section class="container product-info">
                        The Corsair Gaming Series GS600 power supply is the ideal price-performance solution for building or upgrading a Gaming PC. A single +12V rail provides up to 48A of reliable, continuous power for multi-core gaming PCs with multiple graphics cards. The ultra-quiet, dual ball-bearing fan automatically adjusts its speed according to temperature, so it will never intrude on your music and games. Blue LEDs bathe the transparent fan blades in a cool glow. Not feeling blue? You can turn off the lighting with the press of a button.

                        <h3>Corsair Gaming Series GS600 Features:</h3>
                        <li>It supports the latest ATX12V v2.3 standard and is backward compatible with ATX12V 2.2 and ATX12V 2.01 systems</li>
                        <li>An ultra-quiet 140mm double ball-bearing fan delivers great airflow at an very low noise level by varying fan speed in response to temperature</li>
                        <li>80Plus certified to deliver 80% efficiency or higher at normal load conditions (20% to 100% load)</li>
                        <li>0.99 Active Power Factor Correction provides clean and reliable power</li>
                        <li>Universal AC input from 90~264V — no more hassle of flipping that tiny red switch to select the voltage input!</li>
                        <li>Extra long fully-sleeved cables support full tower chassis</li>
                        <li>A three year warranty and lifetime access to Corsair’s legendary technical support and customer service</li>
                        <li>Over Current/Voltage/Power Protection, Under Voltage Protection and Short Circuit Protection provide complete component safety</li>
                        <li>Dimensions: 150mm(W) x 86mm(H) x 160mm(L)</li>
                        <li>MTBF: 100,000 hours</li>
                        <li>Safety Approvals: UL, CUL, CE, CB, FCC Class B, TÜV, CCC, C-tick</li>
                    </section>

                </div>
            <div class="tab-pane fade" id="service-two">

            <section class="container product-info">
                    Product Information
            </section>

                </div>
                <div class="tab-pane fade" id="service-three">
                    <section class="container product-info">
                            Reviews
                    </section>
                </div>
            </div>
            <hr>
        </div>
          `);
    }
}    