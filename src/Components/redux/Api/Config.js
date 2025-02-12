const HOST = 'http://43.205.18.14:8085/';

// const HOST = 'http://43.205.18.14:8080/';



export const getLocalToken = () => localStorage.getItem('generate_token') || null;

export const getAuthToken = () => localStorage.getItem('authcheck') || null;

export const getHost = () => HOST;

export const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        //  'crossDomain': 'true',
    };
};