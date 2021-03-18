<!DOCTYPE html>
<html lang="fr">
  <head>
    <title>Vente smartphone</title>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <link rel="icon" href="./assets/img/logo.png" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
    <link href="./assets/style/style.css" rel="stylesheet" />
  </head>

  <body>
    <div id="app">
      <nav>
        <div class="nav-container">
          <div id="logo">
            <router-link to="/">
            <img src="./assets/img/logo.png" alt="logo" />
            </router-link>
          </div>

          <ul id="icons">
            <li>
              <router-link to="user-settings">
              <i class="fas fa-user"></i>
              </router-link>
            </li>
            <li>
              <router-link to="wish-list">
              <i class="fas fa-heart"></i>
              <span id="nav-not"></span>
              </router-link>
            </li>
            <li>
              <router-link to="shopping-cart">
              <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view></router-view>
    </div>

    <script type="text/x-template" id="home">
      <div class="home-container">
        <h1>Articles</h1>
        <!-- Affichage de recherche  -->
        <input v-model="searchKey" type="search" id="search" placeholder="Rechercher..." autocomplete="off"/>
        <span v-if="searchKey && filteredList.length > 0">
          {{filteredList.length}} résultat<span v-if="filteredList.length > 1">s</span>
        </span>
        <!-- Affachage en cartes -->
        <div class="card-cart-container">
          <div class="card-container">
            <div v-for="product in filteredList" class=card>
              <div class="img-container">
                <img v-bind:src="product.img" alt="">
              </div>
              <div class="card-text">
                <h3> {{ product.description }} </h3>
                <span> {{product.price}}$ </span>
              </div>
              <div class="card-icons">
                <div class="like-container">
                  <input type="checkbox"
                          name="checkbox"
                          v-bind:id="product.id"
                          :value="product.id"
                          v-model="liked"
                          @click="setLikeCookie()"
                  >
                  <label v-bind:for="product.id">
                    <i class="fas fa-heart"></i>
                  </label>
                </div>
                <div class="add-to-cart">
                  <button v-on:click="addToCart(product)">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- message affiché en cas de pas de résultats -->
            <div v-if="filteredList.length == 0" class="no-result">
              <h3>Désolé</h3>
              <p>Aucun résultat trouvé</p>
            </div>
          </div>
          <!-- affichage du panier -->
          <transition name="cart-anim">
            <div v-if="cart.length > 0" class="shopping-cart" id="shopping-cart">
              <h2>Panier</h2>
              <transition-group name="item-anim" tag="div" class="item-group">
                <div v-for="product, id in cart" v-bind:key="product.id" class="item">
                  <div class="img-container">
                    <img v-bind:src='product.img' alt="" />
                  </div>
                  <div class="item-description">
                    <h4> {{product.description}} </h4>
                    <p> {{product.price}}$</p>
                  </div>
                  <div class="item-quantity">
                    <h6>quantité: {{product.quantity}} </h6>
                    <div class="cart-icons">
                      <button v-on:click="cartPlusOne(product)">
                        <i class="fa fa-plus"></i>
                      </button>
                      <button v-on:click="cartMinusOne(product, id)">
                        <i class="fa fa-minus"></i>
                      </button>
                      <button @click="cartRemoveItem(id)">
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </transition-group>
              <div class="grand-total">
                <div class=total>
                  <h2>Total</h2>
                  <h2> {{cartTotalAmount}}$</h2>
                </div>
                <h6>Total article : {{itemTotalAmount}}</h6>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </script>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <script src="https://unpkg.com/vue-cookies@1.7.4/vue-cookies.js"></script>
    <script src="./assets/js/vue.js"></script>
    <script src="./assets/js/script.js"></script>
  </body>
</html>
