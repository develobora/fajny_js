/* eslint-disable import/prefer-default-export */
import { getBlogPostNames } from './service';

const MAX_PARALLEL_POST = 5;

async function getPostNames() {
  return (await getBlogPostNames()).reverse();
}

// eslint-disable-next-line consistent-return
export async function* getNextPosts() {
  const postNames = await getPostNames();
  let index = 0;
  while (index < postNames.length) {
    const result = postNames.slice(index, index + MAX_PARALLEL_POST);
    index += MAX_PARALLEL_POST;
    if (result.length < MAX_PARALLEL_POST) {
      return result;
    }
    yield result;
  }
}

export async function* getNextPost(name = '0') {
  const postNames = await getPostNames();
  let index = postNames.indexOf(name) + 1;
  while (index < postNames.length - 1) {
    yield postNames[index];
    index += 1;
  }
  return postNames[index];
}
