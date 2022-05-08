import { Component, NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule }  from 'devextreme-angular/ui/scroll-view';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {
  @Input() 
  title: string;

  @Input()
  description: string;
  
  constructor(private readonly router: Router,
    private auth: AuthService) { }

  handleBack(){
    const path = 'home'
    const navigationState = window.history.state || {};
    this.router.navigate([path], { state: navigationState });
  }
}

@NgModule({
  imports: [ CommonModule, DxScrollViewModule, DxButtonModule, ],
  exports: [ SingleCardComponent ],
  declarations: [ SingleCardComponent ]
})
export class SingleCardModule {
  
}
