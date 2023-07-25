import { Injectable, Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { parseUrlPathInSegments } from '../utils/url-path-parser';

@Injectable()
export class DynamicPathGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const segments = parseUrlPathInSegments(state.url);
    const lastPath = segments.pop();
    console.log("lastPath",lastPath)
    if (lastPath === 'dynamic') {
      // Trigger change detection so url is known for router
      setTimeout(()=>{
         this.router.navigateByUrl("/dynamic");
      },5000);
    } else {
      this.router.navigateByUrl('/404');
    }

    return false;
  }
}
