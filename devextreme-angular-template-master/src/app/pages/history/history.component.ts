import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { HistoryService } from 'src/app/services/History.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';

@Component({
  selector: 'pages-history',
  templateUrl: 'history.component.html',
  styleUrls: [ './history.component.scss' ]
})

export class HistoryComponent implements OnInit {
  
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: History[];
  
  
  constructor(private historyService: HistoryService, 
    private readonly router: Router,
    private readonly ticket: TicketService
    ) {}



  ngOnInit(): void {
    this.historyService.getHistory().subscribe(s => {
      this.dataSource = s;
    })
  }

}

export class History {
  id: number;
  date: Date;
  ticket: string;
  count_Ticket: string;

}
