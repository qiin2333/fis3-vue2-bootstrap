/**
 * @file api
 * @author zhouqing02
 */

import Vue from 'vue';
import moment from 'moment';
import {API_ROOT} from 'config';

function fetch(child) {
    return new Promise((resolve, reject) => {
        Vue.http.get(API_ROOT + child, {
            credentials: true
        }).then(res => {
            resolve(res.body.data);
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
