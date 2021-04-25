import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PokemonService} from '../../services/pokemon.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  name:any;
  pokemon:any;

  constructor(private route: ActivatedRoute,public pokemonApi: PokemonService) { 

    this.name = this.route.snapshot.paramMap.get("pokemon");
    this.pokemonApi.getPokemonsDetail(this.name).subscribe((result)=>{
      console.log(result)
      this.pokemon = result;
    });

  }

  ngOnInit() {
  }

}
