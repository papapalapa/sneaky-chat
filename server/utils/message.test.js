const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Janghoon';
        const text = 'Hi';
        const message = generateMessage(from, text)

        expect(message).toBeTruthy();
        expect(message.createdAt).toBeTruthy();
        expect(typeof message).toBe('object');
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate a location message object with a Google Map link', () => {
        var from = 'Admin';
        var latitude = '1';
        var longitude = '2';
        var expectedUrl = 'https://www.google.com/maps?q=1,2'

        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message).toBe('object');
        expect(message).toBeTruthy();
        expect(message.url).toBe(expectedUrl);
        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from)
    })
})