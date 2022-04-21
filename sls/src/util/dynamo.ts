import * as AWS from 'aws-sdk';

const { DYNAMO_URL } = process.env;

export const getWalletClient = (): AWS.DynamoDB.DocumentClient => {
    return new AWS.DynamoDB.DocumentClient({
        endpoint: DYNAMO_URL,
    });
};
