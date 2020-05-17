<template>
    <div>

    </div>
</template>

<script>
    export default {
        methods: {
            async test() {
                await this.$axios.$post('/api/product/create/other-image-title', data)
                    .then(async function (response) {
                        vm.$emit('changeMessageStatus', 'Подготовка загрузки дополнительных изображений...' )
                        
                        await vm.$axios.$get('/api/product/get-product-id', {params : { id: mainId }})
                            .then(async function (response) {
                                    newId = response.otherFieldImage[k]._id
                            })
                            .catch(function (error) {

                                vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                                checkError = error

                                setTimeout(() => {
                                    vm.$emit('overlayOffError')
                                }, 1000);

                                console.log(error);

                                throw error

                            })

                            

                        for(let i = 0; i < otherImage.info.length; i++) {

                                let image = otherImage.info[i].image.previewImg

                                var readerPreview = new FileReader();

                                if(typeof image === "object") {
                                    if(image.type === 'image/png' || image.type === 'image/jpeg') {
                                        readerPreview.onload = async function(e) {

                                            if(checkError === false) {

                                                vm.$emit('changeMessageStatus', `Загрузка картинок из раздела '${otherImage.title}'  ${i + 1} из ${otherImage.info.length}...` )
                                                
                                                data = {
                                                    image: e.target.result,
                                                    id: id,
                                                    newId: newId,
                                                    title: otherImage.info[i].title,
                                                    index: i,
                                                    globalIndex: k
                                                }

                                                await vm.$axios.$post('/api/product/create/other-images', data)
                                                    .then(async function (response) {
                                                                counter++
                                                    })
                                                    .catch(function (error) {
                                                        vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                                                        checkError = error

                                                        setTimeout(() => {
                                                            vm.$emit('overlayOffError')
                                                        }, 1000);

                                                        console.log(error);

                                                        throw error
                                                    })
                                            } else {
                                                return checkError
                                            }
                                        }

                                        await readerPreview.readAsDataURL(image);

                                    } else {
                                        vm.$emit('changeMessageStatus', `При загрузке произошла ошибка! Неверный формат у '${image.name}'` )

                                        checkError = error

                                        setTimeout(() => {
                                            vm.$emit('overlayOffError')
                                        }, 1000);

                                        console.log(error);

                                        throw error
                                    }
                                } else {
                                    if(checkError === false) {

                                        vm.$emit('changeMessageStatus', `Загрузка картинок из раздела '${otherImage.title}'  ${i + 1} из ${otherImage.info.length}...` )
                                        
                                        data = {
                                            image: image,
                                            id: id,
                                            newId: newId,
                                            title: otherImage.info[i].title,
                                            index: i,
                                            globalIndex: k
                                        }

                                        await vm.$axios.$post('/api/product/create/other-images', data)
                                            .then(async function (response) {
                                                        counter++
                                            })
                                            .catch(function (error) {
                                                vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                                                checkError = error

                                                setTimeout(() => {
                                                    vm.$emit('overlayOffError')
                                                }, 1000);

                                                console.log(error);

                                                throw error
                                            })
                                    } else {
                                        return checkError
                                    }
                                }
                                
                            }
                    })
                    .catch(function (error) {
                        vm.$emit('changeMessageStatus', 'При загрузке произошла ошибка!' )

                        checkError = error

                        setTimeout(() => {
                            vm.$emit('overlayOffError')
                        }, 1000);

                        console.log(error);

                        throw error
                    })
            }
        }
    }
</script>

<style scoped>

</style>