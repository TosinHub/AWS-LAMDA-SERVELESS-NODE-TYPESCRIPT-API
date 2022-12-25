import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import * as Utils from '../utils/functions'


const headers = Utils.headers

export const createVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  try {

    const req = JSON.parse(event.body as string);

    await Utils.schema.validate(req, {abortEarly : false})
  
    const vehicle = {
      ...req,
      vehicleID: v4(),
    };
    await Utils.docClient
      .put({
        TableName: Utils.tableName,
        Item: vehicle,
      })
      .promise();
  
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(vehicle),
    };
    
  } catch (error) {
    return Utils.handleError(error)
  }
 
};

export const getVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  
  try {
    const response = await Utils.fetchVehicleById(event.pathParameters?.id as string);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (e) {
   return Utils.handleError(e)
  }
};

export const updateVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  try {
    const id = event.pathParameters?.id as string;

    await Utils.fetchVehicleById(id)

  const reqBody = JSON.parse(event.body as string);

  await Utils.schema.validate(reqBody, {abortEarly : false})

  const vehicle = {
    ...reqBody,
    vehicleID: id,
  };
  await Utils.docClient
    .put({
      TableName: Utils.tableName,
      Item: vehicle,
    })
    .promise();

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify(vehicle),
  };

  } catch (e) {
     return Utils.handleError(e)
  }



};


export const deleteVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
      const id = event.pathParameters?.id as string;

      await Utils.fetchVehicleById(id)

      await Utils.docClient.delete({
        TableName : Utils.tableName,
        Key: {
          vehicleID: id
        }
      }).promise()

      
      const deleteMsg = {
    
        message: "Vehicle deleted"
    };

      return {
        statusCode : 204,
        headers,
        body: JSON.stringify(deleteMsg)
      }
    } catch (error) {
      
      return Utils.handleError(error)
    }


}

export const listVehicles = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const res = await Utils.docClient.scan({
      TableName: Utils.tableName
    }).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res.Items)
    }
}

