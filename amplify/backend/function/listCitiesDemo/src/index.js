const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'Countries';

const prepareProperties = item => ({
  cityID: item.cityID,
  cityName: item.cityName
});

async function listCities(countries) {
  const filterInKeys = countries.map((v, i) => `:${i}`).join(', ');
  const values = {
    ':none': 'none'
  };
  countries.forEach((v, i) => (values[`:${i}`] = v.countryID));

  const params = {
    TableName: DYNAMODB_TABLE,
    FilterExpression: `countryID IN (${filterInKeys}) AND cityID <> :none`,
    ExpressionAttributeValues: values
  };

  const { Items: cities } = await db.scan(params).promise();
  const result = countries.map(({ countryID }) =>
    cities.filter(item => item.countryID === countryID).map(prepareProperties)
  );

  return result;
}

exports.handler = async (event, context) => {
  try {
    const result = await listCities(event);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
