/* eslint-disable import/prefer-default-export,no-undef */
import { getBlogPost } from '../github/service';

export class BlogPost extends HTMLElement {
  // noinspection JSUnusedGlobalSymbols
  static get observedAttributes() {
    return ['post-name'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  // noinspection JSUnusedGlobalSymbols
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  async render() {
    this.clean();
    const name = this.getAttribute('post-name');
    const md = document.createElement('mark-down');
    md.textContent = (await getBlogPost(`${name}.md`));
    this.shadow.appendChild(md);
  }

  clean() {
    this.shadow.childNodes.forEach(child => child.remove());
  }
}
