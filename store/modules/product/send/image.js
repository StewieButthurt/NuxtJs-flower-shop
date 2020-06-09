const state = () => ({
    status: true
})

const mutations = {

}

const actions = {
    async sendImages({ dispatch, rootGetters }, id) {
        await dispatch('modules/product/images/imagesFilter', null, { root: true })

        const images = await rootGetters['modules/product/images/images']


        await dispatch('modules/product/preview/main/setCounterImage',
            0, { root: true })



        for (let i = 0; i < images.length; i++) {

            let image = images[i].previewImg


            await dispatch('modules/product/preview/main/setMessageStatus',
                `Загрузка картинок ${i + 1} из ${images.length}...`, { root: true })

            if (typeof image === 'object') {

                if (image.type === 'image/png' ||
                    image.type === 'image/jpeg') {


                    await new Promise(async(resolve, reject) => {
                            const readerPreview = new FileReader();

                            readerPreview.onload = async(e) => {
                                resolve(e.target.result)
                            }

                            readerPreview.readAsDataURL(image);
                        })
                        .then(async(image) => {
                            let data = {
                                image: image,
                                index: i,
                                id: id
                            }

                            if (image) {
                                const responseImages = await this.$axios
                                    .$post('/api/product/create/images', data)

                                return responseImages
                            }
                        })
                        .then(async(response) => {
                            await dispatch('modules/product/preview/main/counterImageIncrement',
                                null, { root: true })
                        })
                        .catch(async(e) => {
                            await dispatch('modules/product/preview/main/setMessageStatus',
                                'При загрузке произошла ошибка! Попробуйте еще раз!', { root: true })

                            await dispatch('modules/product/preview/main/setCheckErrorImage',
                                e, { root: true })

                            setTimeout(async() => {
                                await dispatch('modules/product/preview/main/setOverlayChange',
                                    false, { root: true })
                            }, 1000);
                            console.error(e)
                        })
                }
            } else {
                let data = {
                    image: image,
                    index: i,
                    id: id
                }

                try {
                    const responseImages = await this.$axios
                        .$post('/api/product/create/images', data)

                    await dispatch('modules/product/preview/main/counterImageIncrement',
                        null, { root: true })

                } catch (e) {
                    await dispatch('modules/product/preview/main/setMessageStatus',
                        'При загрузке произошла ошибка! Попробуйте еще раз!', { root: true })

                    await dispatch('modules/product/preview/main/setCheckErrorImage',
                        e, { root: true })

                    setTimeout(async() => {
                        await dispatch('modules/product/preview/main/setOverlayChange',
                            false, { root: true })
                    }, 1000);

                    console.error('Error:', e);
                }

            }

            if (await rootGetters['modules/product/preview/main/counterImage'] === images.length) {

                await dispatch('modules/product/preview/main/setProgressValue',
                    60, { root: true })

                return id
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