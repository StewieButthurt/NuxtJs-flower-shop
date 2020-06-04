export default function({ store, redirect }) {
    if (store.getters['modules/product/name/name'] &&
        store.getters['modules/product/edit/product']) {

    } else {
        redirect('/admin/products-edit/')
    }
}