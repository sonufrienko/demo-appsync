/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const countries = `query Countries($filter: CountriesFilterInput) {
  countries(filter: $filter) {
    countryID
    countryName
    language
    cities {
      cityID
      cityName
    }
  }
}
`;
