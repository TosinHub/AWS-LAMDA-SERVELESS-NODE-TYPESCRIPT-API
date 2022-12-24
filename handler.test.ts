import { createVehicle } from "./src/handlers";
import { eventGenerator } from "./utils/eventGenerator";
import {expect } from '@jest/globals'
import request from 'supertest'


describe("VEHICLE SYSTEM API", () =>{

it('testing',  async() =>{
   const event : any = eventGenerator({
        body : {
            Make:"Toyota",
            Model: "Camry",
            Reg :"E02 WSC",
            RegistrationDate: "2/12/22"
        },
   })

   const res =  await createVehicle(event)

   console.log(res)

  
})

})

