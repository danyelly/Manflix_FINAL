<template>
  <div>
    <div class="main">
      <div class="InfoFixa">
        <div
          class="imgFixa"
          style="
            background-image: url('demolidor.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            width: 100%;
            height: 500px;
          "
        >
          <div class="conteudo">
            <img id="demo" src="Tdemolidor.jpg" /><br />
            <div class="classificacao">
              <img class="estrelas" src="estrelas.png" />
              <p style="width: 300px">2016 2 temporadas</p>
              <button>ULTRA <b>HD 4K</b></button>
              <button style="width: 50px; margin-left: 15px"><b>5.1</b></button
              ><br />
            </div>
            <br />
            <p>
              Cego desde pequeno, Matt Murdock luta contra a injustiça durante o
              dia<br />
              como advogado e à noite nas rua de Hell's Kitchen, Nova York.
            </p>

            <br />
            <br />
            <br />
            <p style="font-size: 15px">
              Charlie Cox, Deborah Ann Woll, Elden Henson<br />Séries, Séries
              policiais e sobre crime
            </p>
          </div>
        </div>
      </div>
      <div class="divModal">

        <Dialog 
        class="modalImg"
        :visible.sync="showDialogV"
        :dismissableMask="true"
        :closeOnEscape="true"
        
        :style="{width: '35vw'}"        
        >
        <img
                class="imgModal"
                :src="imgModal"
              />
              <br>
        <i class="pi pi-star" style="font-size: 1.5rem; cursor:pointer; display:flex;" v-on:click="fav(idMovie)" :visible="showIcon">
          <h3 style="display:flex; justify-content:center; ">{{nameMovie}}</h3>
          
        </i>
        <div class="divDescricao">
          <p class="descricao" style="padding-top:30px; color:black;">{{description}}
          </p>
          <p class="descricao" style="padding-top:30px; color:black;"><b>Genêro:</b>&nbsp{{category}}
          </p>
        </div>
        
        
      </Dialog> 
      </div>
       
       <div class="cards"
        v-if="filmeFavCard.length != 0"
      >
        <h2 style='color:white; padding-left:30px'>Minha Lista</h2>
        <div class="carousel">
          <div class="carouselbox">
            <div v-for="(myMovieFav, index) in filmeFavCard" :key="index" >
              <img
                class="img-1 slider-img"
                :src="'http://localhost:8000' + myMovieFav">
            </div>
          </div>
          <a class="switchLeft sliderButton" v-on:click="switchLeft($event)"
            ><</a
          >
          <a class="switchRight sliderButton" v-on:click="switchRight($event)"
            >></a
          >
        </div>
      </div>

      <!-- <div class="cards"
      v-if="favMovies"
      >
      <h2 style='color:white; padding-left:30px'>Minha Lista</h2>
        <div class="carousel">
          <div class="carouselbox">
            <div v-for="(myMovie, index) in favMovies" :key="index" >
              <img
                class="img-1 slider-img"
                :src="'http://localhost:8000' + myMovie.idFilmeFK.foto" v-on:click="showDialog(myMovie.idFilmeFK.id, myMovie.idFilmeFK.nome, myMovie.idFilmeFK.descricao, myMovie.idFilmeFK.idCategoriaFK)"
              />
              
            </div>
          </div>
          <a class="switchLeft sliderButton" v-on:click="switchLeft($event)"
            ><</a
          >
          <a class="switchRight sliderButton" v-on:click="switchRight($event)"
            >></a
          >
        </div>
      </div> -->

      <div class="cards"
      v-if="moviesList"
      >
      <h2 style='color:white; padding-left:30px'>Em Alta</h2>
        <div class="carousel">
          <div class="carouselbox">
            <div v-for="(myMovie, index) in moviesList" :key="index" >
              <img
                class="img-1 slider-img"
                :src="'http://localhost:8000' + myMovie.foto" v-on:click="showDialog(myMovie.id, myMovie.name, myMovie.category)"
              />
              
            </div>
          </div>
          <a class="switchLeft sliderButton" v-on:click="switchLeft($event)"
            ><</a
          >
          <a class="switchRight sliderButton" v-on:click="switchRight($event)"
            >></a
          >
        </div>
      </div>

      
      
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      showDialogV: false,
      showIcon: true,
      moviesList: [],
      favMovies:[],
      idMovie: 1,
      amountLeft: 0,
      amountRight: 0,
      scrollPerClick: "",
      imgModal: "",
      imgModalFav: "",
      favoritos: [],
      nameMovie:"",
      categoryMovie:"",
      idlistFav:[],
      exist: false,
      filmeApiFK:"",
      filmeFavCard:[],
      favJa: false,
    };
  },
  middleware: "auth",
  layout: "standard",
  

  methods: {
    scrollAmount: 0,


    fav(idFilme){
      console.log('is filme do modal:', idFilme)
      console.log('e i:',idFilme)
      console.log('lista fora:',this.idlistFav)


      //  this.$axios
      //   .get(this.$store.state.BASE_URL + "/favoritos?filme=" + idFilme)
      //   .then((response) => {
      //     console.log(response.data)
          
      //     if(response.data.length==0){
      //       console.log('entrei')
      //       this.favJa = false;
      //     }
      //     else
      //       this.favJa = true;
      //       this.showDialogV = false;
      //       console.log("Já é favorito");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      
        this.$axios
        .get(this.$store.state.BASE_URL + "/filmes/" + idFilme)
        .then((response) => {
          console.log("peguei o filme");
          this.filmeApiFK = response.data;
          console.log('FILMINHOO', this.filmeApiFK);
          this.registerFav(idFilme);
          
        })
        .catch((error) => {
          console.log("nao peguei");
          console.log(error);
        });
    },
    registerFav: async function (idFilme) {

      console.log('FILMINHOO 2222222222', this.filmeApiFK);

      const body = [{
        idFilmeFK: idFilme,
        idUsuarioFK: (this.$auth.$state.user.id-7),
      }];
      console.log(body);
      
      this.$axios
        .post(this.$store.state.BASE_URL + "/favoritos/", body)
        .then((response) => {
          console.log("FILMEEEEE FAVORITADOOOOOOOOO");
          console.log(response);

          let novoFav = structuredClone(this.$store.state.favorites);
          novoFav.push({
            id: response.length,
            idFilmeFK: this.filmeApiFK,
            idUsuarioFK: (this.$auth.$state.user.id-7),
          });

          this.$store.dispatch("SET_FAV",novoFav).catch((error) => {
            console.log("deu ruim !!!!!!!!!!!!!!!!");
            console.log(error)
          });
          console.log('************faroties store:',this.$store.state.favorites);
          let tam = this.$store.state.favorites.length;
          console.log('tamanhooooo:', tam);
          for(let i =1; i<=this.$store.state.favorites.length; i++){
            console.log(i)
            if (tam == i){
              this.filmeFavCard.push(this.$store.state.favorites[i-1].idFilmeFK.foto)
              console.log('HEEEEEEEEEEEEEEL´P',this.filmeFavCard)
            }
            
          }
          this.showDialogV = false;
          
        })
        .catch((error) => {
          console.log("NAOOOOOO FAVORITOOOOOOOOU");
          console.log(error);
        });
    },

    showDialog(id,name, description, category){
      console.log(id)
      this.idMovie = id;
      if (this.showDialogV === false) {
        this.showDialogV = true;
        this.imgModal = 'http://localhost:8000' + this.moviesList[this.idMovie-1].foto;
        this.nameMovie = name;
        this.description = description;
        this.category = category;
      }
      else
        this.showDialogV=false
    },
    switchLeft(event) {
      
      
      // console.log(event)
      const newLeft = this.amountRight - 100;
      this.amountRight = newLeft;
      event.target.previousElementSibling.style.left = `${newLeft}px`;
    },
    switchRight(event) {
      const newRigth = this.amountRight + 100;
      this.amountRight = newRigth;
      event.target.previousElementSibling.previousElementSibling.style.left = `${newRigth}px`;
   
    },
   
  },
  created() {
    // console.log('favoritos C:',this.favoritos),
    this.$axios
      .get(this.$store.state.BASE_URL + "/filmes")
      .then((response) => {
        console.log("deu certo");
        console.log('filmes:',response.data);
        this.moviesList = response.data;
        console.log("movielist", this.moviesList[0].foto);
      })
      .catch((error) => {
        console.log("deu merda");
        console.log(error);
      });
    console.log('id user', this.$auth.$state.user.id)
    console.log('-----------------------------------------------------------------------');
    console.log('FAVORITOS');
    this.$axios
      .get(this.$store.state.BASE_URL + "/favoritos?usuario=" + (this.$auth.$state.user.id-7))
      .then((response) => {
        console.log("deu certo");
        console.log('favoritos:',response.data);
        this.favMovies = response.data;

        this.$store.dispatch("SET_FAV",response.data);

        console.log('************faroties store222:',this.$store.state.favorites);
        for(let i =0; i<this.$store.state.favorites.length; i++){
          console.log('oi')
          this.filmeFavCard.push(this.$store.state.favorites[i].idFilmeFK.foto)
          console.log(this.filmeFavCard)
        }
      })
      .catch((error) => {
        console.log("deu merda");
        console.log(error);
      });


      

  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
}
.estrelas {
  width: 100px;
  margin-left: 15px;
}
.cards {
  height: 100%;
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
p {
  color: #a4a4a4;
  font-size: 20px;
}
.conteudo {
  top: 2px;
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-left: 15px;
}
button {
  width: 150px;
  border: none;
  background-color: #e4e3e2;
  border-radius: 5px;
}
.classificacao {
  display: flex;
  width: 530px;
}
#demo {
  width: 200px;
  margin-left: 200px;
  margin-right: 200px;
}
.bbrigthness {
  top: 0;

  background-color: rgba(0, 0, 0, 0.5);
  width: 45%;
  height: 100%;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.InfoFixa {
  display: flex;
  flex-direction: row;
}
</style>
