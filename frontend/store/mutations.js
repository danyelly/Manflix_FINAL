 export default {

    USER(state, payload){
        state.usuario = payload;
    },
    FAV(state, payload){
        state.favorites = payload;
    }
 }