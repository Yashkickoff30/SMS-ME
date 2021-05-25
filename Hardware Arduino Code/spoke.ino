#include<SPI.h>
#include<nRF24L01.h>
#include<RF24.h>
#include <DS3231.h>


// Init the DS3231 using the hardware interface
DS3231  rtc(SDA, SCL);


int mVperAmp = 100;
const int sensorIN = A0;
int msg[1] = {1};
int rec[1] = {5};
bool stat = true;
RF24 radio(7,8);
const uint64_t pipe[1] = {0xF0F0F0F0E1LL};
unsigned int lastTime = millis();
unsigned int delayBetween = 600;

struct package
{
  int Deviceid = 001;
  int State;
  char Date[11];
  char Day[3];
  char Times[6];
  double Ampere;
  double Voltage;
};


typedef struct package Package;
Package data;

double Voltage = 0;
double VRMS = 0;
double AmpsRMS = 0;
int state = 0;

void setup()
{
  //initialize rtc object
  rtc.begin();
  Serial.begin(57600);
  radio.begin();
  delay(100);
  radio.setAutoAck(true);
  radio.enableAckPayload();
  radio.enableDynamicPayloads();
  radio.stopListening();
  radio.openWritingPipe(pipe[0]);
  radio.setRetries(15,15);

//  setdata();
//  delay(4000);
 }
void loop()
{
   unsigned int timeNow = millis();
    if (timeNow - lastTime < delayBetween) 
    {
    Serial.print("loop Started ");
    setdata();
    delay(60000);
    radio.write(&data, sizeof(1));
    Serial.print("loop finished ");
  } 
  else {
      lastTime = millis();
      Serial.print("AmpsRMS ");
      Serial.println(data.Ampere);
      Serial.print("Voltage ");
      Serial.println(data.Voltage);
   if(radio.write(&data, sizeof(data)))
    {
      if(radio.isAckPayloadAvailable())
      {
        radio.read(rec,sizeof(int));
        Serial.print("received ack payload is : ");
        Serial.println(rec[0]);
      }
      else
      {
       Serial.println("status has become false so stop here....");
      }
    }
    else{
      Serial.println("wait.");
    }
  Serial.println("Fetching Power sensor data");
  Serial.println("Power sensor data fetched"); 
 }

 }


float getVPP(){
  float result;
  float readValue;
  int maxValue = 0;
  int minValue = 1024;

  uint32_t start_time = millis();
  while((millis() - start_time) < 20000)
  {
    readValue = analogRead(sensorIN);

    if(readValue > maxValue)
    {
      maxValue = readValue;
    }
    if(readValue < minValue)
    {
      minValue = readValue;
    }
  }

  result = ((maxValue - minValue) *5.0)/1024.0;
  
  return result;
}

void setdata(){
  
  Voltage = getVPP();
  VRMS = (Voltage/2.0) *0.707; // multiplying with root 2 , voltagerms = average_peekvoltage * root(2)
  AmpsRMS = (VRMS * 1000)/mVperAmp;

   // Send State
  if(Voltage >0.05)
  {
    data.State = 1;  
  }
  else
  {
    data.State = 0;
  }

  //Send Ampere
  data.Ampere = AmpsRMS;
  
  //Send Voltage
  data.Voltage = Voltage;
  
  strncpy(data.Date,rtc.getDateStr(),sizeof(data.Date)-1);
  data.Date[sizeof(data.Date)-1] = '\0';
  
  strncpy(data.Day,rtc.getDOWStr(),sizeof(data.Day)-1);
  data.Day[sizeof(data.Day)-1] = '\0';
  
  strncpy(data.Times,rtc.getTimeStr(),sizeof(data.Times)-1);
  data.Times[sizeof(data.Times)-1] = '\0';
  //state = 1;
}
