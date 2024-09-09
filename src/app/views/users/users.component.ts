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

  toggleStatus(sUser: User) {
    sUser.status = sUser.status === 'active' ? 'inactive' : 'active'
    this.userService.updateUser(sUser).subscribe((res: any) => {
      this.users?.map(user => [sUser].find(u => u.id === user.id) || user);
      console.log(res);
    })
  }

  dateFormat(datetime: Date) {
    return `Le ${moment(datetime).format('DD/MM/YYYY à HH:MM')}`
  }

  translateRole(role: string): string {
    const roles: any = { "editor": "Rédacteur",
                          "chef_editor": "Rédacteur en chef",
                          "assistant_editor": "Rédacteur assistant",
                          "moderator": "modérateur",
                          "assistant_moderator": "modérateur assistant"}

    return roles[role];
  }

  translateStatus(status: string): string {
    const statuses: any = { "inactive": "Désactivé", 
                          "active": 'Activé'}

    return statuses[status];
  }
}
