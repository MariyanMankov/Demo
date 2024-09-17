
exports.TestDataGenerator = class TestDataGenerator {
  constructor() {
    
  }

   getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getMonth(useText) {
    const date = new Date();
    if (useText){
    return date.toLocaleString('default', { month: 'long' });
    }else{
      return date.getMonth() + 1;
    }
  }

  getDate(useText) {
    const date = new Date();
    if (useText){
      let day= date.getDate();
      if(day == 1  || day == 21 || day == 31){
        return day +'st'
      }else if(day == 2  || day == 22){
        return day +'nd'
      }else if(day == 3  || day == 23){
        return day +'rd'
      }else{
        return day +'th'
      }
      
    }else{
      return date.getDay();
    }
  }

  getYear() {
    const date = new Date();
    return date.getFullYear();
  }
  
};
