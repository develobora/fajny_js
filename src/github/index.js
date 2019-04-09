/* eslint-disable no-undef,no-alert */
import getRepos from './service';

export default async function () {
  (await getRepos()).forEach(r => alert(r));
}
