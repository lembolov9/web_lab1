import {describe} from "mocha";
import {correctWeather, errorData} from "./testData";
import { expect, assert } from 'chai';
import nock from "nock";

import {makeContext, convertPressure, weatherView} from "../src/logic";

describe("Tests functions from 1 lab", () => {

    it("test for converting pressure function", () => {
        assert.equal(convertPressure(1333), 1000);
    });

    it("test for converting pressure function", () => {
        assert.equal(convertPressure(0), 0);
    });

    it("test for context maker with success situation", () => {
        let objectWeather = makeContext(correctWeather.raw)
        assert.typeOf(objectWeather, 'object')
        expect(objectWeather.weather.description).to.equal(correctWeather.context.weather.description);
        expect(objectWeather.weather.temp).to.equal(correctWeather.context.weather.temp);
        expect(objectWeather.weather.pressure).to.equal(correctWeather.context.weather.pressure);
        expect(objectWeather.weather.humidity).to.equal(correctWeather.context.weather.humidity);
        expect(objectWeather.weather.speed).to.equal(correctWeather.context.weather.speed)
    });

    it("test for context maker with error situation", () => {
        let objectWeather = makeContext(errorData.message)
        assert.typeOf(objectWeather, 'object')
        expect(objectWeather.error).to.equal(errorData.expected.error)
    })
})

describe('Get Weather test', () => {

    it('Get a good weather', () => {
        nock('https://api.openweathermap.org')
            .get('/data/2.5/weather?lat=50.43&lon=30.52&APPID=a120fd62ed4260a0ba1bdffbd7b09103&units=metric&lang=ru')
            .reply(200, correctWeather.raw);

        return weatherView({"lng": 30.52, "lat": 50.43})
            .then(response => {
                expect(typeof response).to.equal('object');
                expect(typeof response.weather).to.equal('object')
            });
    });

    it('Get a weather with error', () => {
        nock('https://api.openweathermap.org')
            .get('/data/2.5/weather?lat=50.43&lon=30.52&APPID=a120fd62ed4260a0ba1bdffbd7b09103&units=metric&lang=ru')
            .reply(200, errorData.message);

        return weatherView({"lng": 30.52, "lat": 50.43})
            .then(response => {
                expect(typeof response).to.equal('object');
                expect(response.error).to.equal(errorData.expected.error)
            });
    });
});