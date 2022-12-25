import { createVehicle, listVehicles, getVehicle } from "./src/handlers";
import { eventGenerator } from "./utils/eventGenerator";
import {expect } from '@jest/globals'
import request from 'supertest'
import axios from 'axios';


describe("VEHICLE SYSTEM API", () =>{


    
it('create a vehicle',  async() =>{
  

 const res = await axios.post('https://7a974vj7d1.execute-api.eu-west-1.amazonaws.com/vehicle', {
    Make:"Toyota",
    Model: "Camry",
    Reg :"E02 WSC",
    RegistrationDate: "2/12/22"
})
    expect(res.status).toBe(201)
    expect(res.data).toEqual( 
        expect.objectContaining({
        Make: expect.any(String),
        vehicleID: expect.any(String),
        Model: expect.any(String),
        Reg: expect.any(String),
        RegistrationDate: expect.any(String)
    }))  
})



it('get all vehicles', async() =>{

    const res = await axios.get('https://7a974vj7d1.execute-api.eu-west-1.amazonaws.com/vehicles')

    expect(res.status).toBe(200)
    expect(res.data).toEqual(
           expect.arrayContaining([
                    expect.objectContaining({
                        vehicleID: expect.any(String),
                        Make: expect.any(String),
                        Model: expect.any(String),
                        Reg: expect.any(String),
                        RegistrationDate: expect.any(String)
                    })
                ])
    ) 
})


it('get a vehicle', async() =>{

    const res = await axios.get('https://7a974vj7d1.execute-api.eu-west-1.amazonaws.com/vehicle/b460e6bb-091e-488f-8422-173c4b3836a7')

    expect(res.status).toBe(200)
    expect(res.data).toEqual(
                    expect.objectContaining({
                        vehicleID: expect.any(String),
                        Make: expect.any(String),
                        Model: expect.any(String),
                        Reg: expect.any(String),
                        RegistrationDate: expect.any(String)
                    })
     
    ) 
})

it('update a vehicle',  async() =>{
  

    const res = await axios.put('https://7a974vj7d1.execute-api.eu-west-1.amazonaws.com/vehicle/b460e6bb-091e-488f-8422-173c4b3836a7', {
       Make:"Toyota",
       Model: "Camry",
       Reg :"E02 WSC",
       RegistrationDate: "2/12/22"
   })

       expect(res.status).toBe(201)
       expect(res.data).toEqual( 
           expect.objectContaining({
           Make: expect.any(String),
           vehicleID: expect.any(String),
           Model: expect.any(String),
           Reg: expect.any(String),
           RegistrationDate: expect.any(String)
       }))  
})

it('delete a vehicle',  async() =>{
  

    const res = await axios.delete('https://7a974vj7d1.execute-api.eu-west-1.amazonaws.com/vehicle/8026aebc-f491-4ccd-80d6-12a76be8fdc6')
    expect(res.status).toBe(204)
})
   


})

