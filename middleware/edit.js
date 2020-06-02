export default function({ store, redirect }) {
    if (!store.getters['modules/product/edit/product']) {
        redirect('/admin/products-edit/')
    }
}