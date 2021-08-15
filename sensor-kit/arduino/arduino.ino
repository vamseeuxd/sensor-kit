int lastValue = 0;

// the setup routine runs once when you press reset:
void setup() {                
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  lastValue = lastValue + 100.00;
  Serial.println(lastValue);
  delay(1000);
}
