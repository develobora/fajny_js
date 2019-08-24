/* eslint-disable import/prefer-default-export,no-undef, no-unused-vars,no-tabs */
import { dom } from '@fortawesome/fontawesome-svg-core';

import { markdownRenderer, renderer } from '../common/decorator';
import style from './style.css';
import { getBlogPost } from '../github/service';
import { getNextPosts, getNextPost } from '../github/generator';

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

@renderer()
export class Body extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  async render(name = null) {
    this.posts = getNextPosts();
    const fullPost = !!name;
    const names = fullPost ? [name] : (await this.posts.next()).value;
    this.shadowRoot.innerHTML = (`
    ${this.renderStyles()}
    <section>
        <div class="${style.container}">
          <main>
              ${this.renderPostComponents(names, fullPost)}
            </main>
            <aside>
                <slot name="side-menu"></slot>
            </aside>
          </div>
      </section>
    `);
    this.attachClickCallbacks(names, fullPost);
  }

  async uprender() {
    const generated = await this.posts.next();
    const names = generated.value;
    if (names.length) {
      const main = this.shadowRoot.querySelector('main');
      const nextPosts = document.createElement('div');
      nextPosts.className = 'next-posts';
      nextPosts.innerHTML = `<hr>${this.renderPostComponents(names)}`;
      main.appendChild(nextPosts);
      this.attachClickCallbacks(names);
    }
    if (generated.done) {
      this.shadowRoot.getElementById('load-more')
        .remove();
    }
  }

  renderPostComponents = (names, fullPost = false) => {
    const postComponents = names.map((postName, index) => (`
        <blog-post post-name="${postName}" full-post="${fullPost}"></blog-post>
        <button id="${index}-${postName}">${fullPost ? 'Back' : 'Read more...'}</button>
      `))
      .join('<hr>');
    return `${postComponents}<button id="load-more">${fullPost ? 'Next >>' : 'Load more...'}</button>`;
  };

  attachClickCallbacks(names, fullPost = false) {
    names.forEach((postName, index) => {
      this.shadowRoot.getElementById(`${index}-${postName}`)
        .onclick = () => {
          if (!fullPost) {
            this.fullPost = getNextPost(postName);
            this.render(postName);
          } else {
            this.render();
          }
        };
      const loadMoreBtn = this.shadowRoot.getElementById('load-more');
      loadMoreBtn.onclick = async () => {
        loadMoreBtn.remove();
        if (fullPost) {
          this.render((await this.fullPost.next()).value);
        } else {
          this.uprender();
        }
      };
    });
  }

  renderStyles = () => (`
      <style>
          #load-more {
            display: block;
            padding: 1em;
            margin: 0 auto;
          }
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

@renderer(true)
@markdownRenderer
export class BlogPost extends HTMLElement {
  // noinspection JSUnusedGlobalSymbols
  static get observedAttributes() {
    return ['post-name', 'full-post'];
  }

  constructor() {
    super();
    this.init();
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
