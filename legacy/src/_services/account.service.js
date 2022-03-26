import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { history } from '_helpers';

const cookies = new Cookies();
const baseUrl = `${process.env.REACT_APP_API_URL}/accounts`;
const accountSubject = new BehaviorSubject(null);

export const accountService = {
    login,
    cookieLogin,
    apiAuthenticate,
    logout,
    getAll,
    getById,
    update,
    delete: _delete,
    account: accountSubject.asObservable(),
    get accountValue() { return accountSubject.value; }
};

async function auth(accessToken) {
    await apiAuthenticate(accessToken);

    // get return url from location state or default to home page
    const { from } = history.location.state || { from: { pathname: "/" } };
    history.push(from);
}

async function login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;

    cookies.set('accessToken', authResponse.accessToken, { path: '/', maxAge: authResponse.expiresIn });

    await auth(authResponse.accessToken)
}

async function cookieLogin() {
    const accessToken = cookies.get('accessToken');;
    if (!accessToken) return;

    await auth(accessToken);
}

async function apiAuthenticate(accessToken) {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a JWT auth token
    const response = await axios.post(`${baseUrl}/authenticate`, { accessToken });
    const account = response.data;
    accountSubject.next(account);
    // startAuthenticateTimer();
    return account;
}

function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
    accountSubject.next(null);
    history.push('/login');
}

function getAll() {
    return axios.get(baseUrl)
        .then(response => response.data);
}

function getById(id) {
    return axios.get(`${baseUrl}/${id}`)
        .then(response => response.data);
}

async function update(id, params) {
    const response = await axios.put(`${baseUrl}/${id}`, params);
    let account = response.data;
    // update the current account if it was updated
    if (account.id === accountSubject.value?.id) {
        // publish updated account to subscribers
        account = { ...accountSubject.value, ...account };
        accountSubject.next(account);
    }
    return account;
}

async function _delete(id) {
    await axios.delete(`${baseUrl}/${id}`);
    if (id === accountSubject.value?.id) {
        // auto logout if the logged in account was deleted
        logout();
    }
}
