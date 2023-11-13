#include <WiFi.h>
#include <PubSubClient.h>
#include "RTClib.h"
/*
  Modulo 1
  RTC
  estado almacigo Auto (riego 2 seg - 6 12 18) - envio humedad suelo - cada 1 hora 
  estado post almacigo Auto (oxigenacion 5 min 6 a 18) 
  bomba almacigo
  bomba post almacigo
  alumbrado
*/
RTC_DS3231 rtc;

int contconexion = 0;

const char *ssid = "WLAN_LUZ"; 
const char *password = "Churucutitobb260520$"; 

char   SERVER[50]   = "192.168.10.14";   
int    SERVERPORT   =  1883; 

String USERNAME = "modulo1";  

const char* usernameMqtt = "yon"; 
char   PASSWORD[50] = "mujer";  //mqtt mosquito en rpi  

char PLACA[50];

char valueStr[15];

String strhralmacigo = "";

char HRALMACIGO[50];

char SALIDARIEGOALMACIGO[50];
char SALIDAOXIGENACIONPOSTALMACIGO[50];
char SALIDAALUMBRADO[50];

char ESTADOALMACIGO[50];
char ESTADOPOSTALMACIGO[50];

//-------------------Variable Horas para RTC-----------------------
int segundo;
int minuto;
int hora;

//-----------------Variable HUMEDAD--------------------------------------------------------
const int AirValue = 4095;   //   Value_1 => 1024 x 4 = 0 - 4095
const int WaterValue = 2240;  //  Value_2 => 592

//------------------------------------
WiFiClient espClient;
PubSubClient client(espClient);

//------------------------CALLBACK-----------------------------
void callback(char* topic, byte* payload, unsigned int length) {

  char PAYLOAD[5] = "    ";
  
  Serial.print("Mensaje Recibido: [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    PAYLOAD[i] = (char)payload[i];
  }
  Serial.println(PAYLOAD);

  if (String(topic) ==  String(ESTADOPOSTALMACIGO)) {
    if (payload[1] == 'N'){
     digitalWrite(19, HIGH);      // GPIO 19 
    }
    if (payload[1] == 'F'){
     digitalWrite(19, LOW);       //  GPIO 19 
    }
  }

  if (String(topic) ==  String(ESTADOALMACIGO)) {
    if (payload[1] == 'N'){
        digitalWrite(4, HIGH);      //  - GPIO 4
    }
    if (payload[1] == 'F'){
      digitalWrite(4, LOW);       //  - GPIO 4
    }
  }

  if (String(topic) ==  String(SALIDARIEGOALMACIGO)) {
    if (payload[1] == 'N'){
     digitalWrite(27, LOW);      // GPIO 27 cambiar para rele HIGH -> LOW
    }
    if (payload[1] == 'F'){
     digitalWrite(27, HIGH);       //  GPIO 27 cambiar para rele LOW -> HIGH
    }
  }

  if (String(topic) ==  String(SALIDAOXIGENACIONPOSTALMACIGO)) {
    if (payload[1] == 'N'){
        digitalWrite(26, LOW);      // D6 - GPIO 26 cambiar para rele HIGH -> LOW
    }
    if (payload[1] == 'F'){
      digitalWrite(26, HIGH);       // D6 - GPIO 26  cambiar para rele LOW -> HIGH
    }
  }

  if (String(topic) ==  String(SALIDAALUMBRADO)) {
    if (payload[1] == 'N'){
        digitalWrite(23, LOW);      // D6 - GPIO 26 cambiar para rele HIGH -> LOW
    }
    if (payload[1] == 'F'){
      digitalWrite(23, HIGH);       // D6 - GPIO 26  cambiar para rele LOW -> HIGH
    }
  }
}

//------------------------RECONNECT-----------------------------
void reconnect() {
  uint8_t retries = 3;
  // Loop hasta que estamos conectados
  while (!client.connected()) {
    Serial.print("Intentando conexion MQTT...");
    // Crea un ID de cliente al azar
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    USERNAME.toCharArray(PLACA, 50);
    
    if (client.connect("", usernameMqtt, PASSWORD)) {

      Serial.println("conectado");
      client.subscribe(SALIDARIEGOALMACIGO);
      client.subscribe(SALIDAOXIGENACIONPOSTALMACIGO);
      client.subscribe(SALIDAALUMBRADO);

      client.subscribe(ESTADOALMACIGO);
      client.subscribe(ESTADOPOSTALMACIGO);

    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println(" intenta nuevamente en 5 segundos");
      // espera 5 segundos antes de reintentar
      delay(5000);
    }
    retries--;
    if (retries == 0) {
      // esperar a que el WDT watchdog  lo reinicie
      while (1);
    }
  }
}

