import Vuex from "vuex";

import auth from "./modules/auth";
import autoLogin from "./modules/autoLogin";

const store = new Vuex.Store({
    modules: {
        auth,
        autoLogin
    }
})