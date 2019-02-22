var macfromip = require('macfromip');
macfromip.getMac('192.168.43.20', function(err, data){
    if(err){
        console.log(err);
    }
    console.log(data);

});