//------------------------SETUP-----------------------------
void setup() {

  pinMode(23, OUTPUT);  //  salida Alumbrado  
  digitalWrite(23, HIGH);   //   cambiar para rele LOW -> HIGH

  pinMode(27, OUTPUT);  //  salida riego almacigo    
  digitalWrite(27, HIGH);   //   cambiar para rele LOW -> HIGH

  pinMode(26, OUTPUT);   //  salida oxigenacion post a.
  digitalWrite(26, HIGH);      //      cambiar para rele LOW -> HIGH

  //------------DEFINIR ESTADOS-----------------
  pinMode(19, OUTPUT);   //  STADO Post aLmacigo. - 
  digitalWrite(19, LOW);

  pinMode(4, OUTPUT);   //  STADO  aLmacigo. - 
  digitalWrite(4, LOW);

  pinMode(18, INPUT);               // Estado POST ALMACIGO --> definir PIN
  pinMode(2, INPUT);               // Estado ALAMCIGO --> definir PIN
  //------------------------------------------

  // Entradas
     //pinMode(14, INPUT);    // D5 - GPIO 14

  // Inicia Serial
  Serial.begin(115200);
  Serial.println("");
  // Inicia RTC
   rtc.begin();
   //rtc.adjust(DateTime(__DATE__,__TIME__)); // ok correcto ACtivar al primera subida y desactivar a la segunda subida

  // Conexión WIFI
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED and contconexion <50) { //Cuenta hasta 50 si no se puede conectar lo cancela
    ++contconexion;
    delay(500);
    Serial.print(".");
  }
  if (contconexion < 50) {
      //para usar con ip fija
      IPAddress ip(192,168,10,156); 
      IPAddress gateway(192,168,10,1); 
      IPAddress subnet(255,255,255,0); 
      WiFi.config(ip, gateway, subnet); 
      
      Serial.println("");
      Serial.println("WiFi conectado");
      Serial.println(WiFi.localIP());
  }
  else { 
      Serial.println("");
      Serial.println("Error de conexion");
  }
  //fin conexion  
  
  client.setServer(SERVER, SERVERPORT);
  client.setCallback(callback);// el que resive el mensaje

//Copia los caracteres de la cadena al búfer proporcionado TEMPERATURA QUE LLEVA ESOS DATOS DE STRING
 //enviando
    
    String hralmacigo = "/" + USERNAME + "/" + "almacigo" + "/" + "sensorSeedlingHumidity" ;
    hralmacigo.toCharArray(HRALMACIGO, 50);  

//recibiendo
    String riegoAlmacigo = "/" + USERNAME + "/" + "almacigo" + "/" + "actuadorBombaAlmacigo" ;
    riegoAlmacigo.toCharArray(SALIDARIEGOALMACIGO, 50);  

    String oxigenacionPostAlmacigo = "/" + USERNAME + "/" + "post-almacigo" + "/" + "actuadorBombaPostAlmacigo" ;
    oxigenacionPostAlmacigo.toCharArray(SALIDAOXIGENACIONPOSTALMACIGO, 50); 

    String alumbradoModulo = "/" + USERNAME + "/" + "nft" + "/" + "actuadorAlumbrado" ;
    alumbradoModulo.toCharArray(SALIDAALUMBRADO, 50); 

  //----estados
    String estadoAlmacigo = "/" + USERNAME + "/" + "almacigo" + "/" + "estadoAlmacigo" ;
    estadoAlmacigo.toCharArray(ESTADOALMACIGO, 50);   

    String estadoPostAlmacigo = "/" + USERNAME + "/" + "post-almacigo" + "/" + "estadoPostAlmacigo" ;
    estadoPostAlmacigo.toCharArray(ESTADOPOSTALMACIGO, 50);     
    
  delay(1000); // DE 200 A 1000 CAMBIADO 
}

