/* eslint-disable import/prefer-default-export */
export class GitHubRepo {
  constructor({
    name, stars, license, url
  }) {
    this.name = name;
    this.stars = stars;
    this.license = license;
    this.url = url;
  }

  get starsInfo() {
    return this.stars > 0 ? `(${this.stars} *)` : '';
  }

  toString() {
    return `${this.name} ${this.starsInfo}`;
  }

  toTableRow() {
    return (`
      <tr onclick="location.assign('${this.url})">
        <td>
            ${this.name}
        </td>
        <td>
            ${this.starsInfo}
        </td>
      </tr>
    `);
  }
}
