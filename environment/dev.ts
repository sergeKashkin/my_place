export interface environmentType {
    cmsUrl: string;
    isProduction: boolean;
};

const environment: environmentType = {
    cmsUrl: "http://localhost:1337",
    isProduction: false
};

export { environment };