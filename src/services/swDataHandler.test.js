import axios from "axios";
import { getData } from "./swDataHandler";

jest.mock("axios");

describe("swDataHandler getData function", () => {
  const baseURL = "https://swapi.tech/api/";
  const person = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBYY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    species: [],
    vehicles: [
      "https://swapi.dev/api/vehicles/14/",
      "https://swapi.dev/api/vehicles/30/",
    ],
    starships: [
      "https://swapi.dev/api/starships/12/",
      "https://swapi.dev/api/starships/22/",
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  const planet = {
    name: "Tatoooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
    residents: [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/4/",
      "https://swapi.dev/api/people/6/",
      "https://swapi.dev/api/people/7/",
      "https://swapi.dev/api/people/8/",
      "https://swapi.dev/api/people/9/",
      "https://swapi.dev/api/people/11/",
      "https://swapi.dev/api/people/43/",
      "https://swapi.dev/api/people/62/",
    ],
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi.dev/api/planets/1/",
  };

  const starship = {
    name: "Slave 131",
    model: "Firespray-31-class patrol and attack",
    manufacturer: "Kwat Systems Engineering",
    cost_in_credits: "123321",
    length: "21.5",
    max_atmosphering_speed: "1000",
    crew: "1",
    passengers: "6",
    cargo_capacity: "70000",
    consumables: "1 month",
    hyperdrive_rating: "3.0",
    MGLT: "70",
    starship_class: "Patrol craft",
    pilots: ["https://swapi.dev/api/people/22/"],
    films: ["https://swapi.dev/api/films/2/", "https://swapi.dev/api/films/5/"],
    created: "2014-12-15T13:00:56.332000Z",
    edited: "2014-12-20T21:23:49.897000Z",
    url: "https://swapi.dev/api/starships/21/",
  };

  test.each([
    [1, "people"],
    [2, "people"],
    [3, "people"],
    [1, "planets"],
    [2, "planets"],
    [3, "planets"],
    [1, "starships"],
    [2, "starships"],
    [3, "starships"],
  ])("calls axios.get with correct url as an argument", async (id, entity) => {
    axios.get
      .mockResolvedValueOnce({ data: { result: { properties: person } } })
      .mockResolvedValueOnce({ data: { result: { properties: person } } })
      .mockResolvedValueOnce({ data: { result: { properties: person } } })
      .mockResolvedValueOnce({ data: { result: { properties: planet } } })
      .mockResolvedValueOnce({ data: { result: { properties: planet } } })
      .mockResolvedValueOnce({ data: { result: { properties: planet } } })
      .mockResolvedValueOnce({ data: { result: { properties: starship } } })
      .mockResolvedValueOnce({ data: { result: { properties: starship } } })
      .mockResolvedValueOnce({
        data: { result: { properties: { starship } } },
      });
    await getData(id, entity);

    expect(axios.get).toHaveBeenCalledWith(`${baseURL}${entity}/${id}`);
  });

  test("returns correct data about person", async () => {
    axios.get.mockResolvedValueOnce({
      data: { result: { properties: person } },
    });
    const result = await getData(1, "people");

    expect(result).toHaveProperty("name", "Luke Skywalker");
    const valuesOfResult = Object.values(result);
    expect(valuesOfResult).toContain("male");
    expect(valuesOfResult).toContain("19BBYY");
    expect(valuesOfResult).toContain("blue");
    expect(valuesOfResult.length).toBeLessThan(8);
  });

  test("returns correct data about planet", async () => {
    axios.get.mockResolvedValueOnce({
      data: { result: { properties: planet } },
    });
    const result = await getData(1, "planets");

    expect(result).toHaveProperty("name", "Tatoooine");
    const valuesOfResult = Object.values(result);
    expect(valuesOfResult).toContain("200000");
    expect(valuesOfResult).toContain("304");
    expect(valuesOfResult).toContain("10465");
    expect(valuesOfResult.length).toBeLessThan(8);
  });

  it("returns correct data about starship", async () => {
    axios.get.mockResolvedValueOnce({
      data: { result: { properties: starship } },
    });
    const result = await getData(1, "starships");

    expect(result).toHaveProperty("name", "Slave 131");
    const valuesOfResult = Object.values(result);
    expect(valuesOfResult).toContain("Firespray-31-class patrol and attack");
    expect(valuesOfResult).toContain("Kwat Systems Engineering");
    expect(valuesOfResult).toContain("123321");
    expect(valuesOfResult.length).toBeLessThan(8);
  });

  test("returns an object that has property with 'not available' value if request fails", async () => {
    axios.get.mockRejectedValueOnce(
      new Error("Request failed with status code 404")
    );
    const result = await getData(1, "planets");

    expect(Object.values(result)).toContain("not available");
  });
});
