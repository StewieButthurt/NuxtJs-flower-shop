export default function({ store, redirect }) {
    if (store.getters['modules/product/images/images'].length > 0 &&
        store.getters['modules/product/name/name'] !== '' &&
        store.getters['modules/product/descr/descr'] !== '' &&
        store.getters['modules/product/price/price'] !== '' &&
        store.getters['modules/product/article/article'] !== ''
    ) {} else {
        redirect('/admin/products/')
    }
}