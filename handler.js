const request = require("supertest")


const Handler = request('./src/handlers') 
const  eventGenerator = require('./utils/eventGenerator') 


describe("VEHICLE SYSTEM API", () =>{

    const body ={
        make: "Ford",
        model: "Fiesta",
        Reg: "AB22 ACD",
        RegistrationDate: 23/12/2022
}



it('testing',  async() =>{

    const event = eventGenerator({body})

  
})

})
