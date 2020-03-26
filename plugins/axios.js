export default function ({$axios, redirect, store}) {
    // перехват запроса с помощью interceptors
    $axios.interceptors.request.use(request => {
        if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
            const token = store.getters['auth/token']
            request.headers.common['Authorization'] = `Bearer ${token}`
        }
        return request
    })
    // обработка ошибок от axios
    $axios.onError(error => {
        if (error.response) {
            if (error.response.status === 402) {
                store.dispatch('auth/logout')
                redirect('/login?message=errorAuth')
            }

            if (error.response.status === 401) {
                store.dispatch('auth/logout')
                redirect('/login?message=login')
            }

            if (error.response.status === 429) {
                store.dispatch('auth/logout')
                redirect('/login?message=loginAttempts')
            }

            if (error.response.status === 500) {
                console.error('Server 500 error')
            }
        }
    })
}