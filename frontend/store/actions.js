export default {
    SET_USER(context, payload){
        console.log("vuex:" + payload);
        context.commit("USER", payload);
    },
    SET_FAV(context, payload){
        console.log("favAction:" + payload);
        context.commit("FAV", payload);
    }
}