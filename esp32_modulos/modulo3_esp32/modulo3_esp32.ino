// MOdulo 3 
//envio de cantidad de agua
//distancia de nivel de agua
// pin 2 state led water level 

#include <WiFi.h>
#include <PubSubClient.h>

int contconexion = 0;

const char *ssid = "WLAN_LUZ"; 
const char *password = "Churucutitobb260520$"; 

char   SERVER[50]   = "192.168.10.14";   
int    SERVERPORT   =  1883; 

String USERNAME = "modulo1";  

const char* usernameMqtt = "yon"; 
char   PASSWORD[50] = "mujer";  //mqtt mosquito en rpi  

char PLACA[50];

//---------Distancia-----------------
const int PinTrig = 27;
const int PinEcho = 26;
const float VelSon = 34000.0; // Constante velocidad sonido en cm/s 
float distancia;
//-------------------------------

char valueStr[15];  // flujo de agua
String strtemp = ""; // flujo de agua
String strrotoplas = ""; // Distancia

char ESTADOWATERLEVEL[50];

char CONSUMOAGUA[50];
char FLUJODEAGUA[50];
char SALIDAROTOPLAS[50]; // Distancia


float valorVolumenAgua = -1;
String valorWaterLevel = "OFF"; //Global state
//-----------Inicia Agua---------
int tecla;
int PinSolenoide = 4;  // solenoide  PIN
const int sensorPin = 18;    // sensor  PIN
const int measureInterval = 500; //2500 /1000
volatile int pulseConter;
 
// YF-S201
const float factorK = 8.7; 
 
