export function guid() {
  return `${Math.floor(Math.random() * Math.floor(Math.pow(2, 32) - 1))}`;
}