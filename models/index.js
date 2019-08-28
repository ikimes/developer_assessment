var data = require('./../db/sorted_data.json');

var functions = {
    getPeople : async function(){
        return new Promise(async function(resolve,reject){
           resolve(data);
        })
    },
    getPerson : async function(first,last){
        return new Promise(async function(resolve,reject){
            let objectReject = {};
            var type = typeof first;
            objectReject.error = "No user found by that name";
            for (i=0; i < data.length;i++){
              if(data[i]['first_name'] == first && data[i]['last_name'] == last){
                  resolve(data[i]);
              }
            }
            resolve(objectReject);
            
        });
    }
}

module.exports = functions;