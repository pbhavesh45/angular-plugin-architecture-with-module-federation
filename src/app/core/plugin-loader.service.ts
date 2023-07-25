import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
  createNgModuleRef,
  ViewContainerRef
} from '@angular/core';
import { PluginsConfigProvider } from './plugins-config.provider';

const moduleMap = {};
function loadRemoteEntry(remoteEntry: string): Promise<void> {
  return new Promise<any>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[remoteEntry] = true;
      resolve(true); // window is the global namespace
    };

    document.body.append(script);
  });
}

@Injectable({
  providedIn: 'root'
})
export class PluginLoaderService {
  constructor(
    private configProvider: PluginsConfigProvider,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  async load<T>(pluginName): Promise<Type<T>> {
    const { config } = this.configProvider;
    if (!config[pluginName]) {
      throw Error(`Can't find appropriate plugin`);
    }

    const { name, mfEntry, exposedModule, ngModuleName } = config[pluginName];
    await loadRemoteEntry(mfEntry);
    await __webpack_init_sharing__('default');

    const container = window[name] as Container;
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(exposedModule);
    const Module = factory();
    return Module[ngModuleName];
  }

  loadPlugin(pluginName: string, vcRef: ViewContainerRef, _injector: Injector): void {
    this.load(pluginName).then((component: any) => {
      const moduleRef: NgModuleRef<any> = createNgModuleRef(
        component,
        _injector
      );
      const compFactory = this.factoryResolver.resolveComponentFactory(
        // @ts-ignore
        moduleRef._bootstrapComponents[0]
      );
      vcRef.createComponent(compFactory, 0, _injector, [], moduleRef);
    });
  }
}
