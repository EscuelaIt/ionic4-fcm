import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { DataService } from './../../services/data.service';
import { Group } from './../../interfaces/group.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  groups: Group[] = [];

  constructor(
    private dataService: DataService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    // this.menuCtrl.enable(true);
    this.dataService.getData()
    .subscribe((groups) => {
      this.groups = groups;
    });
  }

}
