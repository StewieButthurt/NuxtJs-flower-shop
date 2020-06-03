export default function({ store, redirect }) {
    if (store.getters['modules/main-page/menu/menuEditPage']) {

    } else {
        redirect('/admin/menu-edit/')
    }
}