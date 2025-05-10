import { Component, OnInit, Inject } from '@angular/core';
import { IMonster, IAbility, ICharacter } from '../shared/models.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const SINGLE_SPACE = '&nbsp;';
const DOUBLE_SPACE = '&nbsp;&nbsp;';

@Component({
  selector: 'app-initiative-details-dialog',
  templateUrl: './initiative-details-dialog.component.html',
  styleUrls: ['./initiative-details-dialog.component.scss'],
  standalone: false
})
export class InitiativeDetailsDialogComponent implements OnInit {

  selectedMonster: IMonster;
  selectedCreature: ICharacter;
  isNPC = false;

  constructor(
    public dialogRef: MatDialogRef<InitiativeDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private safeHtml: SafeHtmlPipe
  ) {
    if (data.resp.owner) {
      this.selectedCreature = data.resp;
      this.isNPC = false;
    } else {
      this.selectedMonster = data.resp;
      this.isNPC = true;
    }
  }

  ngOnInit() {
  }

  describeAllAbilities(monster: any) {
    return `<b>STR</b>` + SINGLE_SPACE + this.describeAbility(monster.strength) + DOUBLE_SPACE + `<b>DEX</b>` + SINGLE_SPACE + this.describeAbility(monster.dexterity) + DOUBLE_SPACE + `<b>CON</b>` + SINGLE_SPACE + this.describeAbility(monster.constitution) + DOUBLE_SPACE + `<b>INT</b>` + SINGLE_SPACE + this.describeAbility(monster.intelligence) + DOUBLE_SPACE + `<b>WIS</b>` + SINGLE_SPACE + this.describeAbility(monster.wisdom) + DOUBLE_SPACE + `<b>CHA</b>` + SINGLE_SPACE + this.describeAbility(monster.charisma);
  }

  describeCRAndExpVal(monster: IMonster) {
    return `<b>Challenge Rating</b>:` + SINGLE_SPACE + monster.challengeRating + SINGLE_SPACE + '(' + monster.expValue + SINGLE_SPACE + 'XP' + ')';
  }

  describeAbility(ability: IAbility) {
    if (ability.abilityModifier >= 0) {
      return ability.abilityScore + '(+' + ability.abilityModifier + ')';
    } else {
      return ability.abilityScore + '(' + ability.abilityModifier + ')';
    }
  }

  describeSizeTypeAlignment(monster: IMonster) {
    return `<i>` + monster.size + SINGLE_SPACE + monster.type + ',' + SINGLE_SPACE + monster.alignment + `</i>`;
  }

  describeInateAbilities(monster: IMonster) {
    let completeInateAbilitiesList = '';
    if (monster.savingThrows) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeSavingThrows(monster);
    }
    if (monster.skills) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeSkills(monster);
    }
    if (monster.damageVulnerabilities) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeDamageVuln(monster);
    }
    if (monster.damageResistances) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeDamageRes(monster);
    }
    if (monster.damageImmunities) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeDamageImm(monster);
    }
    if (monster.conditionImmunities) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeConditionImm(monster);
    }
    if (monster.senses) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeSenses(monster);
    }
    if (monster.languages) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeLanguages(monster);
    }
    if (monster.challengeRating) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeCR(monster);
    }
    return completeInateAbilitiesList;
  }

  describeSavingThrows(monster: IMonster) {
    return `<span><b>Saving Throws</b>` + SINGLE_SPACE + monster.savingThrows + `</span><br />`;
  }

  describeSkills(monster: IMonster) {
    return `<span><b>Skills</b>` + SINGLE_SPACE + monster.skills + `</span><br />`;
  }

  describeDamageVuln(monster: IMonster) {
    return `<span><b>Damage Vulnerabilities</b>` + SINGLE_SPACE + monster.damageVulnerabilities + `</span><br />`;
  }

  describeDamageRes(monster: IMonster) {
    return `<span><b>Damage Resistances</b>` + SINGLE_SPACE + monster.damageResistances + `</span><br />`;
  }

  describeDamageImm(monster: IMonster) {
    return `<span><b>Damage Immunities</b>` + SINGLE_SPACE + monster.damageImmunities + `</span><br />`;
  }

  describeConditionImm(monster: IMonster) {
    return `<span><b>Condition Immunities</b>` + SINGLE_SPACE + monster.conditionImmunities + `</span><br />`;
  }

  describeSenses(monster: IMonster) {
    return `<span><b>Senses</b>` + SINGLE_SPACE + monster.senses + `</span><br />`;
  }

  describeLanguages(monster: IMonster) {
    return `<span><b>Languages</b>` + SINGLE_SPACE + monster.languages + `</span><br />`;
  }

  describeCR(monster: IMonster) {
    return `<span><b>Challenge Rating</b>` + SINGLE_SPACE + monster.challengeRating + `</span><br />`;
  }

  describeFeatures(monster: IMonster) {
    return `<div style="white-space: pre-wrap;">` + monster.abilities + `</div>`;
  }

  describeActions(monster: IMonster) {
    return `<div style="white-space: pre-wrap;"><b>Actions</b><br />` + monster.attacks + `</div>`;
  }

}
