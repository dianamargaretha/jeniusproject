import axios from 'axios';
import { store } from '../configurations/Configs_middleware';

let URIS = {
    setURI: 'https://simple-contact-crud.herokuapp.com'
};

const Axios = () => {
    const authToken = store.getState().GlobalStates.auth_token;
    let instance = axios.create();
    instance.defaults.timeout = 1000 * 30; // Wait for 30 seconds
    instance.defaults.headers.common['Content-Type'] = 'application/json';
    if (authToken) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    return instance;
}

export const ServicesAPI = {
    getAll: (endpointName) => {
        let resourceURI = `${URIS.setURI}/${endpointName}`;

        return Axios().get(resourceURI, query)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                ShowNotification(error);
                throw error;
            });
    },
    getRequest: (endpointName, query) => {
        let resourceURI = `${URIS.setURI}/${endpointName}`;

        return Axios().get(resourceURI, query)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                ShowNotification(error);
                throw error;
            });
    },
    postRequest: (endpointName, query) => {
        let resourceURI = `${URIS.setURI}/${endpointName}`;

        return Axios().post(resourceURI, query)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                ShowNotification(error);
                throw error;
            });
    },
    putRequest: (endpointName, data, query) => {
        let resourceURI = `${URIS.setURI}/${endpointName}`;

        return Axios().put(resourceURI, data, query)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                ShowNotification(error);
                throw error;
            });
    }
}