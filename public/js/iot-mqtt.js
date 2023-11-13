// permitir que mi direccion sea alaterio
var clientId = "web_" + parseInt(Math.random() * 100, 10);
// Crea una instancia de cliente
var client = new Paho.MQTT.Client("m15.cloudmqtt.com", 37068 , clientId);

//establecer controladores de devolución de llamada
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
  useSSL: true,
  userName: "xogsdktw", 
  password: "GEjPIE4D4wZ6",
  onSuccess:onConnect  
}
//conecta el cliente
client.connect(options);

/* sensores*/
var valueWaterPh = 0;
var valueWaterEc = 0;
var valueWaterTemp = 0;

var valueWaterFlow = 0;

var valueAirTemp = 0;
var valueAirHumidity = 0;

var valueWaterLevelRotoplas = 0;
var valueBuoy = 50;

var valueSeedlingHumidity = 0;

var valueWaterPhCalibration = 0 ;
var valueWaterEcCalibration = 0 ; 
var valueWaterTempCalibration = 0 ;
    

//-----llenar tacho-- -----------------------------------------
const miBoton = document.querySelector("#goValue");

//-------------------------------------------------------ok   ok
miBoton.addEventListener("click", function valueWaterConsumption() {
  var inputValue = document.querySelector("#valueAgua").value; 
  var valorCorrecto = parseInt(inputValue);

  if (isNaN(valorCorrecto) || valorCorrecto <= 0 || valorCorrecto > 100) {
      //valore errados
  } else {
      
      var dato = valorCorrecto.toString();    
      message = new Paho.MQTT.Message(dato);
      message.destinationName = '/modulo1/nft/consumoAgua'
      client.send(message);           
  }
});

// function valueWaterConsumption(){ 
//   //var inputValue = document.getElementById("valueAgua").value; 
//   var inputValue = document.querySelector("#valueAgua").value; 
//   var valorCorrecto = parseInt(inputValue);

//   if (isNaN(valorCorrecto) || valorCorrecto <= 0 || valorCorrecto > 100) {
//       //valore errados
//   } else {

//      var dato = valorCorrecto.toString();    
//       message = new Paho.MQTT.Message(dato);
//       message.destinationName = '/modulo1/nft/consumoAgua'
//       client.send(message);           
//   } 
// };

//----------------------Nft Sensor--------------------------------------------ok  ok
function OnOffStateNftSensor(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/nft/estadoNftSensor'
  client.send(message);   
};

//----------------------Nft Water Level--------------------------------------------ok  ok
function OnOffStateWaterLevelNft(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/nft/estadoWaterLevel'
  client.send(message);   
};

//----------------------Nft Solenoide Valve--------------------------------------------
// function OnOffStateSolenoidValveNft(dato){ 
//   message = new Paho.MQTT.Message(dato);
//   message.destinationName = '/modulo1/nft/actuadorValvulaSolenoide'
//   client.send(message);   
// };

//-------------------Nft Bomb ---------------------------------------ok ok
function OnOffNftBombAutomatico(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/nft/estadoNftBomba'
  client.send(message); 

  if(dato == "ON"){ // cuando se cambia a manual
    document.querySelectorAll('.btnPermitNftBombManual').forEach( (elem)=> {
      elem.disabled = true;
    });
  }else {
    document.querySelectorAll('.btnPermitNftBombManual').forEach( (elem)=> {
      elem.disabled = false;
    });  
  }
};
//----------------------------------------------------------------------ok ok
function OnOffNftBombManual(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/nft/actuadorBombaNft'
  client.send(message); 

  if(dato == "ON"){ // cuando habilitamos a auto
    document.querySelectorAll('.btnPermitNftBombAuto').forEach( (elem)=> {
      elem.disabled = true;
    });
  }else {
    document.querySelectorAll('.btnPermitNftBombAuto').forEach( (elem)=> {
      elem.disabled = false;
    });  
  }
};
//----------------------Post ALmacigo------------------------------------------ok ok
function OnOffPostAlmacigoAutomatico(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/post-almacigo/estadoPostAlmacigo'
  client.send(message); 

  if(dato == "ON"){ // cuando se cambia a manual
    document.querySelectorAll('.btnPermitPostSeedlingManual').forEach( (elem)=> {
      elem.disabled = true;
    });
  }else {
    document.querySelectorAll('.btnPermitPostSeedlingManual').forEach( (elem)=> {
      elem.disabled = false;
    });  
  }
};
//-------------------------------------------------------------ok  ok
function OnOffPostAlmacigoManual(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/post-almacigo/actuadorBombaPostAlmacigo'
  client.send(message); 

  if(dato == "ON"){ // cuando habilitamos a auto
    document.querySelectorAll('.btnPermitPostSeedlingAuto').forEach( (elem)=> {
      elem.disabled = true;
    });
  }else {
    document.querySelectorAll('.btnPermitPostSeedlingAuto').forEach( (elem)=> {
      elem.disabled = false;
    });  
  }
};


