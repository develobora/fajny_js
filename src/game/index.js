import TO_FIND from './random';
import getNum from './input';
import success from './success';
import info from './userInfo';

export default () => {
  let num = getNum();
  const count = 0;
  while (num !== TO_FIND) {
    info(num, TO_FIND);
    num = getNum();
  }
  success(count);
};
