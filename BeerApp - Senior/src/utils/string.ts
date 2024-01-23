const getStringForApi = (data: string) => data.toLowerCase().replaceAll(' ', '_');

const capitalizeFirstLetter = (data: string) => data.charAt(0).toUpperCase() + data.slice(1);

const getUrlDomain = (url: string) => {
  const pattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/img;
  return pattern.exec(url)?.[1];
}

export { getStringForApi, capitalizeFirstLetter, getUrlDomain };
