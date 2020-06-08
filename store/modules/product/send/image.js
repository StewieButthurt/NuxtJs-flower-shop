const state = () => ({
    status: true
})

const mutations = {

}

const actions = {
    async sendImages({ dispatch, rootGetters }, { id, images }) {
        await dispatch('modules/product/images/imagesFilter', null, { root: true })

        await dispatch('modules/product/preview/main/setCounterImage',
            0, { root: true })

        for (let i = 0; i < images.length; i++) {
            let image = images[i].previewImg

            await dispatch('modules/product/preview/main/setMessageStatus',
                `Загрузка картинок ${i + 1} из ${images.length}...`, { root: true })

            if (typeof image === 'object') {

                if (image.type === 'image/png' ||
                    image.type === 'image/jpeg') {

                    try {
                        await dispatch('modules/product/preview/toBase64/toBase64',
                            image, { root: true })

                        image = await rootGetters['modules/product/preview/toBase64/image']

                        if (image) {
                            let data = {
                                image: image,
                                index: i,
                                id: id
                            }

                            const responseImages = await this.$axios.$post('/api/product/create/images',
                                data)
                            await dispatch('modules/product/preview/main/counterImageIncrement',
                                null, { root: true })
                        } else {

                        }

                    } catch (e) {
                        await dispatch('modules/product/preview/main/setMessageStatus',
                            'При загрузке произошла ошибка! Попробуйте еще раз!', { root: true })

                        await dispatch('modules/product/preview/main/setCheckErrorImage',
                            e, { root: true })

                        setTimeout(async function() {
                            await dispatch('modules/product/preview/main/setOverlayChange',
                                false, { root: true })
                        }, 1000);

                        console.error(e);
                    }

                    if (rootGetters['modules/product/preview/main/counterImage'] === images.length) {
                        await dispatch('modules/product/preview/main/setProgressValue',
                            60, { root: true })

                        return id
                    }

                }
            } else {
                let data = {
                    image: image,
                    index: i,
                    id: id
                }

                try {
                    const responseImages = await this.$axios.$post('/api/product/create/images',
                        data)

                    await dispatch('modules/product/preview/main/counterImageIncrement',
                        null, { root: true })

                } catch (e) {
                    await dispatch('modules/product/preview/main/setMessageStatus',
                        'При загрузке произошла ошибка! Попробуйте еще раз!', { root: true })

                    await dispatch('modules/product/preview/main/setCheckErrorImage',
                        e, { root: true })

                    setTimeout(async function() {
                        await dispatch('modules/product/preview/main/setOverlayChange',
                            false, { root: true })
                    }, 1000);

                    console.error('Error:', e);
                }

                if (rootGetters['modules/product/preview/main/counterImage'] === images.length) {

                    await dispatch('modules/product/preview/main/setProgressValue',
                        60, { root: true })

                    return id

                }
            }
        }
    }
}

const getters = {
    status: state => state.status
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};