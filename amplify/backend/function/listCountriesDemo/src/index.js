const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: 'us-west-2' });
const DYNAMODB_TABLE = 'Countries';

const prepareProperties = item => ({
  countryID: item.countryID,
  countryName: item.countryName,
  language: item.Language,
  cities: []
});

const fetchCountriesByFilter = filter => {
  const limit = 1000;

  const params = {
    TableName: DYNAMODB_TABLE,
    Limit: limit,
    FilterExpression: 'cityID = :cityID',
    ExpressionAttributeValues: {
      ':cityID': 'none'
    }
  };

  return db.scan(params).promise();
};

const fetchCountriesByID = countryID => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      countryID,
      cityID: 'none'
    }
  };

  return db.get(params).promise();
};

const listCountries = async filter => {
  if (filter && filter.countryID) {
    const { Item } = await fetchCountriesByID(filter.countryID);
    return [prepareProperties(Item)];
  }

  const { Items } = await fetchCountriesByFilter(filter);
  return Items.map(prepareProperties);
};

exports.handler = async (event, context) => {
  try {
    const result = await listCountries(event.arguments.filter);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
