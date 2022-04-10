import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { EventService } from 'src/app/services/Event.Servis';
import { Events } from '../../companies_admin/companies_admin/companies_admin.component';

@Component({
  templateUrl: 'confirmEvent.component.html',
  styleUrls: [ './confirmEvent.component.scss' ]
})

export class ConfirmEventComponent implements OnInit{
  
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: Events[];
  @Input() public event: Events;
  @Input() eventId: number;
  
  
  constructor(
    private eventService : EventService, 
    private readonly router: Router, 
  ) {}

  ngOnInit(): void {
    this.eventService.GetEventsByConfirm("verify").subscribe(s => {
      this.dataSource = s;
    })
  }

  handleConfirm = (e): void => {
    var result = confirm("Chcete event schváliť ?");
    if(result){
      this.eventId = e.row.key;
      //get event
      this.event = new Events;
      this.eventService.get(this.eventId).subscribe(
        event => {
          this.event = event as Events;
          //set event
          this.eventService.confirmEvent(this.eventId, event).subscribe();
      });
    }
  }

  refresh = (e): void => {
    window.location.reload();
  }

}
