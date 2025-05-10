import { Component, OnInit, OnChanges, Input, SimpleChanges, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { IInitiative, IAttrUpdate } from '../shared/models.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { InitiativeService } from '../shared/initiative.service';
import { UpdateAttributeDialogComponent } from '../update-attribute-dialog/update-attribute-dialog.component';
import { InitiativeDetailsDialogComponent } from '../initiative-details-dialog/initiative-details-dialog.component';
import { AuthService } from '../authorization/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-initiative-table',
  templateUrl: './initiative-table.component.html',
  styleUrls: ['./initiative-table.component.scss'],
  standalone: false
})

export class InitiativeTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() initTable: IInitiative[] = [];
  displayedColumns: string[] = ['characterName', 'initialRoll', 'finalResult', 'characterCurrentHealth', 'actions'];
  dataSource = new MatTableDataSource<IInitiative>();
  @Output() allowInitiative = new EventEmitter<boolean>();
  subscription: Subscription;

  isAdmin = false;

  constructor(
    private initiativeService: InitiativeService,
    private dialog: MatDialog,
    private authService: AuthService) {
  }

  ngOnInit() {
    const source = interval(20000);
    this.subscription = source.subscribe(() => this.reloadInitTable());
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initTable = changes.initTable.currentValue;
    this.dataSource.data = this.initTable;
  }

  ngAfterViewInit() {
  }

  get listHasValue() {
    return this.initTable.length > 0;
  }

  reloadInitTable() {
    this.initiativeService.getInitTable().subscribe(resp => {
      this.initTable = resp;
    });
    if (this.initTable.length === 0) {
      this.allowInitiative.emit(true);
    } else {
      this.allowInitiative.emit(false);
    }
  }

  openHealthDialog(creature) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '750px';
    dialogConfig.data = {
      creature,
      attributeKey: 'currentHealth',
      attributeCurrentValue: creature.currentHealth
    }

    this.dialog.open(UpdateAttributeDialogComponent, dialogConfig).afterClosed().subscribe(data => {
      this.updateHealth(data);
    });
  }

  updateHealth(data: IAttrUpdate) {
    this.initiativeService.updateHealth(data).subscribe(resp => {
      if (resp) {
        this.initTable = resp;
        this.dataSource.data = this.initTable;
      }
    });
  }

  deleteInit(creature: IInitiative) {
    this.initiativeService.deleteCreature(creature).subscribe(resp => {
      if (resp) {
        this.initTable = resp;
        this.dataSource.data = this.initTable;
      }
    });
  }

  describeCreature(creature: IInitiative) {
    this.initiativeService.retrieveEntityInfo(creature).subscribe(resp => {
      if (resp) {
        console.log(resp);
        const dialogConfig = new MatDialogConfig();
    
        dialogConfig.width = '750px';
        dialogConfig.data = {
          resp
        }

        this.dialog.open(InitiativeDetailsDialogComponent, dialogConfig);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
