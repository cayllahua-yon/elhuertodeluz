/*
    MOdulo 2 NFT
    RTC
    DHT21 - GPIO 13 input ->temp-humidity -> envio cada  hora
    Estado Nft Sensores - GPIO 19 output 18 input -> envio dato cada hora x 24  -ce-ph-tempWater
      - pH - GPIO 32 input 
      - TempWater - GPIO 25 input
      - ec - GPIO 23 input - output - GPIO 16 - 17 UART utilizar un modulo rs485 para obtener los datos -- o ultizar el rasberry pi mediante modbus implementado
    
    // Sensores Manual consulta -> envio dato peticion segun cliente sin guardar Datos- inmediatamente. 
                                 ->  GPIO 33 output - 34 input -< Estado

    * Estado NFT Bomba - GPIO 4 output 2 input -> programa de on-off auto
     ** Actuador Bomba Manual - GPIO 27 output -> riego NFT 
    
    * Boya GPIO 26 - Envia datos del estado de boya

*/
#include <WiFi.h>
#include <PubSubClient.h>
#include "RTClib.h"
#include "DHT.h"

#include <OneWire.h>  
#include <DallasTemperature.h>

#define DHTPIN 13         // Gpio 13 
#define DHTTYPE DHT21  
DHT dht(DHTPIN, DHTTYPE);

RTC_DS3231 rtc;

const int pinDatosDQ = 25;  // Pin donde se conecta el bus 1-Wire
// Instancia a las clases OneWire y DallasTemperature
OneWire oneWireObjeto(pinDatosDQ);
DallasTemperature sensorDS18B20(&oneWireObjeto);

//ph
const int potPin=32;
unsigned long int avgval;
int buffer_arr[10], temp;
float dataph;

int contconexion = 0;

const char *ssid = "WLAN_LUZ"; 
const char *password = "Churucutitobb260520$"; 

char   SERVER[50]   = "192.168.10.14";   
int    SERVERPORT   =  1883; 

String USERNAME = "modulo1";  

const char* usernameMqtt = "yon"; 
char   PASSWORD[50] = "mujer";  //mqtt mosquito en rpi  

char PLACA[50];

String strPulsador;
String strPulsadorUltimo;
char valueStr[15];

String strtemp = "";
String strwatertemp = "";
String strhumidity = "";
String strph = "";

char TEMPERATURA[50];   // Ambiente
char HUMEDAD[50];       // Ambiente
char BOYA[50]; 

char PH[50]; 
char TEMPERATURAAGUA[50];
char EC[50];

char TEMPERATURAAGUACONSULTA[50];
char PHCONSULTA[50]; 
char ECCONSULTA[50];

char SALIDARIEGONFT[50]; 

char ESTADONFTBOMBA[50];
char ESTADONFTSENSOR[50];
char ESTADONFTSENSORCONSULTA[50];


//-------------------Variable Horas para RTC-----------------------
int segundo;
int minuto;
int hora;

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

  if (String(topic) ==  String(ESTADONFTSENSOR)) {
    if (payload[1] == 'N'){
     digitalWrite(19, HIGH);      // GPIO 19 
    }
    if (payload[1] == 'F'){
     digitalWrite(19, LOW);       //  GPIO 19 
    }
  }

  if (String(topic) ==  String(ESTADONFTBOMBA)) {
    if (payload[1] == 'N'){
        digitalWrite(4, HIGH);      //  - GPIO 4 
    }
    if (payload[1] == 'F'){
      digitalWrite(4, LOW);       //  - GPIO 4
    }
  }

  if (String(topic) ==  String(ESTADONFTSENSORCONSULTA)) {
    if (payload[1] == 'N'){
        digitalWrite(33, HIGH);      //  - GPIO 33 sensor
    }
    if (payload[1] == 'F'){
      digitalWrite(33, LOW);       //  - GPIO 33
    }
  }

  if (String(topic) ==  String(SALIDARIEGONFT)) {
    if (payload[1] == 'N'){
     digitalWrite(27, LOW);      // GPIO 27 cambiar para rele HIGH -> LOW
    }
    if (payload[1] == 'F'){
     digitalWrite(27, HIGH);       //  GPIO 27 cambiar para rele LOW -> HIGH
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
      client.subscribe(SALIDARIEGONFT);
 

      client.subscribe(ESTADONFTBOMBA);
      client.subscribe(ESTADONFTSENSOR);
      client.subscribe(ESTADONFTSENSORCONSULTA);

    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println(" intenta nuevamente en 5 segundos");
      // espera 5 segundos antes de reintentar
      delay(5000);
    }
    retries--;
    if (retries == 0) {
      // esperar a que el WDT lo reinicie
      while (1);
    }
  }
}

