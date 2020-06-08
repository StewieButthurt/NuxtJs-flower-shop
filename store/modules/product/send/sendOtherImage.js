const state = () => ({
    status: true,
    images: [],
    errors: false,
    newId: null,
    counter: 0
})

const mutations = {
    setImages(state, arr) {
        state.images = arr
    },
    setNewId(state, id) {
        state.newId = id
    },
    counterIncrement(state) {
        state.counter++
    },
    setCounter(state, value) {
        state.counter = value
    },
    setErrors(state, value) {
        state.errors = value
    }
}

const actions = {
    async sendOtherImages({ dispatch, rootGetters, getters, commit }, id) {

        await commit('setErrors', false)
        await commit('setImages', [])
        await commit('setNewId', null)
        await dispatch('filterOtherFieldImage')

        const images = await getters['images']

        for (let i = 0; i < images.length; i++) {

            await commit('setCounter', 0)

            let data = {
                id: id,
                title: images[i].title
            }

            if (!getters['errors']) {
                try {
                    const responseImageTitle = await this.$axios
                        .$post('/api/product/create/other-image-title', data)

                    await dispatch('modules/product/preview/main/setMessageStatus',
                        'Подготовка загрузки дополнительных изображений...', { root: true })

                    const responseProductId = await this.$axios.
                    $get('/api/product/get-product-id', { params: { id: id } })

                    console.log(responseProductId)
                    console.log(responseProductId.otherFieldImage[i])
                    console.log(responseProductId.otherFieldImage[i]._id)

                    await commit('setNewId', responseProductId.otherFieldImage[i]._id)

                    for (let k = 0; k < images[i].info.length; k++) {
                        let image = images[i].info[k].image.previewImg

                        if (typeof image === "object" && !getters['errors']) {

                            if (image.type === 'image/png' || image.type === 'image/jpeg') {

                                await dispatch('modules/product/preview/toBase64/toBase64',
                                    image, { root: true })

                                image = await rootGetters['modules/product/preview/toBase64/image']

                                await dispatch('modules/product/preview/main/setMessageStatus',
                                    `Загрузка картинок из раздела '${images[i].title}'  
                                ${i + 1} из ${images[i].info.length}...`, { root: true })

                                data = {
                                    image: image,
                                    id: id,
                                    newId: await getters['newId'],
                                    title: images[i].info[k].title,
                                    index: k,
                                    globalIndex: i
                                }

                                const responseOtherImages = await this.$axios
                                    .$post('/api/product/create/other-images', data)

                                await commit('counterIncrement')
                            }
                        } else {

                            if (!getters['errors']) {
                                await dispatch('modules/product/preview/main/setMessageStatus',
                                    `Загрузка картинок из раздела '${images[i].title}'  
                                ${i + 1} из ${images[i].info.length}...`, { root: true })

                                data = {
                                    image: image,
                                    id: id,
                                    newId: await getters['newId'],
                                    title: images[i].info[k].title,
                                    index: k,
                                    globalIndex: i
                                }

                                const responseOtherImages = await this.$axios
                                    .$post('/api/product/create/other-images', data)

                                await commit('counterIncrement')
                            }

                        }
                    }

                } catch (e) {
                    await dispatch('modules/product/preview/main/setMessageStatus',
                        'При загрузке произошла ошибка!', { root: true })

                    await commit('setErrors', e)

                    setTimeout(async function() {
                        await dispatch('modules/product/preview/main/setOverlayChange',
                            false, { root: true })
                    }, 1000);

                    console.error('Error:', e);
                }
            }

            if (i + 1 === images.length) {

                await dispatch('modules/product/preview/main/setProgressValue',
                    100, { root: true })

                await dispatch('modules/product/preview/main/setMessageStatus',
                    'Загрузка завершена!', { root: true })

                setTimeout(async function() {
                    await dispatch('modules/product/preview/main/setOverlayChange',
                        false, { root: true })
                }, 1000);

                return true

            }
        }
    },
    async filterOtherFieldImage({ commit, rootGetters }) {
        let images = await rootGetters['modules/product/otherFieldImages/otherFieldImage']
        let arr = [];

        for (let i = 0; i < images.length; i++) {
            arr.push({
                title: images[i].title,
                info: [],
                token: images[i].token
            })
            for (let k = 0; k < images[i].info.length; k++) {
                if (images[i].info[k].image.previewImg) {
                    arr[i].info.push(images[i].info[k])
                }
            }
        }

        commit('setImages', arr)
    }
}

const getters = {
    status: state => state.status,
    images: state => state.images,
    errors: state => state.errors,
    newId: state => state.newId
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};