#!/usr/bin/env node

const program = require('commander');
const {
    main
} = require('../index');

program
    .version('v' + require('../package.json').version, '-v, --version')
    .option('-i, --input', 'Input geojson file path')
    .option('-o, --output', 'Output geojson file path')
    .option('-g, --GCJ02', 'GCJ02 coordinates to WGS84')
    .option('-w, --WGS84', 'WSG84 coordinates to GCJ02')
    .action(function (input, output, GCJ02, WGS84) {
        try {
            main(input, output, GCJ02, WGS84);
        } catch (err) {
            if (err) {
                return program.help()
            }
        }
    })
    .parse(process.argv);