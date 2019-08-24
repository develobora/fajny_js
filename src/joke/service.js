/* eslint-disable no-tabs,import/prefer-default-export,no-undef */

import { Joke } from './model';

const JOKE_URL = 'https://official-joke-api.appspot.com/random_joke';
const FALLBACK_JOKE_URL = 'http://api.icndb.com/jokes/random?limitTo=[nerdy]';

export async function getJoke() {
  try {
    const response = await fetch(JOKE_URL);
    const joke = await response.json();
    if (joke.type === 'programming') {
      return new Joke(joke);
    }
    const { value: { joke: punchline } } = await (await fetch(FALLBACK_JOKE_URL)).json();
    return new Joke({ punchline });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return new Joke({
      setup: 'Why do Java programmers wear glasses?',
      punchline: 'Because they don\'t C#'
    });
  }
}
