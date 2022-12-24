
import AWS from "aws-sdk";
import * as yup from 'yup'


//Handles validation for vehicle inputs
export const schema = yup.object().shape({
    Make: yup.string().required(),
    Model: yup.string().required(),
    Reg : yup.string().required(),
    RegistrationDate: yup.string().required()
})


export const docClient = new AWS.DynamoDB.DocumentClient();
export const tableName = "VehiclesTable";
export const headers = {'content-type' : 'application/json'}


class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

export const handleError = (e: unknown) =>{

    if(e instanceof yup.ValidationError){

        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            errors : e.errors
          })
        }
        
      }


    if(e instanceof SyntaxError){

        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({error : `Invalid request body format : ${e.message}`})
        }
        
      }


  if(e instanceof HttpError){

    return {
      statusCode: e.statusCode,
      headers,
      body: e.message
    }
    
  }
  throw e
}

export const fetchVehicleById = async (id: string) => {
  const response = await docClient
    .get({
      TableName: tableName,
      Key: {
        vehicleID: id,
      },
    })
    .promise();

  if (!response.Item) {
    throw new HttpError(404, { error: "not found" });
  }

  return response.Item;
};

