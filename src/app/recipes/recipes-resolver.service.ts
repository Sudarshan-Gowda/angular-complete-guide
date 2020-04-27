import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data.storage.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){

    }

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){

        const recipes =this.recipeService.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipe();
        }else{
            return recipes;
        }

     
    }
    
}