//--------------------------Almacigo-------------------------------------------ok ok
function OnOffAlmacigoAutomatico(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/almacigo/estadoAlmacigo'
  client.send(message); 
  if(dato == "ON"){ // cuando se cambia a manual
    document.querySelectorAll('.btnPermitSeedlingManual').forEach( (elem)=> {
      elem.disabled = true;
    });
  }else {
    document.querySelectorAll('.btnPermitSeedlingManual').forEach( (elem)=> {
      elem.disabled = false;
    });  
  }
};
//------------------------------------------------------------ok  ok
function OnOffAlmacigoManual(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/almacigo/actuadorBombaAlmacigo'
  client.send(message); 
  if(dato == "ON"){ // cuando habilitamos a auto
    document.querySelectorAll('.btnPermitSeedlingAuto').forEach( (elem)=> {
      elem.disabled = true;
    });
  }else {
    document.querySelectorAll('.btnPermitSeedlingAuto').forEach( (elem)=> {
      elem.disabled = false;
    });  
  }
};
//----------------------------ALumbrado---------------------------------------ok  ok
function OnOfflighting(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/nft/actuadorAlumbrado'
  client.send(message);   
};

//----------------------------CAlibration ---------------------------------------ok  ok
function OnOffStateNftCalibration(dato){ 
  message = new Paho.MQTT.Message(dato);
  message.destinationName = '/modulo1/nft/estadoNftSensorConsultation'
  client.send(message);   
};


// llamado cuando el cliente se conecta
function onConnect() {
  // Una vez que se haya realizado la conexión, realice una suscripción y envíe un mensaje.

  console.log("onConnect MQTT - WebSocket");
  // client.subscribe("World");
  // message = new Paho.MQTT.Message("Hello");
  // message.destinationName = "World";
  // client.send(message);

  client.subscribe("/modulo1/nft/sensorWaterPh"); // ok  ok
  client.subscribe("/modulo1/nft/sensorWaterEc"); // ok  ok recibdo en la nube
  client.subscribe("/modulo1/nft/sensorWaterTemp");//ok ok
  
  client.subscribe("/modulo1/nft/sensorWaterFlow");//ok  ok

  client.subscribe("/modulo1/nft/sensorAirTemp");//ok  ok
  client.subscribe("/modulo1/nft/sensorAirHumidity");//ok ok

  client.subscribe("/modulo1/nft/sensorWaterLevelRotoplas");//ok  ok
  
  client.subscribe("/modulo1/almacigo/sensorSeedlingHumidity");  //ok ok

  //--------------------------------------
  client.subscribe("/modulo1/nft/estadoWaterLevelSub");  //ok  ok
  //client.subscribe("/modulo1/nft/actuadorValvulaSolenoideSub");  
  client.subscribe("/modulo1/nft/estadoNftSensorSub");  //ok  ok
  client.subscribe("/modulo1/nft/sensorBuoy");  // ok ok


  //---------------------------
  client.subscribe("/modulo1/nft/estadoNftBombaSub"); //ok  ok
  client.subscribe("/modulo1/nft/actuadorBombaNftSub"); //ok ok

  //---------------------------------------------------------
  client.subscribe("/modulo1/post-almacigo/estadoPostAlmacigoSub"); //ok  ok
  client.subscribe("/modulo1/post-almacigo/actuadorBombaPostAlmacigoSub"); //ok ok
  

  client.subscribe("/modulo1/almacigo/estadoAlmacigoSub");  // ok  ok
  client.subscribe("/modulo1/almacigo/actuadorBombaAlmacigoSub"); //ok  ok

  client.subscribe("/modulo1/nft/actuadorAlumbradoSub"); //ok  ok
  
  client.subscribe("/modulo1/nft/estadoNftSensorConsultationSub");  // ok  ok estado consulta de calibracion
  //----------------calibration------------------------

  client.subscribe("/modulo1/nft/sensorWaterPhConsultation"); //ok  ok
  client.subscribe("/modulo1/nft/sensorWaterCeConsultation"); //ok   ok
  client.subscribe("/modulo1/nft/sensorWaterTempConsultation"); // ok  ok

}

