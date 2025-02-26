const { Client, Environment, ApiError } = require("square/legacy");
require('dotenv').config()


const legacyClient = new Client({
    bearerAuthCredentials: {
      accessToken: process.env.SQUARE_ACCESS_TOKEN
    },
    environment: Environment.Sandbox,
});


const { locationsApi } = legacyClient;

async function legacyGetLocations() {
    try {
        let listLocationsResponse = await locationsApi.listLocations();

        let locations = listLocationsResponse.result.locations;

        locations.forEach(function (location) {
            console.log(
                location.id + ": " +
                location.name + ", " +
                location.address.addressLine1 + ", " +
                location.address.locality
            );
        });
    } catch (error) {
        if (error instanceof ApiError) {
            error.result.errors.forEach(function (e) {
                console.log(e.category);
                console.log(e.code);
                console.log(e.detail);
            });
        } else {
            console.log("Unexpected error occurred: ", error);
        }
    }
};

legacyGetLocations();
