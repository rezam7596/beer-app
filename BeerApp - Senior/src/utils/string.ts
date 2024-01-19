const getStringForApi = (data: string) => data.toLowerCase().replaceAll(' ', '_');
const capitalizeFirstLetter = (data: string) => data.charAt(0).toUpperCase() + data.slice(1);

export { getStringForApi, capitalizeFirstLetter };
