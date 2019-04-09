/* eslint-disable no-undef,no-alert */
import { getJoke } from './service';

export default async function () {
  alert(await getJoke());
}
