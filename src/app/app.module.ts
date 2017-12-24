import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {DhanaService} from './services/dhana.service';
import { AppComponent } from './app.component';
import { AddDhanaComponent } from './add-dhana/add-dhana.component';
import { AppRoutingModule } from './app-routing.module';
import { DhanaRequestComponent } from './dhana-request/dhana-request.component';
import { DhanaApprovalComponent } from './dhana-approval/dhana-approval.component';


@NgModule({
  declarations: [
    AppComponent,
    AddDhanaComponent,
    DhanaRequestComponent,
    DhanaApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DhanaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
