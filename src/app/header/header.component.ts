import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
 
  isAuthenticated =false;
  private userSub:Subscription;

  @Output() featureSelected = new EventEmitter<string>();


  constructor(private dataStorageService: DataStorageService, 
       private authService: AuthService){}

    ngOnInit() {
     this.userSub =this.authService.user.subscribe(
       user =>{
        this.isAuthenticated = !!user;
       }
     );
  }

  onLogout(){
    this.authService.logout();
  }
    

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  saveRecipe(){
    this.dataStorageService.storeRecipe();
  }

  fetchRecipe(){
    this.dataStorageService.fetchRecipe().subscribe();
  }

  ngOnDestroy() {
     this.userSub.unsubscribe(); 
  }

}
