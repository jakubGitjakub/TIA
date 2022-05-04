import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { HistoryService } from 'src/app/services/History.Servis';
import { User } from '../users/users/users.component';

@Component({
  selector: 'pages-history',
  templateUrl: 'history.component.html',
  styleUrls: [ './history.component.scss' ]
})

export class HistoryComponent implements OnInit {
  
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  @Input() userId: number;
  dataSource: ShopingHistories[];
  
  
  constructor(private historyService: HistoryService
    ) {}


  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.historyService.getUserHistory(this.userId).subscribe(s => {
      this.dataSource = s;
    })
  }

}

export class ShopingHistories {
  id: number;
  date: Date;
  ticket: string;
  count_Ticket: string;
  user: User;
}
