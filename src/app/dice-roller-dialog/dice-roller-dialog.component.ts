import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-roller-dialog',
  templateUrl: './dice-roller-dialog.component.html',
  styleUrls: ['./dice-roller-dialog.component.scss'],
  standalone: false
})
export class DiceRollerDialogComponent implements OnInit {

  diceTypes = [{ key: 'D2', value: '2' }, { key: 'D4', value: '4' }, { key: 'D6', value: '6' },
  { key: 'D8', value: '8' }, { key: 'D10', value: '10' }, { key: 'D12', value: '12' },
  { key: 'D20', value: '20' }, { key: 'D100', value: '100' }
  ];

  selectedDie: number;
  numberRolls: number;
  rolls: number[];
  result: number;


  constructor() { }

  ngOnInit() {
  }

  rollDice() {
    if (this.rolls) {
      this.rolls.splice(0, this.rolls.length);
    } else {
      this.rolls = [];
    }
    this.result = 0;
    for (let i = 0; i < this.numberRolls; i++) {
      const tmp = this.getRandomInt(this.selectedDie);
      this.result += tmp;
      this.rolls.push(tmp);
    }
  }

  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

}
