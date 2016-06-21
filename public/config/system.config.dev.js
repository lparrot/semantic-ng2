(function (global) {

    var individual = false;

    // map tells the System loader where to look for things
    var map = {
        'typescript': 'typescript/lib/typescript.js',
        'rxjs': 'rxjs',
        '@angular': '@angular'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {defaultExtension: 'ts'},
        'src': {defaultExtension: 'ts'},
        'rxjs': {defaultExtension: 'js'}
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];


    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = individual ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    var config = {
        baseUrl: '.',
        transpiler: 'typescript',
        typescriptOptions: {
            module: "commonjs",
            experimentalDecorators: true,
            emitDecoratorMetadata: true
        },
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);