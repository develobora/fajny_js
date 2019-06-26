/* eslint-disable import/prefer-default-export,no-undef,no-unused-vars */
import { getAboutMe } from '../github/service';

export class AboutMe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async render() {
    const about = (await getAboutMe());
    this.shadowRoot.innerHTML = (`
      <mark-down>
        ${about}
      </mark-down>
    `);
  }
}
