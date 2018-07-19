const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    // 1. Store result in variable
    var from = 'Michael';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  // from is correct, created at is a number, url is what is expected
  it('should generate the correct location object', () => {
    var from = 'Michael';
    var lat = 32.556;
    var long = -97.056;
    var url = 'https://www.google.com/maps?q=32.556,-97.056'
    var locMsg = generateLocationMessage(from, lat, long);

    expect(typeof locMsg.createdAt).toBe('number');
    expect(locMsg.from).toEqual(from);
    expect(locMsg.url).toEqual(url);
  });
});
