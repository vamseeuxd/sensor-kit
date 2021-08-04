console.clear();
var fs = require("fs");
var admin = require("firebase-admin");
var oldValues = {};
var config = {};
var serviceAccount = {};
var dataBase = {};
var pondId = "";
var projectId = "";

function getConfig() {
  fs.readFile("./config.json", "utf8", function (err, data) {
    if (err) {
      throw err;
    }
    config = JSON.parse(data);
    oldValues = config["default-values"];
    getServiceAccountKey();
  });
}

function getServiceAccountKey() {
  fs.readFile("./serviceAccountKey.json", "utf8", function (err, data) {
    if (err) {
      throw err;
    }
    serviceAccount = JSON.parse(data);
    initFirestore();
  });
}

function initFirestore() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  dataBase = admin.firestore();
  getProjectAndPondId();
}

function getProjectAndPondId() {
  dataBase
    .collection("sensor-kits")
    .doc(config["sensor-kits-id"])
    .onSnapshot(
      function (docSnapshot) {
        pondId = docSnapshot.data().pondId;
        projectId = docSnapshot.data().projectId;
        console.log("pondId:", pondId, "projectId:", projectId);
        Object.keys(oldValues).forEach(function (key) {
          monitorValue(key);
        });
        /* monitorValue("ph-value");
        monitorValue("do-value"); */
      },
      function (err) {
        console.log("Encountered error: ", err);
      }
    );
}

function monitorValue(tableName) {
  console.log("Started Watching", tableName);
  fs.watchFile("../" + tableName + ".txt", function (curr, prev) {
    console.clear();
    var data = fs.readFileSync("../" + tableName + ".txt", {
      encoding: "utf8",
      flag: "r",
    });
    var newValue = Number(data);
    if (oldValues[tableName] != newValue) {
      oldValues[tableName] = newValue;
      console.log("New Value for", tableName, oldValues[tableName]);
      updateValueInDataBase(oldValues[tableName], tableName);
    } else {
      console.log("No Value Change in", tableName, oldValues[tableName]);
    }
  });
}

function updateValueInDataBase(value, tableName) {
  var currentDate = new Date(admin.firestore.Timestamp.now().seconds * 1000);
  var month = currentDate.getMonth() + 1;
  var fullYear = currentDate.getFullYear();
  var date = currentDate.getDate();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var newData = {
    pondId: pondId,
    projectId: projectId,
    value: value,
    month: month,
    fullYear: fullYear,
    date: date,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
  console.log(newData);
  dataBase
    .collection(tableName)
    .add(newData)
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  var dataToUpdate = {};
  dataToUpdate[tableName] = newData.value;
  dataBase
    .collection("ponds")
    .doc(pondId)
    .update(dataToUpdate)
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
}

getConfig();
