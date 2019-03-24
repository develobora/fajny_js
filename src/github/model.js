/* eslint-disable import/prefer-default-export */
export class GitHubRepo {
  constructor({ name, stars, license }) {
    this.name = name;
    this.stars = stars;
    this.license = license;
  }

  get starsInfo() {
    return this.stars > 0 ? `(${this.stars} *)` : 'empty';
  }

  toString() {
    return `${this.name} ${this.starsInfo}`;
  }
}
