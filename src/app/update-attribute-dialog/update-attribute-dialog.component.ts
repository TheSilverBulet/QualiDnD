import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { IAttrUpdate } from '../shared/models.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-attribute-dialog',
  templateUrl: './update-attribute-dialog.component.html',
  styleUrls: ['./update-attribute-dialog.component.scss'],
  imports: []
})
export class UpdateAttributeDialogComponent implements OnInit {

  creature;
  attributeKey: string;
  attributeCurrentValue;
  attributeNewValue;

  placeholderValue: string;

  @Output() updateInitTable = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<UpdateAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.creature = data.creature;
    this.attributeKey = this.prettifyAttr(data.attributeKey);
    this.placeholderValue = data.attributeKey === 'currentHealth' ? 'Damage Dealt' : 'New Value';
    this.attributeCurrentValue = data.attributeCurrentValue;
  }

  ngOnInit() {
  }

  updateAttribute() {
    const updateObj: IAttrUpdate = {
      attributeKey: this.attributeKey,
      attributeValue: this.attributeNewValue,
      creature: this.creature
    };
    this.dialogRef.close(updateObj);
  }

  prettifyAttr(attr): string {
    if (attr === 'currentHealth') {
      return 'Current Health';
    }
    return '';
  }

}
