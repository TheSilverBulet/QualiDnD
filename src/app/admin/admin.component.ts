import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IUser } from '../shared/models.component';
import { UserService } from '../shared/user.service';
import { AuthService } from '../authorization/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RecordKeepingComponent } from '../record-keeping/record-keeping.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [RecordKeepingComponent]
})
export class AdminComponent implements OnInit, AfterViewInit {

  userList: IUser[];
  displayedColumns: string[] = ['username', 'firstname', 'actions'];
  dataSource = new MatTableDataSource<IUser>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userService.getAllUsers().subscribe(resp => {
      if (resp) {
        this.userList = resp;
        this.dataSource.data = this.userList;
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe(resp => {
      if (resp) {
        this.userList = resp;
        this.dataSource.data = this.userList;
        this.dataSource.sort = this.sort;
      }
    });
  }

  isSelf(characterName: string): boolean {
    return this.authService.getLoggedInUsername === characterName;
  }

}