//------------------------SETUP-----------------------------
void setup() {
  pinMode(27, OUTPUT);      //salida Riego NFT   
  digitalWrite(27, HIGH);   // cambiar para rele LOW -> HIGH

  //------------DEFINIR ESTADOS-----------------
  pinMode(19, OUTPUT);   //  STADO Nft Sensor.  
  digitalWrite(19, LOW);

  pinMode(4, OUTPUT);   //  STADO  Nft Bomba.  
  digitalWrite(4, LOW);

  pinMode(33, OUTPUT);   //  STADO  Nft Sensor Consulta.  
  digitalWrite(33, LOW);

  pinMode(18, INPUT);   // Estado Nft Sensor
  pinMode(2, INPUT);    // Estado Nft Bomba 
  pinMode(34, INPUT);   // Estado Nft Sensor Consulta 

  pinMode(potPin,INPUT);   // pH- GPIO32
                      
  pinMode(26, INPUT);  // boya ok


  //---------------------------------------------------------

  // Inicia Serial
  Serial.begin(115200);
  Serial.println("");
  // Inicia RTC
   rtc.begin();
   //rtc.adjust(DateTime(__DATE__,__TIME__)); // ok correcto ACtivar y desactivar

  // Conexión WIFI
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED and contconexion <50) { //Cuenta hasta 50 si no se puede conectar lo cancela
    ++contconexion;
    delay(500);
    Serial.print(".");
  }
  if (contconexion <50) {
      //para usar con ip fija
      IPAddress ip(192,168,10,142); 
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
  
  // Inicializanado DHT
  dht.begin();

   // Iniciamos el bus 1-Wire
   sensorDS18B20.begin(); 

  client.setServer(SERVER, SERVERPORT);
  client.setCallback(callback);// el que resive el mensaje

//enviando      
    String temperatura = "/" + USERNAME + "/" + "nft" + "/" + "sensorAirTemp" ;
    temperatura.toCharArray(TEMPERATURA, 50);  

    String humedad = "/" + USERNAME + "/" + "nft" + "/" + "sensorAirHumidity" ;
    humedad.toCharArray(HUMEDAD, 50);  

    String sensorBoya = "/" + USERNAME + "/" + "nft" + "/" + "sensorBuoy" ;
    sensorBoya.toCharArray(BOYA, 50);  

    String sensorWaterPh = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterPh" ;
    sensorWaterPh.toCharArray(PH, 50);

    String sensorWaterTemp = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterTemp" ;
    sensorWaterTemp.toCharArray(TEMPERATURAAGUA, 50);

    String sensorWaterEc = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterEc" ;
    sensorWaterEc.toCharArray(EC, 50); //

//recibiendo                   
    String riegoBombaNft = "/" + USERNAME + "/" + "nft" + "/" + "actuadorBombaNft" ;  // b m
    riegoBombaNft.toCharArray(SALIDARIEGONFT, 50);   

  
  //----estados                                      
    String estadoNftBomba = "/" + USERNAME + "/" + "nft" + "/" + "estadoNftBomba" ;  //  b a
    estadoNftBomba.toCharArray(ESTADONFTBOMBA, 50);   

    String estadoNftSensor = "/" + USERNAME + "/" + "nft" + "/" + "estadoNftSensor" ;
    estadoNftSensor.toCharArray(ESTADONFTSENSOR, 50); 

    String estadoNftSensorConsulta = "/" + USERNAME + "/" + "nft" + "/" + "estadoNftSensorConsulta" ;
    estadoNftSensorConsulta.toCharArray(ESTADONFTSENSORCONSULTA, 50);

  // plus consultas
    String sensorWaterPhConsultation = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterPhConsultation" ;
    sensorWaterPhConsultation.toCharArray(PHCONSULTA, 50);

    String sensorWaterTempConsultation = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterTempConsultation" ;
    sensorWaterTempConsultation.toCharArray(TEMPERATURAAGUACONSULTA, 50);

    String sensorWaterEcConsultation = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterEcConsultation" ;
    sensorWaterEcConsultation.toCharArray(ECCONSULTA, 50); //   
    
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
//-----------------------------------------DHT-----------------------------
  if (( hora < 25 ) && minuto == 0 && segundo == 0){     // para Temperatura y humedad
    
    float temp = dht.readTemperature();
    strtemp = String(temp, 1); //1 decimal
    strtemp.toCharArray(valueStr, 15);
    Serial.println("Enviando: [" +  String(TEMPERATURA) + "] " + strtemp);
    client.publish(TEMPERATURA, valueStr);

    //EN ESTE INTERVALO ENVIAMOS TAMBIEN LA HUMEDAD
    float humd = dht.readHumidity();
    strhumidity = String(humd); //1 decimal
    strhumidity.toCharArray(valueStr, 15);    
    Serial.println("Enviando: [" +  String(HUMEDAD) + "] " + strhumidity);
    client.publish(HUMEDAD, valueStr);

  }else
    {
        /* code */
        // Serial.println("No eviar ");
    } 
  //----------sensor Buoy --------------------------------
  int SensorNivel = digitalRead(26);  // lleva una resistencia 220 Ohms 

  if (SensorNivel == 0) { 
        strPulsador = "ON"; // lleno
  } else {
    strPulsador = "OFF"; // vacio
  }

  if (strPulsador != strPulsadorUltimo) { 
    strPulsadorUltimo = strPulsador;
    strPulsador.toCharArray(valueStr, 15);
    Serial.println("Enviando: [" +  String(BOYA) + "] " + strPulsador);
    client.publish(BOYA, valueStr);
  } 

//---------estado------NFT Bomba---------------------
  int valorenb = 0;
  valorenb = estado_nftbomba();  /* obtenemos valor de 0 o 1*/
  
  if(valorenb == LOW){    
  }
  else{
        if(valorenb == HIGH){
            horario_bombanft();                  
          }
  }

//------estado--------- NFT SENSORES-------------------------
  int valorens = 0;
  valorens = estado_nftsensor();  /* obtenemos valor de 0 o 1*/
  
  if(valorens == LOW){    
  }
  else{
        if(valorens == HIGH){ //
           
          if (( hora < 25 ) && minuto == 0 && segundo == 0){   // Enviar cada hora lectura sensores
              Serial.println("Sensores activados ");
              // Water Temp....              
              sensorDS18B20.requestTemperatures(); // enviando comandos a los sensores
              float valorWaterTemp = sensorDS18B20.getTempCByIndex(0);
              Serial.print("Temperatura sensor 0: "); // Leemos y mostramos los datos de los sensores DS18B20
              Serial.print(valorWaterTemp); 
              Serial.println(" C");

              strwatertemp = String(valorWaterTemp, 1); //1 decimal float
              strwatertemp.toCharArray(valueStr, 15);
              Serial.println("Enviando: [" +  String(TEMPERATURAAGUA) + "] " + strwatertemp);
              client.publish(TEMPERATURAAGUA, valueStr);

              // ph
              for (int i = 0; i < 10; i++)
              {
                buffer_arr[i] = analogRead(potPin);
                delay(30);
                //Serial.print(buffer_arr[i]);
                //Serial.print(" | ");
              }
              for (int i = 0; i < 9; i++)
              {
                for (int j = i + 1; j < 10; j++)
                {
                  if (buffer_arr[i] > buffer_arr[j])
                  {
                    temp = buffer_arr[i];
                    buffer_arr[i] = buffer_arr[j];
                    buffer_arr[j] = temp;
                  }
                }
              }
              avgval = 0;

              for (int i = 2; i < 8; i++)
                avgval += buffer_arr[i];
                Serial.print(avgval);
                Serial.print(" | ");
                float voltage=(avgval/6)*(3.3/4095.0);
                dataph=(3.3*voltage);//3.3    
              Serial.print("pH Val: ");
              Serial.println(dataph);

              strph = String(dataph, 1); //1 decimal float
              strph.toCharArray(valueStr, 15);
              Serial.println("Enviando: [" +  String(PH) + "] " + strph);
              client.publish(PH, valueStr);
          }else
          {
            /* code */
            // Serial.println("No eviar ");
          }         
        }        
  }

  //------estado--------- NFT SENSORES CONSULTA-------------------------
    int valorensc = 0;
  valorensc = estado_nftsensorconsulta();  /* obtenemos valor de 0 o 1*/ // activacion inmediata
  
  if(valorensc == LOW){    
  }
  else{
        if(valorensc == HIGH){ //           
          Serial.println("Sensores activados consulta");
            // codigo de sensores de consulta.......ENVIAMOS POR OTRO MQTT..
              // Water Temp....              
              sensorDS18B20.requestTemperatures(); // enviando comandos a los sensores
              float valorWaterTemp = sensorDS18B20.getTempCByIndex(0);
              Serial.print("Temperatura sensor 0 consulta: "); // Leemos y mostramos los datos de los sensores DS18B20
              Serial.print(valorWaterTemp); 
              Serial.println(" C");

              strwatertemp = String(valorWaterTemp, 1); //1 decimal float
              strwatertemp.toCharArray(valueStr, 15);
              Serial.println("Enviando consulta : [" +  String(TEMPERATURAAGUACONSULTA) + "] " + strwatertemp);
              client.publish(TEMPERATURAAGUACONSULTA, valueStr);

              // ph
              for (int i = 0; i < 10; i++)
              {
                buffer_arr[i] = analogRead(potPin);
                delay(30);
                //Serial.print(buffer_arr[i]);
                //Serial.print(" | ");
              }
              for (int i = 0; i < 9; i++)
              {
                for (int j = i + 1; j < 10; j++)
                {
                  if (buffer_arr[i] > buffer_arr[j])
                  {
                    temp = buffer_arr[i];
                    buffer_arr[i] = buffer_arr[j];
                    buffer_arr[j] = temp;
                  }
                }
              }
              avgval = 0;
              
              for (int i = 2; i < 8; i++)
                avgval += buffer_arr[i];
                Serial.print(avgval);
                Serial.print(" | ");
                float voltage=(avgval/6)*(3.3/4095.0);
                dataph=(3.3*voltage);//3.3    
              Serial.print("pH Valor Consulta:  ");
              Serial.println(dataph);

              strph = String(dataph, 1); //1 decimal float
              strph.toCharArray(valueStr, 15);
              Serial.println("Enviando Consulta: [" +  String(PHCONSULTA) + "] " + strph);
              client.publish(PHCONSULTA, valueStr);               
        }        
  }
  //------------------------------------------------------------
 
  delay(1000); // 200 / 5 repeticiones dentro de 1 segundo
}

