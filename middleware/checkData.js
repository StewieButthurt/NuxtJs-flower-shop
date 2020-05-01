export default function({ store, redirect }) {
    if (store.getters['product/add/images'].length > 0 &&
        store.getters['product/add/title'] !== '' &&
        store.getters['product/add/descr'] !== '' &&
        store.getters['product/add/price'] !== '' &&
        store.getters['product/add/article'] !== ''
    ) {} else {
        redirect('/admin/products/')
    }
}