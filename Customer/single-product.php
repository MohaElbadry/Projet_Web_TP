    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Header                                           -->
    <!-- ----------------------------------------------------------------------------------------- -->
    <?php 
    require "../Metier/produit.php";
    $prod = DAO::getProduit($_GET["ref"]);
    $title = $prod->get("l") ;include "pages/header.php" ?>

    <!-- ----------------------------------------------------------------------------------------- -->
    <!--                                          Container                                        -->
    <!-- ----------------------------------------------------------------------------------------- -->

<div class="content-wrapper container">


                
<div class="product-details-page-content">
            <div class="container container-wide">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <!-- Start Product Thumbnail Area -->
                            <div class="col-md-5">
                                <div class="product-thumb-area">
                                    <div class="product-details-thumbnail">
                                        <div class="product-thumbnail-slider slick-initialized slick-slider" id="thumb-gallery">
                                            <div class="slick-list"><div class="slick-track" style="opacity: 1; width: 2925px; transform: translate3d(0px, 0px, 0px);">
                                                <figure class="pro-thumb-item slick-slide slick-current slick-active" data-mfp-src="assets/img/product/product-details-1.png" data-slick-index="0" aria-hidden="false" style="width: 585px;" tabindex="0">
                                                    <img src="../assets/photos/<?=$prod->get("i")?>" alt="Product Details">
                                                </figure></div></div>
                                            
                                            
                                            
                                            
                                        </div>

                                        <a href="#thumb-gallery" class="btn-large-view btn-gallery-popup">View Larger <i class="fa fa-search-plus"></i></a>
                                    </div>

                                    <div class="product-details-thumbnail-nav slick-initialized slick-slider">
                                        <div class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 750px; transform: translate3d(0px, 0px, 0px);"><figure class="pro-thumb-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 140px;" tabindex="0">
                                            <img src="../assets/photos/<?=$prod->get("i")?>" alt="Product Details">
                                        </figure><figure class="pro-thumb-item slick-slide slick-active" data-slick-index="1" aria-hidden="false" style="width: 140px;" tabindex="0">
                                            <img src="../assets/photos/<?=$prod->get("i")?>" alt="Product Details">
                                        </figure><figure class="pro-thumb-item slick-slide slick-active" data-slick-index="2" aria-hidden="false" style="width: 140px;" tabindex="0">
                                            <img src="../assets/photos/<?=$prod->get("i")?>" alt="Product Details">
                                        </figure><figure class="pro-thumb-item slick-slide slick-active" data-slick-index="3" aria-hidden="false" style="width: 140px;" tabindex="0">
                                            <img src="../assets/photos/<?=$prod->get("i")?>" alt="Product Details">
                                        </figure><figure class="pro-thumb-item slick-slide" data-slick-index="4" aria-hidden="true" style="width: 140px;" tabindex="-1">
                                            <img src="../assets/photos/<?=$prod->get("i")?>" alt="Product Details">
                                        </figure></div></div>
                                        
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- End Product Thumbnail Area -->

                            <!-- Start Product Info Area -->
                            <div class="col-md-7">
                                <div class="product-details-info-content-wrap">
                                    <div class="prod-details-info-content">
                                        <h2><?=$prod->get("l")?></h2>
                                        <h5 class="price"><strong>Price:</strong> <span class="price-amount"><?=$prod->get("p")?> Dhs</span>
                                        </h5>
                                        <p><?=$prod->get("d")?>.</p>
                                        <p>Pursue pleasure rationally encounter consequences that are extremely painful. Nor
                                            again is there anyone who loves or pursues or desires to obtain pain of itself,
                                            because it is pain, but because occasionally circles occur in and pain can
                                            procure him some great ple cum solute nobie est eligendi option</p>

                                        <div class="product-config">
                                            <div class="table-responsive">
                                                <table class="table table-bordered">
                                                    <tbody><tr>
                                                        <th class="config-label">Color</th>
                                                        <td class="config-option">
                                                            <div class="config-color">
                                                                <a href="#">Black</a>
                                                                <a href="#">Blue</a>
                                                                <a href="#">Green</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="config-label">Size</th>
                                                        <td class="config-option">
                                                            <div class="config-color">
                                                                <a href="#">Large</a>
                                                                <a href="#">Medium</a>
                                                                <a href="#">Small</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                            </div>
                                        </div>

                                        <div class="product-action">
                                            <div class="action-top d-sm-flex">
                                                <div class="pro-qty mr-3 mb-4 mb-sm-0">
                                                    <label for="quantity" class="sr-only">Quantity</label>
                                                    <input type="text" id="quantity" title="Quantity" value="1">
                                                <a href="#" class="inc qty-btn">+</a><a href="#" class="dec qty-btn">-</a></div>
                                                <button class="btn btn-bordered">Add to Cart</button>
                                            </div>
                                        </div>

                                        <div class="product-meta">
                                            <span class="sku_wrapper">SKU: <span class="sku">N/A</span></span>

                                            <span class="posted_in">Categories:
                                            <a href="#">Best Seller,</a>
                                            <a href="#">Parts,</a>
                                            <a href="#">Shop</a>
                                        </span>

                                            <span class="tagged_as">Tags:
                                            <a href="#">Seller,</a>
                                            <a href="#">Modern,</a>
                                            <a href="#">Parts</a>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Product Info Area -->
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="product-description-review">
                                    <!-- Product Description Tab Menu -->
                                    <ul class="nav nav-tabs desc-review-tab-menu" id="desc-review-tab" role="tablist">
                                        <li>
                                            <a class="active" id="desc-tab" data-toggle="tab" href="#descriptionContent" role="tab">Description</a>
                                        </li>
                                        
                                    </ul>

                                    <!-- Product Description Tab Content -->
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="descriptionContent">
                                            <div class="description-content">
                                                <p><?=$prod->get("d")?>.</p>

                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    

