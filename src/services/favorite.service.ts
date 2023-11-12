import localforage from 'localforage';
import {ProductData} from "../../types";

const DB = '__wb-favorites';

class FavoriteService {
  async init() {
    await this.updateCount()
  }

  async getProducts(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async setProducts(products: ProductData[]) {
    await localforage.setItem(DB, products);
  }

  async toggleProducts(product: ProductData) {
    const products = await this.getProducts()
    const isFavorite = products.some(item => item.id === product.id)

    if (!isFavorite) {
      await this.setProducts([...products, product])
      return await this.updateCount()
    }

    if (isFavorite) {
      const filteredFavorites = products.filter(item => item.id !== product.id)
      await this.setProducts(filteredFavorites)
      return await this.updateCount()
    }
  }

  private async updateCount() {
    const products = await this.getProducts()
    const count = products.length

    const favoriteCount = document.querySelector('.js__favorites-counter')
    const favoritesLink = document.querySelector('.favoritesLink')

    if (count !== 0) {
      favoriteCount!.textContent = String(count)
      favoritesLink!.classList.add('active')
    } else {
      favoriteCount!.textContent = ''
      favoritesLink!.classList.remove('active')
    }
  }
}

export const favoriteService = new FavoriteService();