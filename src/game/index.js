import TO_FIND from './random';
import getNum from './input';
import success from './success';
import info from './userInfo';
import counter from './counter';

export default () => {
  /* eslint-disable no-undef,no-alert */
  alert('Wylosowano liczbę z przedziału 1 - 50. Zgaduj!');
  let num = getNum();
  while (num !== TO_FIND) {
    counter.init();
    info(num, TO_FIND);
    num = getNum();
    counter.increment();
  }
  success(counter.result);
};
