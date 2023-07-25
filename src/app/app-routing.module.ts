import { Injector, NgModule, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, RouteConfigLoadEnd, PreloadAllModules } from '@angular/router';
import { DynamicPathGuard } from './core/guards/dynamic-path.guard';
import { addDynamicPath } from './core/utils/dynamic-path';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './errors/not-found.component';
import { PluginLoaderService } from './core/plugin-loader.service';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: 'general', component: NotFoundComponent },
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', canActivate: [DynamicPathGuard], component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router, private pluginLoader: PluginLoaderService, private _injector: Injector) {

    this.router.events.subscribe(async routerEvent => {
      //if (routerEvent instanceof RouteConfigLoadEnd) {
        console.log("routerEvent",routerEvent)
        addDynamicPath(this.router.config, "dynamic",this.pluginLoader, this._injector);
        // Don't reset the router, if you deeplink the next navigation
        // will act as full page refresh when router is reset
        // if (newConfig) {
        //   this.router.resetConfig(newConfig);
        // }
      //}
    });
  }
}
