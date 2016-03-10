'use strict';
const test = require('tape');
const meetup = require('../lib/meetup.js');

test('function getEvents should return an object', (t) => {
    let actual, expected;
    let now = Date.now();
    const oneWeek = 1000*60*60*24*7;
    const options = {
        lattitude: '51.559652',
        longitude: '-0.093986',
        radius: 2,
        time1: now,
        time2: now + oneWeek
    };

    meetup.getEvents(options, (data) => {
        actual = typeof data;
        expected = 'object';
        t.equal(actual, expected, 'object received from meetup API');
        t.end();
    });
});
