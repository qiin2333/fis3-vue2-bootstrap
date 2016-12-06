/**
 * @file store
 * @author zhouqing02
 */


import Vue from 'vue';
import Vuex from 'vuex';
import * as api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentQueryValue: '',
        faqList: [],
        resultList: [],
        suggestionMap: {/* [key: string]: SingleItem */},
        currentProblems: {},
        userQuestionList: {
            unsolved: [],
            solved: []
        }
    },

    actions: {
        FETCH_FAQ_LIST: ({commit, dispatch, state}) => {
            return api.fetchFAQList()
                .then(data => {
                    commit('SET_FAQ_LIST', data);
                });
        },
        FETCH_SUG_LIST: ({commit, state}, {key}) => {
            return api.fetchSuggestionsByKey(key)
                .then(data => {
                    commit('SET_SUG_LIST', {
                        key,
                        sugList: data
                    });
                });
        },
        FETCH_RESULT_LIST: ({commit, state}, {key}) => {
            return api.fetchResultsByKey(key)
                .then(data => {
                    commit('SET_RESULT_LIST', data);
                });
        },
        FETCH_PROBLEM_LIST: ({commit, state}, {page}) => {
            return api.fetchProblemsByPage(page)
                .then(data => {
                    commit('SET_PROBLEM_LIST', data);
                });
        },
        FETCH_USER_QUESTION_LIST: ({commit, state}, {status}) => {
            return api.fetchUserQuestionList(status)
                .then(data => {
                    commit('SET_USER_QUESTION_LIST', {
                        data,
                        status
                    });
                });
        },
        ADD_QUESTION: ({commit, state}, {question, answer}) => {
            return api.addQuestion(question, answer)
                .then(data => {
                    commit('ADD_UNSOLVED', {
                        id: data.id,
                        content: question,
                        answer: [{
                            id: data.id,
                            content: answer
                        }]
                    });
                });
        },
        ADD_ANSWER: ({commit, state}, {id, answer}) => {
            return api.addAnswer(id, answer)
                .then(data => {
                    commit('DE_PROBLEM', id);
                });
        },
        ADD_USER_ANSWER: ({commit, state}, {id, answer}) => {
            return api.addUserAnswer(id, answer)
                .then(data => {
                    commit('DE_UNSOLVED', id);
                    commit('SET_SOLVED_ITEM', {id, answer});
                });
        },
        UP_ITEM: ({commit, state}, {id}) => {
            return api.upItem(id).then(data => {
                commit('ADD_UP_COUNT', id);
            });
        },
        DOWN_ITEM: ({commit, state}, {id}) => {
            return api.downItem(id).then(data => {
                commit('ADD_DOWN_COUNT', id);
            });;
        }
    },

    mutations: {
        SET_QUERY_VAL: (state, val) => {
            state.currentQueryValue = val;
        },
        SET_FAQ_LIST: (state, faqList) => {
            state.faqList = faqList;
        },
        SET_SUG_LIST: (state, {key, sugList}) => {
            Vue.set(state.suggestionMap, key, sugList);
        },
        SET_RESULT_LIST: (state, resultList) => {
            state.resultList = resultList;
        },
        SET_PROBLEM_LIST: (state, problemList) => {
            state.currentProblems = problemList;
        },
        SET_USER_QUESTION_LIST: (state, {data, status}) => {
            Vue.set(state.userQuestionList, (status === '1' ? 'solved' : 'unsolved'), data);
        },
        ADD_UP_COUNT(state, id) {
            state.resultList.forEach((item, index, array) => {
                if (item.id === id) {
                    item.up++;
                    return false;
                }
            });
        },
        ADD_DOWN_COUNT(state, id) {
            state.resultList.forEach((item, index, array) => {
                if (item.id === id) {
                    item.down++;
                    return false;
                }
            });
        },
        DE_PROBLEM(state, pid) {
            state.currentProblems.list.forEach((item, index, array) => {
                if (item.id === pid) {
                    array.splice(index, 1);
                    return false;
                }
            });
        },
        SET_SOLVED_ITEM(state, {id, answer}) {
            state.userQuestionList.solved.forEach((item, index, array) => {
                if (item.id === id) {
                    item.answer.push({
                        id,
                        content: answer
                    });
                    return false;
                }
            });
        },
        ADD_UNSOLVED(state, item) {
            state.userQuestionList.unsolved.push(item);
        },
        DE_UNSOLVED(state, id) {
            state.userQuestionList.unsolved.forEach((item, index, array) => {
                if (item.id === id) {
                    array.splice(index, 1);
                    return false;
                }
            });
        }
    },

    getters: {
        solved: state => state.userQuestionList.solved,
        unsolved: state => state.userQuestionList.unsolved
    }
});
