/* eslint-disable no-console,no-undef */
import { GitHubRepo } from './model';

const REPOS_URL = 'https://api.github.com/users/mat3e/repos';
const FORBIDDEN_REPOS = ['ux'];

const convert = ({
  name,
  stargazers_count: stars,
  license
}) => new GitHubRepo({
  name,
  stars,
  license: license ? license.spdx_id : ''
});

export default async function getRepos() {
  try {
    const response = await fetch(REPOS_URL);
    if (response.ok) {
      return (await response.json())
        .filter(r => !FORBIDDEN_REPOS.includes(r.name))
        .map(convert);
    }
    throw Error('Response not 200');
  } catch (err) {
    console.warn(err);
    return [];
  }
}
