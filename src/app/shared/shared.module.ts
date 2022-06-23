import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
    declarations: [
      SidebarComponent
    ],
    exports: [
      SidebarComponent
    ],
    imports: [
      CommonModule,
      FormsModule
    ]


})

export class SharedModule {}