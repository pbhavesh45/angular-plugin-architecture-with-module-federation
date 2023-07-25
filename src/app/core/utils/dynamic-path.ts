import { Route } from '@angular/router';
import { PluginLoaderService } from '../plugin-loader.service';
import { Injector, NgModuleRef, createNgModuleRef } from '@angular/core';

export function addDynamicPath(config: Array<Route>, modulePath, pluginLoader: PluginLoaderService, _injector: Injector): Promise<Array<Route>> {

  return new Promise((resolve, reject) => {
    // Trigger change detection so _loadedConfig is available in router
    setTimeout(async () => {
      let configIsChanged = false;
      config.forEach(root => {
        if (root.children) {
          const foundChild: any = root.children.find(child => (child as any)._loadedConfig && child.path === modulePath);
          if (foundChild && foundChild._loadedConfig.routes.length > 0) {
            foundChild._loadedConfig.routes.forEach(async childRoute => {
              if (childRoute.data && childRoute.data.addDynamicChild) {
                if (!childRoute.children) {
                  childRoute.children = [];
                }
                const foundDynamicChild = childRoute.children.find(child => child.path === 'dynamic');
                const component = await pluginLoader.load("plugin2");
                console.log(component);
                const moduleRef: NgModuleRef<any> = createNgModuleRef(
                  component,
                  _injector
                );
                if (!foundDynamicChild) {
                  childRoute.children.push(
                    {
                      path: 'dynamic',
                      loadChildren: moduleRef
                    }
                  );

                  console.log("childRoute.children ==============>",childRoute.children);
                  configIsChanged = true;
                  resolve(config);
                } else {
                  resolve(null);
                }
              }
            });
          }
        }
      });
    }, 0);
  });
}
