import {ConfigAPI as process} from "@babel/core";

const dev = {
    api: {
        API_URL: "https://localhost:63333/",
    },

};

const prod = {
    api: {
        API_URL: "https://localhost:63333/",
    },

};


const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

