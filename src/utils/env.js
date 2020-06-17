const envs = [
  {
    name: 'api-base',
    originalName: 'VUE_APP_API_ENDPOINT_BASE'
  },
  {
    name: 'api-key',
    originalName: 'VUE_APP_API_KEY'
  },
  {
    name: 'movies-pages',
    originalName: 'VUE_APP_MOVIES_PAGES'
  }
];

export default name => {
  const envByName = envs.find(env => env.name === name);

  if (!envByName) {
    console.warn(`no env called "${name}" available`);
    return;
  }

  return process.env[envByName.originalName];
};
