import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1/pokemon-rng';

export const fetchCatchPokemon = async () => {
  try {
    const response = await axios.get(`${baseURL}/catch`);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
};

export const fetchReleasePokemon = async () => {
  try {
    const response = await axios.get(`${baseURL}/release`);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
};

export const fetchRenamePokemon = async (pokemon) => {
  try {
    const response = await axios.put(`${baseURL}/rename`, pokemon);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
};
