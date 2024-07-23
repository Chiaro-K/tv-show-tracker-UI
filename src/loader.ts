const config: any = {};
export default config;

function load() {
  return fetch(`${process.env.PUBLIC_URL}/config.json`, {
    headers: {
      method: "GET",
      Expires: "0",
      "Cache-Control": "no-store",
    },
  })
    .then((result) => result.json())
    .then((newconfig) => {
      for (const prop in config) {
        delete config[prop];
      }
      for (const prop in newconfig) {
        config[prop] = newconfig[prop];
      }
      return config;
    });
}
export { load };
