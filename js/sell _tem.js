

    loadMEDNAME();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;


    var db = openDatabase("itemDB", "1.0", "itemDB", 65535);
    $(function () {





      db.transaction(function (transaction) {
        var sql = "create TABLE invoices" +
          "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
          "SupName VARCHAR(100) NOT NULL," +
          "quantity INT(5) NOT NULL," +
        "productName VARCHAR(100) NOT NULL,"+
          "Date Date NOT NULL,"+
          "type VARCHAR(20) )";
        transaction.executeSql(sql, undefined, function () {


          alert("Table is created successfully");
        }, function () {
          alert("Table is already being created");
        })
      });

    })


    //fetch medicen




    function loadMEDNAME() {
  
      $("#ProductName").children().remove();
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
              $("#ProductName").append('<option class=" btn-lg">' + item + '</option>');
            }
          } else {
            $("#ProductName").append('<tr><td colspan="3" align="center">No Item Found</td></tr>');
          }


        }, function (transaction, err) {
          alert('No table found. Click on "Create Table" to create table now');
        })
      })
    }



    /////////////////////INSERT INTO INVOICE//////////////
    var Quantity;
    var ProductName;
    var oldQuantity
    $("#sell").click(function () {
      var SupplierName = $("#SupplierName").val();
       Quantity = $("#Quantity").val();
       ProductName = $("#ProductName").val();
      var Date = $("#Date").val();
    



      db.transaction(function (transaction) {

        var sql = "INSERT INTO invoices(SupName,quantity,productName,Date,type) VALUES(?,?,?,?,?)";
        transaction.executeSql(sql, [SupplierName,Quantity, ProductName , today,"sell"], function () {

        //  alert(pic);
          alert("New item is added to ivoices successfully");
          UpdateQuantitySell();
        }, function (transaction, err) {
          alert(err.message);
        })
      });









    })

    function UpdateQuantitySell() {

        GetOldQuantitySell();
        db.transaction(function (transaction) {

            var sql2 = "update items set quantity=? where name=? ";
           var newQuantity=parseInt(oldQuantity)-parseInt(Quantity);

            transaction.executeSql(sql2, [newQuantity, ProductName ], function () {

            //  alert(pic);
              alert("update items Quantity successfully");
            }, function (transaction, err) {
              alert(err.message);
            })
          })


    };





  function GetOldQuantitySell() {
  
  



    db.transaction(function (transaction) {
        var sql3 = "SELECT quantity FROM items where name=?  ";
        alert("product name in get old"+ProductName);
        transaction.executeSql(sql3, [ProductName], function (transaction, result) {
          if (result.rows.length) {

            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);

               oldQuantity = row.quantity;

            }
        }
    })
  })

  }





