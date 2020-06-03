import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'


const state = () => ({
    token: null,
    authStatusError: null
})

const mutations = {
    setToken(state, token) {
        if (token) {
            state.authStatusError = null
        }
        state.token = token
    },
    clearToken(state) {
        state.token = null
    },
    setAuthStatusError(state, error) {
        state.authStatusError = error
    }
}

const actions = {
    async login({ commit, dispatch }, formData) {
        try {
            const { token } = await this.$axios.$post('/api/auth/admin/login', formData)
            dispatch('setToken', token)
        } catch (e) {
            if (e.response) {
                if (e.response.status === 429) {
                    commit('setAuthStatusError', 429)
                } else {
                    commit('setError', e, { root: true })
                    throw e
                }
            } else {
                commit('setError', e, { root: true })
                throw e
            }
        }
    },
    async checkToken({ $axios, redirect }) {
        try {
            return await $axios.$get('/api/auth/admin/token')
        } catch (e) {
            redirect('/login?message=login')
        }
    },
    async setToken({ commit }, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-token', token)
    },
    async logout({ commit }) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
    },
    async autoLogin({ dispatch }) {
        const cookieStr = process.browser ?
            document.cookie :
            this.app.context.req.headers.cookie

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']

        if (isJWTValid(token)) {
            dispatch('setToken', token)
        } else {
            dispatch('logout')
        }
    }
}

const getters = {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token,
    authStatusError: state => state.authStatusError
}

function isJWTValid(token) {
    if (!token) {
        return false
    }

    const jwtData = jwtDecode(token) || {}
    const expires = jwtData.exp || 0

    return (new Date().getTime() / 1000) < expires
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};