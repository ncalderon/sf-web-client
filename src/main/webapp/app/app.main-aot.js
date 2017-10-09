"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var prod_config_1 = require("./blocks/config/prod.config");
var app_module_ngfactory_1 = require("../../../../target/aot/src/main/webapp/app/app.module.ngfactory");
prod_config_1.ProdConfig();
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.SfWebClientAppModuleNgFactory)
    .then(function (success) { return console.log("Application started"); })
    .catch(function (err) { return console.error(err); });
