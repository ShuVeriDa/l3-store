import html from './favorites.tpl.html';
import {Component} from "../component";
import {ProductList} from "../productList/productList";
import {favoriteService} from "../../services/favorite.service";

class FavoritesPage extends Component {
  products: ProductList;

  constructor(props: any) {
    super(props);

    this.products = new ProductList();
    this.products.attach(this.view.favoriteProducts);
  }

  async render() {
    const favorites = await favoriteService.getProducts();
    this.products.update(favorites);
  }
}

export const favoritesComp = new FavoritesPage(html)