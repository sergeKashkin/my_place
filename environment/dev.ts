export interface environmentType {
    cmsUrl: string;
    isProduction: boolean;
};

const environment: environmentType = {
    cmsUrl: "https://myplace-strapi.herokuapp.com/",
    isProduction: false
};

export { environment };