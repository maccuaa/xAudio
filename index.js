#! /usr/bin/env node

var fs       = require('fs');
var path     = require('path');
var cheerio  = require('cheerio');
var request  = require('request');
var MultiPro = require('multi-progress');
var Q        = require('q');
var argv     = require('yargs')
    .alias('h', 'help')
    .help('help')
    .usage('Usage: $0 -u <URLs>')
    .showHelpOnFail(false, 'Specify --help for available options')
    .option('u', {
        alias: 'url',
        describe: 'Webpage URLs',
        type: 'array',
        demand: true
    })
    .option('d', {
        alias: 'dest',
        describe: 'Download destination',
        type: 'string',
        default: getUserHome()
    })
    .argv;

// Create a multi progressbar object
var multi = MultiPro();

// Promises array
var promises = [];

console.log('\nDownloading to ' + argv.dest + '\n');

// Loop through all URLs
for (var x = 0; x < argv.url.length; x++) {

    var url = argv.url[x];
    var d = Q.defer();

    // Get the webpage
    request(url, parseWebPage);

    promises.push(d.promise);
}

Q
.all(promises)
.then(function() {
    console.log('All downloads complete');
})
.fail(function(error) {
    console.log(error.message);
});

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function parseWebPage(error, response, body) {
    if (!error && response.statusCode === 200) {

        var $ = cheerio.load(body);
        var mp3Url;
        var mp3File;
        var bar;
        var dest;

        mp3Url = $('audio').attr('src');

        if (mp3Url === undefined) {
            d.reject(new Error('Unable to find audio at ' + url));
            return;
        }

        mp3File = mp3Url.split('/').pop();

        if (path.isAbsolute(argv.dest)) {
            dest = path.join(argv.dest, mp3File);
        } else {
            dest = path.join(path.resolve(argv.dest), mp3File);
        }

        request.get(mp3Url)
        .on('response', function(res) {
            var title = 'Downloading ' + mp3File + '... [:bar] :percent :etas';
            bar = multi.newBar(title, {
                complete: '=',
                incomplete: ' ',
                width: 25,
                total: parseInt(res.headers['content-length'], 10)
            });
        })
        .on('data', function(chunk) {
            if (bar.tick) {
                bar.tick(chunk.length);
            }
        })
        .pipe(fs.createWriteStream(dest))
        .on('close', function() {
            d.resolve();
        });
    } else {
        d.reject(new Error(error));
    }
}
