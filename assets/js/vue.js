// data
/* const products = [
  { id: 1, description: "Quarz Luxe", price: 12, img: 'assets/img/quarz-luxe.JPG'},
  { id: 2, description: 'Curren Business', price: 20, img: 'assets/img/curren-business.JPG'},
  { id: 3, description: 'Curren Sport', price: 5, img: 'assets/img/curren-sport.JPG'},
  { id: 4, description: 'Jaragar Racing', price: 8, img: 'assets/img/jaragar-racing.JPG'},
  { id: 5, description: 'Liges Hommes', price: 3, img: 'assets/img/liges-hommes.JPG'},
  { id: 6, description: 'Maserati Mechanical', price: 65, img: 'assets/img/maserati-mechanical.JPG'},
  { id: 7, description: 'Montre Mecanique', price: 25, img: 'assets/img/montre-mecanique.JPG'},
  { id: 8, description: 'Brand Designer', price: 28, img: 'assets/img/brand-designer.JPG'},
  { id: 9, description: 'Relogio Masculino', price: 4, img: 'assets/img/relogio-masculino.JPG'},
  { id: 10, description: 'Tissot Multifunction', price: 29, img: 'assets/img/tissot-multifunction.JPG'},
  { id: 11, description: 'Hip Hop Gold', price: 87, img: 'assets/img/hiphop-gold.JPG'},
  { id: 12, description: 'Mesh Genova', price: 6, img: 'assets/img/mesh-genova.JPG'},
];*/

const products = [
  { id: 1, description: "Condor Allure M3", price: 100, img: 'assets/img/Condor-Allure-M3-100doll.jpg'},
  { id: 2, description: 'Honor 8 Lite', price: 159, img: 'assets/img/honor-8lite-159doll.jpg'},
  { id: 3, description: 'HTC U12 Plus', price: 240, img: 'assets/img/HTC-U12-Plus-240doll.jpg'},
  { id: 4, description: 'Huawei P20 pro', price: 198, img: 'assets/img/huawei-p20-pro-198doll.jpg'},
  { id: 5, description: 'Iphone 8', price: 999, img: 'assets/img/iphone8_999doll.jpg'},
  { id: 6, description: 'LG V50', price: 282, img: 'assets/img/LG-V50-282doll.jpg'},
  { id: 7, description: 'OPPO Reno 4', price: 549, img: 'assets/img/Oppo-Reno-4-549doll.jpg'},
  { id: 8, description: 'Pixel 4', price: 28, img: 'assets/img/pixel-4-799doll.jpg'},
  { id: 9, description: 'Samsung Galaxy S9', price: 360, img: 'assets/img/samsung-gs9-360doll.jpg'},
  { id: 10, description: 'Samsung Galaxy Note 10', price: 940, img: 'assets/img/samsung-note10-940doll.jpg'},
  { id: 11, description: 'Starlight Star Mix', price: 120, img: 'assets/img/Starlight-Star-Mix-120doll.jpg'},
  { id: 12, description: 'Xiaomi Mi 8 lite', price: 196, img: 'assets/img/xiaomi-mi-8-lite-196doll.jpg'},
];

const Home = {
  template: '#home',
  name: 'Home',
  data: () => {
    return {
      products,
      searchKey: '',
      liked: [],
      cart: []
    }
  },
  computed: {
    filteredList(){
      return this.products.filter((product)=>{
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      }
    );
    },
    getLikeCookie(){
      let cookieValue = JSON.parse($cookies.get('like'));
      cookieValue == null ? this.liked = [] : this.liked = cookieValue
    },
    cartTotalAmount() {
      let total = 0;
      for (let item in this.cart) {
        total = total + this.cart[item].quantity*this.cart[item].price;
      }
      return total;
    },
    itemTotalAmount(){
      let itemTotal = 0;
      for (let item in this.cart) {
        itemTotal = itemTotal + this.cart[item].quantity;
      }
      return itemTotal;
    }
  },
  methods: {
    setLikeCookie(){
      document.addEventListener('input', () => {
        setTimeout(() => {
          $cookies.set('like', JSON.stringify(this.liked));
        }, 300);
      })
    },
    addToCart(product){
      // verifier si le produit est déja dans le panier
      for (let i=0; i<this.cart.length; i++){
        if (this.cart[i].id === product.id){
          return this.cart[i].quantity++
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1
      })
    },
    cartPlusOne(product){
      product.quantity = product.quantity +1;
    },
    cartMinusOne(product, id){
      if (product.quantity == 1){
        this.cartRemoveItem(id);
      }
      else {
        product.quantity = product.quantity - 1;
      }
    },
    cartRemoveItem(id) {
      this.$delete(this.cart,id);
    }
  },
  mounted: () => {
    this.getLikeCookie;
  }

}

const userSettings = {
  template: '<h1>user Settings</h1>',
  name: 'userSettings'
}

const WishList = {
  template: '<h1>Wish List</h1>',
  name: 'WishList'
}

const ShoppingCart = {
  template: '<h1>Shopping Cart</h1>',
  name: 'ShoppingCart'
}

//router
const router = new VueRouter ({
  routes: [
    { path: '/', component: Home, name:'Home'},
    { path: '/user-settings', component: userSettings, name:'userSettings'},
    { path: '/wish-list', component: WishList, name:'WishList'},
    { path: '/shopping-cart', component: ShoppingCart, name:'ShoppingCart'},
  ]
})

const vue = new Vue({
  router
}).$mount('#app');
