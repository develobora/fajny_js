// eslint-disable-next-line import/prefer-default-export
export function logging(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log(`Property ${prop} was got`);
      return target[prop];
    }
  });
}
