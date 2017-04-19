/**
 * @file api
 * @author zhouqing02
 */

import Vue from 'vue';
import {API_ROOT} from 'config';

function fetch(url, params = {}) {

    Object.assign(params, {
        credentials: true
    });

    return new Promise((resolve, reject) => {
        Vue.http.get(`${API_ROOT}${url}`, {
            params: params
        }).then(res => {
            let resObj = res.body;
            if (resObj.hasOwnProperty('data') && resObj.code === 0) {
                resolve(resObj.data);
            } else {
                reject(resObj.msg);
            }
        }, reject);
    });
}

export function fetchFAQList() {
    return fetch('getFAQ');
}

export function fetchSuggestionsByKey(key) {
    return fetch(`getHOT?keyword=${key}`);
}

export function fetchResultsByKey(key) {
    return fetch(`search?q=${key}`);
}

export function fetchProblemsByPage(page) {
    return fetch(`getProblem?page=${page}`);
}

export function fetchUserQuestionList(status) {
    return fetch(`getUserQuestion?status=${status}`);
}

export function addQuestion(q, a) {
    return fetch(`addUserQuestion?question=${q}&answer=${a}`);
}

export function addAnswer(id, answer) {
    return fetch(`addAnswer?id=${id}&answer=${answer}`);
}

export function addUserAnswer(id, answer) {
    return fetch(`addUserAnswer?id=${id}&content=${answer}`);
}

export function upItem(id) {
    return fetch(`up?id=${id}`);
}

export function downItem(id, answer) {
    return fetch(`down?id=${id}`);
}
