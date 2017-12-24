import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {DhanaService} from './services/dhana.service';
import { AppComponent } from './app.component';
import { AddDhanaComponent } from './add-dhana/add-dhana.component';
import { AppRoutingModule } from './app-routing.module';
import { DhanaRequestComponent } from './dhana-request/dhana-request.component';


@NgModule({
  declarations: [
    AppComponent,
    AddDhanaComponent,
    DhanaRequestComponent
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
