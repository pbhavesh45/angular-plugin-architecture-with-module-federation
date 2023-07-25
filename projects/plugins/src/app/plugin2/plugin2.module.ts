import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Plugin2Component } from './plugin2.component';
import { SharedModule } from 'shared';
import { RouterModule } from '@angular/router';
import { PluginLoaderService } from './plugin-loader.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: Plugin2Component
      },
      {
        path: 'test1',
        component: Plugin2Component
      }
    ])
  ],
  declarations: [Plugin2Component],
  exports: [Plugin2Component],
  providers:[PluginLoaderService],
  bootstrap:[Plugin2Component]
})
export class Plugin2Module {}
