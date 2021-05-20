
#include <DHT.h>;


#define DHTPIN 2    
#define DHTTYPE DHT22   
DHT dht(DHTPIN, DHTTYPE); 



int chk;
float hum; 
float temp; 

void setup()
{
  Serial.begin(9600);
  dht.begin();
}

void loop()
{

    hum = dht.readHumidity();
    temp= dht.readTemperature();

    
    if(hum!=NAN || temp!=NAN){
    Serial.print("h");
    Serial.print(hum);
    Serial.println();
    Serial.print("t");
    Serial.print(temp);
    Serial.println();
    }
    delay(30000); 
}
