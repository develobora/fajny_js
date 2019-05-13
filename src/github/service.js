/* eslint-disable no-console,no-undef */
import { GitHubRepo } from './model';

const REPOS_URL = 'https://api.github.com/users/mat3e/repos';
const RAW_URL = 'https://raw.githubusercontent.com/develobora/develobora.github.io/master/blog/en/';
const POSTS_SUB_URL = 'posts/';
const FILES_URL = 'https://api.github.com/repos/develobora/develobora.github.io/contents/blog/en/posts';

const FORBIDDEN_REPOS = ['ux'];
const POST_NAME = /(\d+)\.md/;

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

async function getRawFileContent(pathToFile) {
  try {
    const response = await fetch(`${RAW_URL}${pathToFile}`);
    if (response.ok) {
      return (await response.text());
    }
    throw Error('Response not 200');
  } catch (err) {
    console.warn(err);
    return [];
  }
}

export async function getBlogPost(name = '0.md') {
  return getRawFileContent(`${POSTS_SUB_URL}${name}`);
}

export async function getAboutMe() {
  return getRawFileContent('about-me.md');
}

export async function getBlogPostNames() {
  try {
    const response = await fetch(FILES_URL);
    if (response.ok) {
      return (await response.json())
        .filter(file => POST_NAME.test(file.name))
        .map(({ name }) => name.split('.')[0]);
    }
    throw Error('Response not 200');
  } catch (err) {
    console.warn(err);
    return [];
  }
}
