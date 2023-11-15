import html from "./searchTips.tpl.html";
import {Component} from "../component";
import {ProductData} from "../../../types";

interface ITips {
  name: string,
  url: string
}

export class SearchTips extends Component {
  async render() {
    const res = await fetch('/api/getProducts');
    const products: ProductData[] = await res.json();
    const tips = products.map(item => {
     return {
       name: item.name,
       url: `product?id=${item.id}`
     }
    })

    const generateRandomEl = (tips: ITips[]) => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    }

    const generateRandomTips = () => {
      const tipsEls = document.querySelectorAll('.tip')

      tipsEls.forEach((item) => {
        const obj  = generateRandomEl(tips)
        const [first, second] = obj.name.split(' ')

        item.textContent = `${first} ${second}`
        item.setAttribute('href', obj.url)
      })
    }

    generateRandomTips()
  }
}

export const searchTipsComp = new SearchTips(html);