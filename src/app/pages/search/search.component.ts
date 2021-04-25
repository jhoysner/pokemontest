import { Component, OnInit } from '@angular/core';
import { PokemonService} from '../../services/pokemon.service'
import { Router } from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    pokemons : any = [];

    constructor(public pokemonApi: PokemonService, public router: Router) {
        this.getLoadPokemons();
     }

    ngOnInit() { }

    getLoadPokemons(){
        this.pokemons = [];
        for (let i = 1; i < 20; i++) {
            this.pokemonApi.getPokemons(i).subscribe((res:any)=>{
                let pokemon = {
                    position: i,
                    image: res.sprites.front_default,
                    name: res.name,
                }
                this.pokemons.push(pokemon);
            });
        }
    }
    searchName(event){
        console.log(event)
        if(event == ''){
          this.getLoadPokemons();
        }
        this.pokemonApi.getPokemonsDetail(event).subscribe((res:any)=>{
            if(res){
                this.pokemons = [];
                let pokemon = {
                    image: res.sprites.front_default,
                    name: res.name,
                }
                this.pokemons.push(pokemon);
            }
        });
    }

    getDetailPokemon(pokemon){
        this.router.navigate(["/detail/"+pokemon]);
    }
}