int estado_nftbomba(){ 
  if ( digitalRead(2) == HIGH)
  {   
    Serial.println("HIGH  NFTB"); // Lee valor G2
    return 1;
  }else
  {
    Serial.println("LOW NFTB");
    return 0;
  }
}

int estado_nftsensor(){ 
  if ( digitalRead(18) == HIGH)
  {   
    Serial.println("HIGH  NFTS"); // Lee valor Gpio2
    return 1;
  }else
  {
    Serial.println("LOW NFTS");
    return 0;
  }
}

int estado_nftsensorconsulta(){ 
  if ( digitalRead(34) == HIGH)
  {   
    Serial.println("HIGH  NFTSC"); // Lee valor Gpio34
    return 1;
  }else
  {
    Serial.println("LOW NFTSC");
    return 0;
  }
}


void horario_bombanft(){ 
  
  Serial.println("Bomba NFT");

  if (hora >= 7 && hora <= 18) // oxigeno 7-18 --- respecto pruebas modificar el tiempo 
  { 
      if ((minuto >= 0 && minuto <= 10) || ((minuto >= 30 && minuto <= 35)) // 
      {
        digitalWrite(27, LOW);             //cambiar para rele  HIGH  -> LOW
        Serial.println("Bomba NFT ON");
      }else
      {
        /* apago de oxigeno */
        digitalWrite(27, HIGH);      //cambiar para rele  LOW -> HIGH
        Serial.println("Bomba NFT OFF minutos");
      }      
  }else
  {
    /* apago de oxigeno */
    digitalWrite(27, HIGH);          //cambiar para rele  LOW  -> HIGH
    Serial.println("Bomba NFT OFF horas");
  }     
}