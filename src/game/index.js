import TO_FIND from './random';
import getNum from './input';
import success from './success';
import info from './userInfo';
import counter from './counter';

export default () => {
  let num = getNum();
  const count = 0;
  while (num !== TO_FIND) {
    counter.init();
    info(num, TO_FIND);
    num = getNum();
    counter.increment();
  }
  success(counter.result);
};
