var isPublic = typeof window != "undefined";

/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': (isPublic) ? '/' : 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'client',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                       'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'angular2-jwt':               'npm:angular2-jwt/angular2-jwt.js',
            'ng-semantic':                'npm:ng-semantic',
            'jquery': 'npm:jquery',
            'echarts': 'npm:echarts',
            'ng2-echarts': 'npm:ng2-echarts',
            'sweetalert2': 'npm:sweetalert2',
            'zrender': 'npm:zrender',
            'bootstrap_select': 'assets/global/plugins/bootstrap-select/js/bootstrap-select.js',
             css: '/systemjs-plugin-css/css.js',
            'lodash':'npm:lodash',
            'crypto-js': 'npm:crypto-js',
            'moment': 'node_modules/moment/moment.js',
            'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
            'ng2-file-upload':'npm:ng2-file-upload'
        },
        meta: {
            '*.css': { loader: 'css' }
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng-semantic': {
                main: 'ng-semantic',
                defaultExtension: 'js'
            }, 
            'echarts': {
                main: 'index.common',
                defaultExtension: 'js'
            },
            'zrender': {
                main: './lib/zrender',
                defaultExtension: 'js'
            },
            'ng2-echarts': {
                main: 'index',
                defaultExtension: 'js'
            },

            'sweetalert2':{
                main: './dist/sweetalert2',
                defaultExtension: 'js'
            },
            'lodash':{
                main: './index',
                defaultExtension: 'js'
            },
            jquery: {
                defaultExtension: 'js'
            },
            'crypto-js':{
                main: 'crypto-js',
                defaultExtension: 'js'
            },
            'ng2-bootstrap': {
                format: 'cjs', main: 'bundles/ng2-bootstrap.umd', defaultExtension: 'js'
            },
            'moment': {
                main: 'moment', defaultExtension: 'js'
            },
            'ng2-file-upload': {    
                main: 'index.js',    
                defaultExtension: 'js'
            }

        }
    });
})(this);