//Se llama cuando el cliente pierde su conexión.
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    // "onConnectionLost:"+responseObject.errorMessage
   // "Conexión perdida:"+responseObject.errorMessage
  }
}

// llama cuando llega un mensaje
function onMessageArrived(message) {
  //message.destinationName + ": " + message.payloadString 
    if(message.destinationName == '/modulo1/nft/sensorWaterPhConsultation')
    {        
      valueWaterPhCalibration = parseFloat(message.payloadString);  
    }     
    if(message.destinationName == '/modulo1/nft/sensorWaterCeConsultation')
    {       
      valueWaterEcCalibration = parseFloat(message.payloadString);
    }
    if(message.destinationName == '/modulo1/nft/sensorWaterTempConsultation')
    {       
      valueWaterTempCalibration = parseFloat(message.payloadString);        
    }
    if(message.destinationName == '/modulo1/nft/sensorWaterPh')
    {       
      valueWaterPh = parseFloat(message.payloadString);        
    }    
    if(message.destinationName == '/modulo1/nft/sensorWaterEc')
    {       
      valueWaterEc = parseFloat(message.payloadString);
    }
    if(message.destinationName == '/modulo1/nft/sensorWaterTemp')
    {       
      valueWaterTemp = parseFloat(message.payloadString);        
    }
    if(message.destinationName == '/modulo1/nft/sensorWaterFlow')
    {       
      valueWaterFlow = parseFloat(message.payloadString);        
    }
    
    if(message.destinationName == '/modulo1/nft/sensorAirTemp')
    {       
      valueAirTemp = parseFloat(message.payloadString);
     // valueAirTemp lo consumimos en grafica.
    }
    if(message.destinationName == '/modulo1/nft/sensorAirHumidity')
    {       
      valueAirHumidity = parseFloat(message.payloadString);
    }
    if(message.destinationName == '/modulo1/nft/sensorWaterLevelRotoplas')
    {       
      valueWaterLevelRotoplas = parseFloat(message.payloadString);
    }
    if(message.destinationName == '/modulo1/almacigo/sensorSeedlingHumidity')
    {       
      valueSeedlingHumidity = parseFloat(message.payloadString);
    }
    if(message.destinationName == '/modulo1/nft/sensorBuoy')
    {       
      valueBuoy = parseFloat(message.payloadString);
    }
    //-----------------------------------Nft Sensor---------------------------------------------------
    if(message.destinationName == '/modulo1/nft/estadoNftSensorSub') // state sensores Nft
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateNftSensor").src = "img/estado-on.png"; 

        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateNftSensor').src = "img/estado-off.png"; 
   
        }       
    }
    //-----------------------------------Nft Estado Water Level---------------------------------------------------
    if(message.destinationName == '/modulo1/nft/estadoWaterLevelSub') // state water level Nft
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateWaterLevelNft").src = "img/estado-on.png"; 

        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateWaterLevelNft').src = "img/estado-off.png"; 
   
        }       
    }

    //-----------------------------------Nft Solenoid Valve---------------------------------------------------
    // if(message.destinationName == '/modulo1/nft/actuadorValvulaSolenoideSub') // state solenoid valve Nft
    // {         
    //     if (message.payloadString == "ON"){
    //       document.getElementById("imgStateSolenoidValveNft").src = "img/estado-on.png"; 

    //     }
    //     else if (message.payloadString == "OFF"){
    //       document.getElementById('imgStateSolenoidValveNft').src = "img/estado-off.png"; 
   
    //     }       
    // }
    //----------------------------------Nft Bomb---------------------------------------------
    if(message.destinationName == '/modulo1/nft/estadoNftBombaSub') // Estado automatico
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateAutoNftBomb").src = "img/estado-on.png"; 

          document.querySelectorAll('.btnPermitNftBombManual').forEach( (elem)=> {
            elem.disabled = true;
          });                     
        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateAutoNftBomb').src = "img/estado-off.png"; 

          document.querySelectorAll('.btnPermitNftBombManual').forEach( (elem)=> {
            elem.disabled = false;
          }); 
        }       
    }
    if(message.destinationName == '/modulo1/nft/actuadorBombaNftSub') // estaso Manual
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateManualNftBomb").src = "img/estado-on.png"; 
          //activamos stado a auto para dar click
          document.querySelectorAll('.btnPermitNftBombAuto').forEach( (elem)=> {
            elem.disabled = true;
          });                
        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateManualNftBomb').src = "img/estado-off.png"; 

          document.querySelectorAll('.btnPermitNftBombAuto').forEach( (elem)=> {
            elem.disabled = false;
          });               
        }       
    }
    
    //-----------------------Post ALmacigo----------------------------------------------------------------------
    if(message.destinationName == '/modulo1/post-almacigo/estadoPostAlmacigoSub') // Estado automatico
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateAutoPostSeedling").src = "img/estado-on.png"; 

          document.querySelectorAll('.btnPermitPostSeedlingManual').forEach( (elem)=> {
            elem.disabled = true;
          });                     
        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateAutoPostSeedling').src = "img/estado-off.png"; 

          document.querySelectorAll('.btnPermitPostSeedlingManual').forEach( (elem)=> {
            elem.disabled = false;
          }); 
        }       
    }
    if(message.destinationName == '/modulo1/post-almacigo/actuadorBombaPostAlmacigoSub') // estado Manual
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateManualPostSeedling").src = "img/estado-on.png"; 
          //activamos stado a auto para dar click
          document.querySelectorAll('.btnPermitPostSeedlingAuto').forEach( (elem)=> {
            elem.disabled = true;
          });                
        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateManualPostSeedling').src = "img/estado-off.png"; 

          document.querySelectorAll('.btnPermitPostSeedlingAuto').forEach( (elem)=> {
            elem.disabled = false;
          });               
        }       
    }
    //-----------------------Almacigo----------------------------------------------------------------------
    if(message.destinationName == '/modulo1/almacigo/estadoAlmacigoSub') // Estado automatico
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateAutoSeedling").src = "img/estado-on.png"; 

          document.querySelectorAll('.btnPermitSeedlingManual').forEach( (elem)=> {
            elem.disabled = true;
          });                     
        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateAutoSeedling').src = "img/estado-off.png"; 

          document.querySelectorAll('.btnPermitSeedlingManual').forEach( (elem)=> {
            elem.disabled = false;
          }); 
        }       
    }
    if(message.destinationName == '/modulo1/almacigo/actuadorBombaAlmacigoSub') // estado Manual
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateManualSeedling").src = "img/estado-on.png"; 
          //activamos stado a auto para dar click
          document.querySelectorAll('.btnPermitSeedlingAuto').forEach( (elem)=> {
            elem.disabled = true;
          });                
        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateManualSeedling').src = "img/estado-off.png"; 

          document.querySelectorAll('.btnPermitSeedlingAuto').forEach( (elem)=> {
            elem.disabled = false;
          });               
        }       
    }
    //---------------------------alumbrado------------------------------------
    if(message.destinationName == '/modulo1/nft/actuadorAlumbradoSub') // Alumbrado
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateLighting").src = "img/estado-on.png"; 

        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateLighting').src = "img/estado-off.png"; 
   
        }       
    }
    //---------------------------Calibracion Nft------------------------------------
    if(message.destinationName == '/modulo1/nft/estadoNftSensorConsultationSub') // calibracion
    {         
        if (message.payloadString == "ON"){
          document.getElementById("imgStateNftCalibration").src = "img/estado-on.png"; 

        }
        else if (message.payloadString == "OFF"){
          document.getElementById('imgStateNftCalibration').src = "img/estado-off.png"; 
   
        }       
    }    

}