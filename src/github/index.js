import getRepos from './service';

export default function () {
  // eslint-disable-next-line
  getRepos().then(arr => alert(arr.length));
}
