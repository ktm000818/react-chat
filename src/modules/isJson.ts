export default function isJson(value: string) {
  try {
    JSON.parse(value);
  } catch (error) {
    return false;
  }
}
