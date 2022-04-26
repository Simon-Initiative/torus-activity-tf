export function createHandler(id, event, fn) {
  get(id)
  .addEventListener(event, () => {
    fn();
  });
}

export function get(id) {
  return document
  .getElementById(id);
}