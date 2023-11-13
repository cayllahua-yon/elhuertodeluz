

### Descripcion de proyecto:
     aplicación web basado en iot para el cultivo por hidroponía.
     El proyecto consta de 3 partes que se integran para su funcionamiento:

     - ### Esp32 
        Instalar las siguientes librerías:
         * WiFi.h
         * PubSubClient.h
         * RTClib.h
         * DHT.h
         * OneWire.h
         * DallasTemperature.h 
        Asismismo en IDE de Arduino Añadir en Fili / Preferences / additional boards manager URLs: https://dl.espressif.com/dl/package_esp32_index.json
        
     - ### Raspberry Pi 
        Para el proyecto es nuestro MQTT-Broker, dentro de Raspberry instalar:
         * Mosquitto
         * NodeRed
            * ModBus
            * Line - notify
            * HueMagic 
            * Dashboard
            * Social - email
            * Storage - mysql
            * Network  - mqtt

         Tambien configurar para inicio de arranque automático para NodeRed cuando se reinicie la Raspberry pi.
         Asismismo configurar el SSH.                
          
     - ### Aplicacion Web
        Nos permite integrar los 2 puntos anteriores a este, para con ello poder brindar tanto los datos como los controles que se usaran en el cultivo de lechuga por hidropinia.
        
