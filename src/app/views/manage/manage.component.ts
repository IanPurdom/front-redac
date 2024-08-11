import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManageService } from '../../services/manage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent {
  users?: User[];

  constructor(
    private manageService: ManageService,
  ){ 
    this.manageService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: () => console.log("Erreur")
    })
    
  }
}
