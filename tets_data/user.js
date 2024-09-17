exports.User = class User {

  constructor(userType) {
    var testData;
    switch (userType) {
        case 'Admin':
            testData = JSON.parse(JSON.stringify(require("../tets_data/users/AdminUser.json")));
            break;
        case 'Premium Complete':
            testData = JSON.parse(JSON.stringify(require("../tets_data/users/PremiumUser.json")));
            break;
        case 'Premium Single':
            testData = JSON.parse(JSON.stringify(require("../tets_data/users/PremiumSingleUser.json")));
            break; 
        case 'Premium Collection':
            testData = JSON.parse(JSON.stringify(require("../tets_data/users/PremiumCollectionUser.json")));
            break;
        case 'Basic':
            testData = JSON.parse(JSON.stringify(require("../tets_data/users/BasicUser.json")));
             break;    
        default:
            throw new Error("The user type is incorrect!")
    }
    if(process.env.NAME === 'stage'){
        this.email = testData.stageUsers[0].email
        this.password =  testData.stageUsers[0].password
        this.firstName = testData.stageUsers[0].firstName
        this.lastName = testData.stageUsers[0].lastName
    }else{
        this.email = testData.devUsers[0].email
        this.password =  testData.devUsers[0].password
        this.firstName = testData.devUsers[0].firstName
        this.lastName = testData.devUsers[0].lastName
    }
  }
  
};