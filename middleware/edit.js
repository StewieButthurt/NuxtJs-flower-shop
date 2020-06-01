export default function({ store, redirect }) {
    if (!store.getters['modules/product/edit/id']) {
        redirect('/admin/products-edit/')
    }
}