</div>

<!-- <div class="page-heading">
    <h3>Horizontal Layout</h3>
</div> -->


    <div class="shop-page-product">
        <div class="container container-wide">
            <div class="product-wrapper product-layout layout-grid">
                <div class="row mtn-30">
                    
                <?php
                            require "../../Metier/produit.php";
                            $prodab = Produit::afficher();
                            foreach($prodab as $prod) {?>
                        <!-- Start Product Item -->
                        <div class="col-sm-6 col-lg-4 col-xl-3  ">
                            <div class="product-item">
                                <div class="product-item__thumb">
                                    <a href="single-product.php?ref=<?=$prod->get("r")?>">
                                        <img class="thumb-primary" src="../assets/photos/<?=$prod->get("i")?>" alt="Product">
                                        <img class="thumb-secondary" src="../assets/photos/<?=$prod->get("i")?>" alt="Product">
                                    </a>
                                </div>

                                <div class="product-item__content">
                                    <div class="product-item__info">
                                        <h4 class="title" style="margin-top:15px;"><a href="single-product.html"><?=$prod->get("l")?></a></h4>
                                        <span class="price"><strong>Price:</strong> <?=$prod->get("p")?> Dhs</span>
                                    </div>

                                    <div class="product-item__action">
                                        <button class="btn-add-to-cart"><i class="ion-bag"></i></button>
                                        <button class="btn-add-to-cart"><i class="ion-ios-loop-strong"></i></button>
                                        <button class="btn-add-to-cart"><i class="ion-ios-heart-outline"></i></button>
                                        <button class="btn-add-to-cart"><i class="ion-eye"></i></button>
                                    </div>

                                    <div class="product-item__desc">
                                        <p>Pursue pleasure rationally encounter consequences that are extremely painful.
                                            Nor
                                            again is there anyone who loves or pursues or desires to obtain pain of
                                            itself,
                                            because it is pain, but because occasionally circles</p>
                                    </div>
                                </div>

                                <!-- <div class="product-item__sale">
                                    <span class="sale-txt">25%</span>
                                </div> -->
                            </div>
                        </div>
                        <!-- End Product Item -->
                        <?php
                             }
                        ?>

                </div>
            </div>
        </div>
    </div>

    <div class="shop-page-action-bar mt-30">
        <div class="container container-wide">
            <div class="action-bar-inner">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <nav class="pagination-wrap mb-10 mb-sm-0">
                            <ul class="pagination">
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#"><i class="ion-ios-arrow-thin-right"></i></a></li>
                            </ul>
                        </nav>
                    </div>

                    <div class="col-sm-6 text-center text-sm-right">
                        <p>Showing 1–12 of 26 results</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            </div>

            <footer>
                <div class="container">
                    <div class="footer clearfix mb-0 text-muted">
                        <div class="float-start">
                            <p>2021 &copy; Mazer</p>
                        </div>
                        <div class="float-end">
                            <p>Crafted with <span class="text-danger"><i class="bi bi-heart"></i></span> by <a
                                href="https://saugi.me">Saugi</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="../assets/js/bootstrap.js"></scrip>
    <script src="../assets/js/app.js"></script>
    <script src="../assets/js/pages/horizontal-layout.js"></script>
    
<script src="../assets/extensions/apexcharts/apexcharts.min.js"></script>
<script src="../assets/js/pages/dashboard.js"></script>
<script src="js.js"></script>
<script>
    
</script>

</body>

</html>
