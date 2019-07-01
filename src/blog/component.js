/* eslint-disable import/prefer-default-export,no-undef, no-unused-vars,no-tabs */
import { dom } from '@fortawesome/fontawesome-svg-core';

import { markdownRenderer } from '../common/decorator';
import style from './style.css';
import { getBlogPost, getBlogPostNames } from '../github/service';

export class HtmlElementWithContent extends HTMLElement {
  constructor(tag, tagStyle, content) {
    super();
    const element = document.createElement(tag);
    element.className = tagStyle;
    element.innerHTML = `
    <div class="${style.container}">
      ${content}
    </div>
    `;
    this.appendChild(element);
  }
}

export class Header extends HtmlElementWithContent {
  constructor() {
    super('header', style.header, `<h1 class="${style['header-heading']}">Yet another programmer's blog</h1>`);
  }
}

export class Footer extends HtmlElementWithContent {
  constructor() {
    super('footer', style.footer, '&copy; Copyright develobora 2018');
  }
}

export class Navigation extends HtmlElementWithContent {
  constructor() {
    super('nav', style['nav-bar'], `
      <ul class="${style.nav}">
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="../index.html">About me</a></li>
      </ul>`);
  }
}

export class Body extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async render(name = null) {
    const fullPost = !!name;
    const posts = fullPost ? [name] : await getBlogPostNames();
    this.shadowRoot.innerHTML = (`
    <section>
    ${this.renderStyles()}
        <div class="${style.container}">
          <main>
              ${
      posts
        .reverse()
        .map((postName, index) => (`
            <blog-post post-name="${postName}" full-post="${fullPost}"></blog-post>
            <button id="${index}-${postName}">${fullPost ? 'Back' : 'Read more...'}</button>
        `))
        .join('<hr>')
      }
            </main>
            <aside>
                <slot name="side-menu"></slot>
            </aside>
          </div>
      </section>
    `);
    posts.forEach((postName, index) => {
      this.shadowRoot.getElementById(`${index}-${postName}`)
        .addEventListener('click', () => {
          if (!fullPost) {
            this.render(postName);
          } else {
            this.render();
          }
        });
    });
  }

  renderStyles() {
    return (`
      <style>
          .${style.container} {
            max-width: 70em;
            margin: 0 auto; 
          }
          section {
            overflow: hidden;
            padding: 1em 1.25em;
            background-color: #fff; 
          }
          main, aside {
            margin-bottom: 1em;
          }
          @media (min-width: 55em) {
            section { padding: 2em 3em; }
            main {
                float: left;
                width: 65%;
                margin-right: 5%;
                margin-bottom: 1em;
            }
            aside {
              float: left;
              width: 30%;
              margin-bottom: 1em;
            }
          }
      </style>
    `);
  }
}

@markdownRenderer
export class BlogPost extends HTMLElement {
  // noinspection JSUnusedGlobalSymbols
  static get observedAttributes() {
    return ['post-name', 'full-post'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // noinspection JSUnusedGlobalSymbols
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  async render() {
    this.loading();
    const name = this.getAttribute('post-name');
    const fullPost = this.getAttribute('full-post') === 'true';
    const content = (await getBlogPost(`${name}.md`));
    this.shadowRoot.innerHTML = (`
      <article>  
        ${this.renderMarkdown(fullPost ? content : `${content.substr(0, 300)}...`)}
      </article>
      <style>
        pre {
          width: 100%;
          overflow: scroll;
        }
        img { width: 100%; }
      </style>
    `);
  }

  loading() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(document.getElementById('blog-loading')
      .content
      .cloneNode(true));
    dom.i2svg({ node: this.shadowRoot });
  }
}
