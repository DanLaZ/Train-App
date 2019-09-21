var firebaseConfig = {
    apiKey: "AIzaSyDC_sqpxWiKbtPq3CmRIo4igXet49oziRA",
    authDomain: "train-scheduler-16178.firebaseapp.com",
    databaseURL: "https://train-scheduler-16178.firebaseio.com",
    projectId: "train-scheduler-16178",
    storageBucket: "",
    messagingSenderId: "855455855198",
    appId: "1:855455855198:web:0cabe1fc801d955d"
};
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
    
  
    $("#add-train-btn").on("click", function(event) {
      event.preventDefault();
    
    
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var firstTime = $("#rate-input").val().trim();
      var frequency = $("#start-input").val().trim();
    
      var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        firstTime: firstTime,
        frequency: frequency,
        
      };
     
  
      database.ref().push(newTrain);
      
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#rate-input").val("");
      $("#start-input").val("");
  });
  
      database.ref().on("child_added", function(childSnapshot) {
  
        var trainName = childSnapshot.val().firstTrain;
        var trainDestination = childSnapshot.val().trainDestination; 
        var firstTime = childSnapshot.val().firstTime;
        var frequency = childSnapshot.val().frequency;
  
        var time = moment();
        var timeFormat = moment(firstTime, "HH:mm").subtract(1,"years");
        var timeDifference= moment().diff(moment(timeFormat), "minutes");
        var timeRemaining = timeDifference % frequency;
        var timeUntilTrain = frequency - timeRemaining;
        var nextTrain = moment().add(timeUntilTrain, "minutes");
        var arrival = moment(nextTrain).format("hh:mm")
  
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(frequency),
          $("<td>").text(arrival),
          $("<td>").text(timeUntilTrain),
    
      );
  
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);
  });