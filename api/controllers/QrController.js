var expect =require('chai').expect;
var fs=require('fs');
var PNG=require('png-js');
/*var QrCode=require('qrcode-reader');*/

module.exports = {
/*qr= new QrCode();

    qr.decode('https://clikbrix.files.wordpress.com/2012/02/james_goodhouse_profile_qrcode.png')
*/
  read : function(req, res){

    var QRCODE = function(done,callback){
    c=fs.readFileSync(__dirname+'/img/QR.png');
    var p=new PNG(c);
    /*_callback = callback;*/
    p.decode(function(data){
      var QrCode=require('qrcode-reader');
      var qr=new QrCode();
       
      qr.callback= function(result){
         res.view(result);
         console.log(result);
      }
     /* sails.log.debug(qr.decode(p,data))*/
      qr.decode(p,data)

      console.log(data);
    });
}

var pr = new QRCODE(); 

  }

};

