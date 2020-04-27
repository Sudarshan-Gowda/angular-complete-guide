import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, 
    private authService: AuthService) { }

  storeRecipe() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put('https://ng-recipe-book-74ed6.firebaseio.com/recipe.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipe() {
 
        return this.http.get<Recipe[]>('https://ng-recipe-book-74ed6.firebaseio.com/recipe.json').pipe(
          map(
            recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),tap(
              recipeData => {
                this.recipeService.setRecipes(recipeData);
              }
            )
        );
  }

}