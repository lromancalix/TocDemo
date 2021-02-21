// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //urlTocService: "/api/TOC"
  
  urlTocService: "http://localhost/Notaria.SERVICE/toc_service/get_token",
  urlOnboarding: "http://localhost/Notaria.SERVICE/toc_service/save_onboarding",
  urlRostroVsToken: " http://localhost/Notaria.SERVICE/toc_service/rostro_vs_token_web"

  // urlTocService: "http://dtecnoweb.net/toc_service/get_token",
  // urlOnboarding: "http://dtecnoweb.net/toc_service/save_onboarding",
  // urlRostroVsToken: "http://dtecnoweb.net/toc_service/rostro_vs_token_web"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
