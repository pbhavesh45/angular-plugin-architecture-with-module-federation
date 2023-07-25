import {
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PluginLoaderService } from './core/plugin-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('targetRef', { read: ViewContainerRef }) vcRef: ViewContainerRef;

  constructor(
    private pluginLoader: PluginLoaderService,
    private _injector: Injector
  ) {}

  async ngOnInit(): Promise<any> {
    this.pluginLoader.loadPlugin('plugin1', this.vcRef, this._injector);
  }
}
