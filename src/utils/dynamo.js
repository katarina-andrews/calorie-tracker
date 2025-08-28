import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);


export const listAllItems = async (tableName) => {
  try {
    const command = new ScanCommand({ TableName: tableName });
    const response = await docClient.send(command);
    console.log(response);

    return response.Items;
  } catch (err) {
    console.log(err.message);
  }
};

export const createItem = async (tableName, item) => {
  const command = new PutCommand({ TableName: tableName, Item: item });
  const response = await docClient.send(command);

  console.log(response);
  return item;
};