const Service = require('./service');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const mocks = {
  tatooine: {
    "name": "Tatooine",
    "rotation_period": "23",
    "orbital_period": "304",
    "diameter": "10465",
    "climate": "arid",
    "gravity": "1 standard",
    "terrain": "desert",
    "surface_water": "1",
    "population": "200000",
    "residents": [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/4/",
      "https://swapi.dev/api/people/6/",
      "https://swapi.dev/api/people/7/",
      "https://swapi.dev/api/people/8/",
      "https://swapi.dev/api/people/9/",
      "https://swapi.dev/api/people/11/",
      "https://swapi.dev/api/people/43/",
      "https://swapi.dev/api/people/62/"
    ],
    "films": [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/"
    ],
    "created": "2014-12-09T13:50:49.641000Z",
    "edited": "2014-12-20T20:58:18.411000Z",
    "url": "https://swapi.dev/api/planets/1/"
  },
  alderaan: {
    "name": "Alderaan",
    "rotation_period": "24",
    "orbital_period": "364",
    "diameter": "12500",
    "climate": "temperate",
    "gravity": "1 standard",
    "terrain": "grasslands, mountains",
    "surface_water": "40",
    "population": "2000000000",
    "residents": [
      "https://swapi.dev/api/people/5/",
      "https://swapi.dev/api/people/68/",
      "https://swapi.dev/api/people/81/"
    ],
    "films": [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/6/"
    ],
    "created": "2014-12-10T11:35:48.479000Z",
    "edited": "2014-12-20T20:58:18.420000Z",
    "url": "https://swapi.dev/api/planets/2/"
  },
}

  ;
(async () => {
  // {
  //   // vai para a internet
  //   const service = new Service();
  //   const withoutStub = await service.makeRequest(BASE_URL_2);
  //   console.log(JSON.stringify(withoutStub));
  // }
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);
  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearedIn: 5
    }

    const result = await service.getPlanet(BASE_URL_1);
    deepStrictEqual(result, expected);
  }
  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2
    }

    const result = await service.getPlanet(BASE_URL_2);
    deepStrictEqual(result, expected);
  }
})()