//--------------------------LOOP--------------------------------
void loop() {
    DateTime now = rtc.now();

    // Trabajar con la variable hora y minuto
    hora = now.hour();
    minuto = now.minute();
    segundo = now.second();
    
    Serial.print(now.year(), DEC);
    Serial.print('/');
    Serial.print(now.month(), DEC);
    Serial.print('/');
    Serial.print(now.day(), DEC);
    Serial.print(" ");
    
    Serial.print(hora);
    Serial.print(':');
    Serial.print(minuto);
    Serial.print(':');
    Serial.print(segundo);
    Serial.println(" ");
  //-----------------------

  if (!client.connected()) { // si el cliente no conecta.
    reconnect();
  }
  client.loop();

//---------estado------post almacigo---------------------
  int valorpa = 0;
  valorpa = estado_postalmacigo();  /* obtenemos valor de 0 o 1*/
  
  if(valorpa == LOW){    
  }
  else{
        if(valorpa == HIGH){
            horario_oxigenacion();                  
          }
  }
//------estado--------- almacigo------------------
  int valora = 0;
  valora = estado_almacigo();  /* obtenemos valor de 0 o 1*/
  
  if(valora == LOW){    
  }
  else{
        if(valora == HIGH){
          horario_riego(); 
          
          if (( hora < 25 ) && minuto == 0 && segundo == 0){   

          int valueHr = analogRead(33);  
          int valuePorcentajeHr = map(valueHr, AirValue, WaterValue, 0, 100);  

          strhralmacigo = String(valuePorcentajeHr); //1 decimal
          strhralmacigo.toCharArray(valueStr, 15);
          Serial.println("Enviando: [" +  String(HRALMACIGO) + "] " + strhralmacigo);
          client.publish(HRALMACIGO, valueStr);
          
          }else
          {
            /* code */
            // Serial.println("No eviar ");
          }         
        } 
        
  }

  delay(1000); // 200 / 5 repeticiones dentro de 1 segundo
}

int estado_postalmacigo(){ 
  if ( digitalRead(18) == HIGH)
  {   
    Serial.println("HIGH  PA"); // Lee valor G18
    return 1;
  }else
  {
    Serial.println("LOW PA");
    return 0;
  }
}

int estado_almacigo(){ 
  if ( digitalRead(2) == HIGH)
  {   
    Serial.println("HIGH A"); // Lee valor G2
    return 1;
  }else
  {
    Serial.println("LOW A");
    return 0;
  }
}

void horario_oxigenacion(){ 
  
  Serial.println("Motor Oxigeno");

  if (hora >= 6 && hora <= 18) // oxigeno 6-18
  { 
      if ((minuto >= 0 && minuto <= 5) || (minuto >= 20 && minuto <= 25) || (minuto >= 40 && minuto <= 45) )
      {
        //prendigo de oxigenacion 1-5
        /* prendido de oxigenacion 20-25*/
        /* prendimos oxigeno 40 -45 */
        digitalWrite(26, LOW);             //cambiar para rele  HIGH  -> LOW
        Serial.println("Oxigenacion ON 5 MINUTOS");

      } else
      {
        /* apago de oxigeno */
        digitalWrite(26, HIGH);      //cambiar para rele  LOW -> HIGH
        Serial.println("Oxigenacion OFF minutos");
      }
      
  }else
  {
    /* apago de oxigeno */
    digitalWrite(26, HIGH);          //cambiar para rele  LOW  -> HIGH
    Serial.println("Oxigenacion OFF horas");
  }

   
}
////////////////////Condicional del Horario 2  //////////////////////////////////
void horario_riego(){ 

   Serial.println("Motor Riego");

  if (hora == 6 || hora == 12 || hora == 18) // oxigeno 6-12-18
  { 
      if ( minuto == 0 && segundo >= 0 && segundo <= 3)
      {
        //prendigo de riego 0-3 REgulamos segun el motor que se tenga
        digitalWrite(27, LOW);     //cambiar para rele  HIGH  -> LOW
        Serial.println("Reigo ON 0-3");
      }else
      {
        /* apago de Reigo */
        digitalWrite(27, HIGH);     //cambiar para rele  LOW -> HIGH
        Serial.println("Reigo OFF segundos");
      }
      
  }else
  {
    /* apago de Reigo */
    digitalWrite(27, HIGH);       //cambiar para rele  LOW -> HIGH
    Serial.println("Reigo OFF horas");
  }
}