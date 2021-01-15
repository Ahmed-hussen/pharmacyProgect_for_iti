
var db=openDatabase("PharmacyDB","1.0","itemDB",65535);
db.transaction(function(transaction){
	var sql=" CREATE TABLE Users (userid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,username VARCHAR(50) NOT NULL,pass VARCHAR(50) NOT NULL,Role VARCHAR(50) NOT NULL);"





	transaction.executeSql(sql,undefined,function(){
		alert("Table is created successfully");


var sql="INSERT INTO users(username,pass,Role) VALUES(?,?,?)";

transaction.executeSql(sql,["admin","admin","admin"],function(){


	alert("New item is added successfully");
    }
    )
   })})







   var Role;
   //$("#submit").click(function(){
   document.getElementById("submit").onclick = function() {
  // $("#submit").click(function(){

	var UserName = document.getElementById("UserName").value;
	var Pass = document.getElementById("password").value;




   db.transaction(function(transaction){
	var sql="SELECT Role  FROM users where username=? and pass=? ";

	console.log("1");
	transaction.executeSql(sql,[UserName,Pass],function(transaction,result){
if(result.rows.length){

for(var i=0;i<result.rows.length;i++){
var row=result.rows.item(i);
//var item=row.item;
Role=row.Role;
console.log(Role);




}


}




})

document.querySelector('.img-btn').addEventListener('click', function()
	{


        if(Role=="admin") {

		document.querySelector('.cont').classList.toggle('s-signup')
		}
		else if(Role=="user") {

		   window.location.href="index.html";



		}
		else if(Role!="user"){
			alert("you are not pharmacy ");
		}
	}
);










		}

	,function(transaction,err){
	alert('No table found. Click on "Create Table" to create table now');
		}
		)

	}

  // }
/*

	$("#submit").click(function(){

		var UserName = document.getElementById("UserName").value;
		var Pass = document.getElementById("password").value;




		db.transaction(function(transaction){
			var sql="SELECT Role  FROM users ";
			transaction.executeSql(sql,undefined,function(transaction,result){
		if(result.rows.length){

		for(var i=0;i<result.rows.length;i++){
		var row=result.rows.item(i);
		//var item=row.item;
		var rolAdmin=row.Role;
		console.log(rolAdmin);

		}
		}




document.querySelector('.img-btn').addEventListener('click', function()
{

	if(rolAdmin=="admin") {

	document.querySelector('.cont').classList.toggle('s-signup')
	};
}
);





},function(transaction,err){
	alert('No table found. Click on "Create Table" to create table now');
})
})

})*/





document.getElementById("add").onclick = function() {
	alert("add");
	var name=document.getElementById("newUserName").value;
	var pass=document.getElementById("newUserPass").value;
	var pass2=document.getElementById("conNewUserPass").value;

	//alert(reader.result);
	db.transaction(function(transaction){
	var sql="INSERT INTO Users(username,pass,Role) VALUES(?,?,?)";
	transaction.executeSql(sql,[name,pass,"user"],function(){


		alert("New user is added successfully");
	},function(transaction,err){
		alert(err.message);
	})
	})
}