import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router' 
import {AddDhanaComponent} from './add-dhana/add-dhana.component'
import { DhanaRequestComponent } from './dhana-request/dhana-request.component';
import { DhanaApprovalComponent } from './dhana-approval/dhana-approval.component';
const routes: Routes=[
  {path:'dhana/add',component: AddDhanaComponent},
  {path:'dhana/request', component:DhanaRequestComponent},
  {path:'dhana/approve', component:DhanaApprovalComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
