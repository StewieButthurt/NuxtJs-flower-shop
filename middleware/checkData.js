export default function({store, redirect}) {
    if(store.getters['add-product/images'].length > 0 &&
        store.getters['add-product/title'] !== '' &&
        store.getters['add-product/descr'] !== '' &&
        store.getters['add-product/price'] !== '' &&
        store.getters['add-product/article'] !== ''
    ) {
    } else {
        redirect('/admin/products/')
    }
}