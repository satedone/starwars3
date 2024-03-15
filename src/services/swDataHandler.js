import axios from "axios";

const BASE_URL = "https://swapi.tech/api/";

async function getPerson(data) {
  return {
    name: data.name,
    gender: data.gender,
    birth_year: data.birth_year,
    eye_color: data.eye_color,
  };
}

async function getPlanet(data) {
  return {
    name: data.name,
    population: data.population,
    orbital_period: data.orbital_period,
    diameter: data.diameter,
  };
}

async function getStarship(data) {
  return {
    name: data.name,
    model: data.model,
    manufacturer: data.manufacturer,
    cost_in_credits: data.cost_in_credits,
  };
}

export async function getData(id, entity) {
  try {
    const data = (await axios.get(`${BASE_URL}${entity}/${id}`)).data.result
        .properties;
    switch (entity) {
      case "people":
        return await getPerson(data);
      case "planets":
        return await getPlanet(data);
      case "starships":
        return await getStarship(data);
      default:
        return { name: "not available"};
    }
  } catch {
    return { name: "not available"};
  }
}