import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { userService } from '../../services/user.service';
import { User } from '../../models/user';
import moment from 'moment';

@Component({
  selector: 'users-accounts',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users?: User[];

  constructor(
    private userService: userService,
  ){ 
    this.userService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: () => console.log("Erreur")
    })
    
  }

  dateFormat(datetime: Date) {
    return `Le ${moment(datetime).format('DD/MM/YYYY à HH:MM')}`
  }
}