float volume = 0;
long t0 = 0;
//-------------------Fin Agua-----------------------
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

 // recepcion de codigo de nube
  if (String(topic) ==  String(CONSUMOAGUA)) { 
      valorVolumenAgua = String(PAYLOAD).toFloat();
  }

  if (String(topic) ==  String(ESTADOWATERLEVEL)) {
    if (payload[1] == 'N'){
        digitalWrite(2, HIGH);      //  - GPIO 19
        valorWaterLevel = "ON"; // N  - F
      Serial.println(valorWaterLevel);
    }
    if (payload[1] == 'F'){
      digitalWrite(2, LOW);       //  - GPIO 19
      valorWaterLevel = "OFF"; // N  - F
      Serial.println(valorWaterLevel);
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

      client.subscribe(CONSUMOAGUA);  // valor analogico ingresado
      client.subscribe(ESTADOWATERLEVEL);     

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


//-------------------------Inicio agua----------
void ISRCountPulse()
{
   pulseConter++;
}
 
float GetFrequency()
{
   pulseConter = 0; 
   interrupts();
   delay(measureInterval);
   noInterrupts(); 
   return (float)pulseConter * 1000 / measureInterval;
}
 
void SumVolume(float dV)
{
   volume += dV / 60 * (millis() - t0) / 1000.0;
   t0 = millis();
}
//-------------------fin agua--------------------
//------------------------SETUP-----------------------------
void setup() {

  pinMode(2, OUTPUT);   //  STADO Nft water level.  
  digitalWrite(2, LOW);

  //----------------agua--------------------------
 pinMode(PinSolenoide, OUTPUT);  // pin de rele para solenoide
    digitalWrite(PinSolenoide, HIGH);  // inicializamos el rele para solenoide en low-> cerrado 
  
  //---------------------------------------------------------

  // Inicia Serial
  Serial.begin(115200);
  Serial.println("");
  
  //-----------------Distancia-----------------------------
 // Ponemos el pin Trig en modo salida
  pinMode(PinTrig, OUTPUT);
  // Ponemos el pin Echo en modo entrada
  pinMode(PinEcho, INPUT);
//------------------------------------------

  // Conexión WIFI
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED and contconexion <50) { //Cuenta hasta 50 si no se puede conectar lo cancela
    ++contconexion;
    delay(500);
    Serial.print(".");
  }
  if (contconexion <50) {
      //para usar con ip fija
      IPAddress ip(192,168,10,115); 
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

//RECIBIENDO      
    String consumoAgua = "/" + USERNAME + "/" + "nft" + "/" + "consumoAgua" ;
    consumoAgua.toCharArray(CONSUMOAGUA, 50);
//ENVIANDO
    String flujoDeAgua = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterFlow" ;
    flujoDeAgua.toCharArray(FLUJODEAGUA, 50);  

    String rotoplas = "/" + USERNAME + "/" + "nft" + "/" + "sensorWaterLevelRotoplas" ;
    rotoplas.toCharArray(SALIDAROTOPLAS, 50); 

    String estadoWaterLevel = "/" + USERNAME + "/" + "nft" + "/" + "estadoWaterLevel" ;
    estadoWaterLevel.toCharArray(ESTADOWATERLEVEL, 50);

   //-----------Agua--------------------------------------
   attachInterrupt(digitalPinToInterrupt(sensorPin), ISRCountPulse, RISING);
   t0 = millis();
    
  delay(1000); // DE 200 A 1000 CAMBIADO  
}

//--------------------------LOOP--------------------------------
void loop() {

  if (!client.connected()) { // si el cliente no conecta.
    reconnect();
  }
  client.loop();

//-----distancia-----------------------------------------------
 String validandoWL = "ON";

if(valorWaterLevel == validandoWL){

  iniciarTrigger();

  // La función pulseIn obtiene el tiempo que tarda en cambiar entre estados, en este caso a HIGH
  unsigned long tiempo = pulseIn(PinEcho, HIGH);
  
  // Obtenemos la distancia en cm, hay que convertir el tiempo en segudos ya que está en microsegundos
  // por eso se multiplica por 0.000001
  distancia = tiempo * 0.000001 * VelSon / 2.0;  // 4
  
  float distanciaVacio = 68.6; 
  float distancialleno = distanciaVacio - distancia; // 67 - 4  // poner condiciones para iniciar lectura
    
  float pi = 3.141592654;   

  float v =distancialleno*pi*( pow(23.5 ,2) + pow(20 ,2) + (23.5*20))/3;
  float litro = v/1000;
  
   strrotoplas = String(litro , 1); //1 decimal
    strrotoplas.toCharArray(valueStr, 15);
    Serial.println("Enviando: [" +  String(SALIDAROTOPLAS) + "] " + strrotoplas);
    client.publish(SALIDAROTOPLAS, valueStr);
 
  Serial.print(distancialleno);
  Serial.print(" cm ");
  Serial.print(litro , 1);
  Serial.print(" Lt");
  Serial.println();
}
 
//---------------fin distancia-----------------

 //----------------agua-----------------------------
 // obtener frecuencia en Hz
   float frequency = GetFrequency();
 
   // calcular caudal L/min
   float flow_Lmin = frequency / factorK;
   SumVolume(flow_Lmin);

     if(valorVolumenAgua >=0){ // 5
            digitalWrite(PinSolenoide, LOW); // era low
            Serial.println("solenoide Abierto");

            Serial.print("valor de la nube ");
            Serial.println(valorVolumenAgua); 

            if ( volume >= valorVolumenAgua  ) // 5 valor de agua volumen 
            {
                digitalWrite(PinSolenoide, HIGH); 
                Serial.println("solenoide Cerrado con valor");                 

                //-----------water Flow /modulo1/nft/sensorWaterFlow                
                strtemp = String(flow_Lmin, 1); //1 decimal
                strtemp.toCharArray(valueStr, 15);
                Serial.println("Enviando: [" +  String(FLUJODEAGUA) + "] " + strtemp);
                client.publish(FLUJODEAGUA, valueStr);  
                
                //----reiniciando------------------------------
                volume = 0;
                valorVolumenAgua = -1;
            }
            
        
     }else{
        digitalWrite(PinSolenoide, HIGH); 
        Serial.println("solenoide Cerrado General"); 
        volume = 0;  // se añade por el 0.03 
     }

  Serial.print(" Caudal: ");
   Serial.print(flow_Lmin, 2);
   Serial.print(" (L/min)\tConsumo:");
   Serial.print(volume); // definimos ccon cuantos desimaes lo mostramos
   Serial.println(" (L)");

  delay(1000); // 200 / 5 repeticiones dentro de 1 segundo

}

//--------------------------distancia------------
void iniciarTrigger()
{
  // Ponemos el Triiger en estado bajo y esperamos 2 ms
  digitalWrite(PinTrig, LOW);
  delayMicroseconds(2);
  
  // Ponemos el pin Trigger a estado alto y esperamos 10 ms
  digitalWrite(PinTrig, HIGH);
  delayMicroseconds(10);
  
  // Comenzamos poniendo el pin Trigger en estado bajo
  digitalWrite(PinTrig, LOW);
}