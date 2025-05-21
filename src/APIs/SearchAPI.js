const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

export const fetchCityOptions = async (inputValue) => {
  try {
    const response = await fetch(
      `${url}?namePrefix=${inputValue}&sort=-population`,
      geoApiOptions
    );

    if (!response.ok) {
      console.error("API error:", response.status, response.statusText);
      return [];
    }

    const result = await response.json();

    if (!result.data) {
      console.error("No data field in response:", result);
      return [];
    }

    return result.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
      latitude: city.latitude,
      longitude: city.longitude,
      countryCode: city.countryCode,
      city: city.name,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
