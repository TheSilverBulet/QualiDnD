import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, SimpleChanges } from '@angular/core';
import { CharacterCreationDialogComponent } from '../character-creation-dialog/character-creation-dialog.component';
import { ICharacter, IUser } from '../shared/models.component';
import { CharacterService } from '../shared/character.service';
import { EditCharacterDialogComponent } from '../edit-character-dialog/edit-character-dialog.component';
import { AppViewService } from '../shared/app-view.service';
import { NotificationService } from '../notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false
})
export class UserComponent implements OnInit, OnChanges, AfterViewInit {

  characterList: ICharacter[];
  displayedColumns: string[] = ['characterName', 'actions'];
  dataSource = new MatTableDataSource<ICharacter>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private charService: CharacterService,
    private viewService: AppViewService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.characterList = changes.characterList.currentValue;
    this.dataSource.data = this.characterList;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.charService.getUserChars().subscribe(resp => {
      if (resp) {
        this.characterList = resp;
        this.dataSource.data = this.characterList;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openCharacterCreationDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '750px';

    this.dialog.open(CharacterCreationDialogComponent, dialogConfig)
    .afterClosed().subscribe(() => {
      setTimeout(() => {
        this.fetchList();
      });
    });
  }

  editCharacterDialog(character: ICharacter): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '750px';
    dialogConfig.data = {
      character
    }
    this.dialog.open(EditCharacterDialogComponent, dialogConfig)
    .afterClosed().subscribe(() => {
      setTimeout(() => {
        this.fetchList();
      });
    });
  }

  getIsActive(character) {
    return character.isActive;
  }

  displayCharacter(selectedCharacter: ICharacter): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      character: selectedCharacter,
      fromDashboard: false
    }
    this.dialog.open(EditCharacterDialogComponent, dialogConfig);
  }

  deleteCharacter(characterName: string): void {
    this.charService.deleteCharacter(characterName).subscribe(resp => {
      if (resp) {
        this.characterList = resp;
        this.dataSource.data = this.characterList;
        this.dataSource.sort = this.sort;
        this.notificationService.success("Character Deletion", "Character deleted successfully", 4000);
      } else {
        this.notificationService.error("Character Deletion", "There was an issue deleting this character", 4000);
      }
    });
  }

  makeActive(toBeActive: ICharacter): void {
    this.charService.makeCharacterActive(toBeActive.name).subscribe(resp => {
      if (resp) {
        this.characterList = resp;
        this.dataSource.data = this.characterList;
        this.dataSource.sort = this.sort;
      }
    });
  }

  fetchList(): void {
    this.charService.getUserChars().subscribe(resp => {
      if (resp) {
        this.characterList = resp;
        this.dataSource.data = this.characterList;
        this.dataSource.sort = this.sort;
      }
    });
  }

  get userInfo(): IUser {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  get isMobile() {
    return this.viewService.getIsMobileResolution();
  }

}
