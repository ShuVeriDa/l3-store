import html from "./searchTips.tpl.html";
import {Component} from "../component";
import {ProductData} from "../../../types";

export class SearchTips extends Component {
  async render() {
    const res = await fetch('/api/getProducts');
    const products: ProductData[] = await res.json();
    const tips = products.map(item => item.name)

    const generateRandomEl = (tips: string[]) => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    }

    const generateRandomTips = () => {
      const tipsEls = document.querySelectorAll('.tip')

      tipsEls.forEach((item) => {
        const title  = generateRandomEl(tips)
        const [first, second] = title.split(' ')
        item.textContent = `${first} ${second}`
      })
    }

    generateRandomTips()
  }
}

export const searchTipsComp = new SearchTips(html);