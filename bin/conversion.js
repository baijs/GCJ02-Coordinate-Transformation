#!/usr/bin/env node

const program = require('commander');
const {
    gcj2wgs, wgs2gcj
} = require('../index');

program
    .version('v' + require('../package.json').version, '-v, --version')
    .option('-i, --input <file>', 'Input geojson file')
    .option('-o, --output <file>', 'Output geojson file');
program.command('gcj2wgs')
    .description('gcj02 to wgs84')
    .action(function (...args) {
        if (!program.input) {
            console.error('error: option -i, --input <file> missing');
            return program.help();
        }
        if (!program.output) {
            console.error('error: option -o, --output <file> missing');
            return program.help();
        }
        console.info(`gcj2wgs`);
        console.log('input %s', program.input);
        console.log('output %s', program.output);
        try {
            gcj2wgs(program.input, program.output);
        } catch (error) {
            console.error(error);
            return program.help();
        }
    });
program.command('wgs2gcj')
    .description('wgs84 to gcj02')
    .action(function (...args) {
        if (!program.input) {
            console.error('error: option -i, --input <file> missing');
            return program.help();
        }
        if (!program.output) {
            console.error('error: option -o, --output <file> missing');
            return program.help();
        }
        console.info(`wgs2gcj`);
        console.log('input %s', program.input);
        console.log('output %s', program.output);
        try {
            wgs2gcj(program.input, program.output);
        } catch (error) {
            console.error(error);
            return program.help();
        }
    });

program.parse(process.argv);