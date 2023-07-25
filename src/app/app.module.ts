import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { SharedModule } from 'shared';
import { AppComponent } from './app.component';
import { PluginsConfigProvider } from './core/plugins-config.provider';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './errors/not-found.component';
import { DynamicPathGuard } from './core/guards/dynamic-path.guard';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, HttpClientModule, SharedModule, AppRoutingModule],
  providers: [
    PluginsConfigProvider,
    DynamicPathGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (provider: PluginsConfigProvider) => () =>
        provider.loadConfig(),
      multi: true,
      deps: [PluginsConfigProvider]
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {}
