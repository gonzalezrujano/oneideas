const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.options({ processCssUrls: false });

//compilar archivos de react
mix.react('resources/js/app.js', 'public/js/app.js');

//compilar achivos sass
mix.sass('resources/sass/main.scss', 'public/css');

//compilar los archivos css
mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    'node_modules/sweetalert2/dist/sweetalert2.min.css',
    'node_modules/animate.css/animate.min.css',
    'node_modules/icheck/skins/all.css',
    'resources/css/theme.css',
], 'public/css/vendor.css');

//compilar los archivos js
mix.babel([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'resources/js/plugins/theme.js',
    'node_modules/icheck/icheck.min.js',
    'resources/js/main.js'
], 'public/js/vendor.js');

//copiar la carpeta de webfonts de fontawesome 5 al directorio public
mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');
