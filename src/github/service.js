const REPOS_URL = 'https://api.github.com/users/develobora/repos';

export default function getRepos() {
  // eslint-disable-next-line no-undef
  return fetch(REPOS_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error('Response not 200');
    })
    .catch(err => console.warn(err));
}
