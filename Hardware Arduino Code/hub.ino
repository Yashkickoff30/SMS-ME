#include<SPI.h>
#include <SoftwareSerial.h>
#include<nRF24L01.h>
#include<RF24.h>
#define rxPin 3
#define txPin 4
SoftwareSerial myserial = SoftwareSerial(rxPin, txPin);
#include <ArduinoJson.h>
StaticJsonBuffer<200> jsonBuffer;

const uint64_t pipe[1]= {0xF0F0F0F0E1LL};
RF24 radio(7,8);
int rec[1] = {2};
int red;
struct package
{
  int Deviceid;
  int State;
  char Date[11];
  char Day[3];
  char Times[6];
  double Ampere;
  double Voltage;
  int Hubid = 1;
};
typedef struct package Package;
Package data;

void setup()
{
  myserial.begin(57600);
  Serial.begin(57600);
  radio.begin();
  delay(100);
  radio.setAutoAck(true);
  radio.enableAckPayload();
  radio.enableDynamicPayloads();
  radio.openReadingPipe(1,pipe[0]);
  radio.startListening();
  radio.setRetries(15,15);
}
void loop()
{
  if ( radio.available() ) {
    Serial.print("\nRadio Available:");
    radio.read( &data, sizeof(data) );
    radio.writeAckPayload( 1, rec, sizeof(int) );
    Serial.print("\n--->ack sent:");
    Serial.print(rec[0]);
    rec[0]+=2;
    Serial.print("\nPayload:");
      
      Serial.print("Spokeid ");
      Serial.println(data.Deviceid);
      Serial.println( data.State);
      Serial.println(String(data.Date));
      Serial.println(data.Day);
      Serial.println(data.Times);
      Serial.print("AmpsRMS ");
      Serial.println(data.Ampere);
      Serial.print("Voltage ");
      Serial.println(data.Voltage);

      serial();
}
//delay(40000);
}

void serial()
{

//********************GSM Communication Starts********************
  if(myserial.available())
    Serial.write(myserial.read());
  
  myserial.println("AT");
  delay(1000);
  Serial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  myserial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  delay(1000);
  ShowSerialData();

  Serial.println("AT+SAPBR=3,1,\"APN\",\"airtelgprs.com\"");
  myserial.println("AT+SAPBR=3,1,\"APN\",\"airtelgprs.com\"");//APN
  delay(1000);
  ShowSerialData();

  Serial.println("AT+SAPBR=1,1");
  myserial.println("AT+SAPBR=1,1");
  delay(1000);
  ShowSerialData();

  Serial.println("AT+SAPBR=2,1");
  myserial.println("AT+SAPBR=2,1");
  delay(1000);
  ShowSerialData();

  Serial.println("AT+HTTPINIT");
  myserial.println("AT+HTTPINIT");
  delay(1000);
  ShowSerialData();

  Serial.println("AT+HTTPPARA=\"CID\",1");
  myserial.println("AT+HTTPPARA=\"CID\",1");
  delay(1000);
  ShowSerialData();

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& object = jsonBuffer.createObject();


  object.set("spokeid",data.Deviceid);  
  object.set("hubid",data.Hubid);    
  object.set("id",1); 
  object.set("state",data.State);
  object.set("date",data.Date);
  object.set("day",data.Day);
  object.set("time",data.Times);
  object.set("ampere",data.Ampere);
  object.set("volt",data.Voltage);

  object.printTo(Serial);
  Serial.println(" ");
  String sendtoserver;
  object.prettyPrintTo(sendtoserver);
  delay(1000);  

  myserial.println("AT+HTTPPARA=\"URL\",\"http://sms-med.herokuapp.com/api\""); //Server address
  delay(1000);
  ShowSerialData();

  myserial.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  delay(1000);
  ShowSerialData();

  myserial.println("AT+HTTPDATA=" + String(sendtoserver.length()) + ",100000");
  Serial.println(sendtoserver);
  delay(1000);
  ShowSerialData();

  myserial.println(sendtoserver);
  delay(1000);
  ShowSerialData;

  myserial.println("AT+HTTPACTION=1");
  delay(1000);
  ShowSerialData();
 
  myserial.println("AT+HTTPREAD");
  delay(3000);
  ShowSerialData();
 
  myserial.println("AT+HTTPTERM");
  delay(5000);
  ShowSerialData();
 }
  /********************GSM Communication Stops********************/





void ShowSerialData()
{
  while (myserial.available() != 0){
     Serial.write(myserial.read());
     //Serial.write("ok");   
  }

  delay(1000);
 
}
