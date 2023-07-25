import { Component } from '@angular/core';
import { PluginLoaderService } from './plugin-loader.service';

@Component({
  selector: 'app-plugin-2',
  templateUrl: './plugin2.component.html'
})
export class Plugin2Component {
  constructor(pluginLoaderService: PluginLoaderService) {

  }
}
