


    var video = document.querySelector("#videoElement");
    var canvas = document.querySelector("#showscreenshot");
    var img = document.querySelector("#showscreenshotimg");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }

    function Open(e) {
      var video = document.querySelector("#videoElement");
      var canvas = document.querySelector("#showscreenshot");
      var img = document.querySelector("#showscreenshotimg");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (error) {
            console.log("Something went wrong!");
          });
      }
    }

    function stop(e) {

      var stream = video.srcObject;
      var tracks = stream.getTracks();

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
      }

      video.srcObject = null;
    }

    var imageSrc;
    function takescreenshot() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      imageSrc = canvas.toDataURL("image/webp");
     
      stop();
    };




    ////////////////////////	





    var db = openDatabase("itemDB", "1.0", "itemDB", 65535);
    $(function () {


      //loadData();


      $("#create").click(function () {
        db.transaction(function (transaction) {
          var sql = "create TABLE items " +
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "name VARCHAR(100) NOT NULL," +
            "quantity INT(5) NOT NULL," +
            "picture VARCHAR(500) )";
          transaction.executeSql(sql, undefined, function () {


            alert("Table is created successfully");
          }, function () {
            alert("Table is already being created");
          })
        });
      });
      // to remove

      $("#remove").click(function () {

        if (!confirm("Are you sure to delete this table?", "")) return;;
        db.transaction(function (transaction) {
          var sql = "DROP TABLE items";
          transaction.executeSql(sql, undefined, function () {
            alert("Table is deleted successfully")
          }, function (transaction, err) {
            alert(err.message);
          })
        });
      });




      //get photo link


      var reader;
      document.querySelector("#myFileInput").addEventListener("change", function () {

        reader = new FileReader();

        reader.addEventListener("load", () => {





          localStorage.setItem("recent pic", reader.result);
        })
        console.log(this);
        reader.readAsDataURL(this.files[0]);





      });








      //to insert

      $("#list").click(function () {
        loadData();
      })

      $("#insert").click(function () {
        var item = $("#item").val();
        var qty = $("#quantity").val();
        var pic = imageSrc;

        db.transaction(function (transaction) {
          var sql = "INSERT INTO items(name,quantity,picture) VALUES(?,?,?)";
          transaction.executeSql(sql, [item, qty, pic], function () {

           
            alert("New item is added successfully");
          }, function (transaction, err) {
            alert(err.message);
          })
        })




        db.transaction(function (transaction) {
          var sql = "SELECT max(id) as id FROM items ";
          transaction.executeSql(sql, undefined, function (transaction, result) {
            if (result.rows.length) {

              for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);

                var id = row.id;
                console.log(id);
















              }
            }


          }, function (transaction, err) {
            alert('No table found. Click on "Create Table" to create table now');
          })
        })





      })


      // fetch

      $("#list").click(function () {
        loadData();
      })

      function loadData() {
        $("#itemlist").children().remove();
        db.transaction(function (transaction) {
          var sql = "SELECT * FROM items ORDER BY id ";
          transaction.executeSql(sql, undefined, function (transaction, result) {
            if (result.rows.length) {

              for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
                var item = row.name;
                var id = row.id;
                console.log(row);
                var quantity = row.quantity;
                $("#itemlist").append('<tr><td>' + id + '</td><td>' + item + '</td><td>' + quantity + '</td></tr>');
              }
            } else {
              $("#itemlist").append('<tr><td colspan="3" align="center">No Item Found</td></tr>');
            }


          }, function (transaction, err) {
            alert('No table found. Click on "Create Table" to create table now');
          })
        })
      }

    })