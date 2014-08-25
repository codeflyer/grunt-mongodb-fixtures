/*
 * grunt-mongodb-fixtures
 * https://github.com/passkey/grunt-mongodb-fixtures
 *
 * Copyright (c) 2013 Kieu Anh Tuan
 * Licensed under the MIT license.
 */

'use strict';
var fixtures = require('pow-mongodb-fixtures');
var path = require('path');
var async = require('async');
module.exports = function(grunt) {
    grunt.registerMultiTask('mongodb_fixtures', 'Load mongodb fixtures for development', function() {
        var done = this.async();
        var mongoFixtures = fixtures.connect(this.options().connection);
        async.eachSeries(this.filesSrc,
            function(fixturePath, next) {
                var fixturePath = path.resolve(fixturePath);
                mongoFixtures.clearAllAndLoad(fixturePath, function(err) {
                    next();
                })
            },
            function(err) {
                if(err) {
                    console.error(err);
                }
                done();
            }
        )
    });
};
