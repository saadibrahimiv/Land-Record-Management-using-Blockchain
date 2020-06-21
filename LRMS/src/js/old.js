App = {
  web3Provider: null,
  contracts: {},

  init: function() {
  	if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
    console.log("metamask");
  } else {
    // If no injected web3 instance is detected, fall back to Ganache
    App.web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/1c98372f92d046409617e755ca9106d6');
  //  Web3j web3 = Web3j.build(new HttpService("https://rinkeby.infura.io/<your-token>"));
  	//App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  	 console.log('no metamask'); 
  }
  	

  web3 = new Web3(App.web3Provider);
  App.web3Object = new Web3(web3.currentProvider);
      console.log("1. web3Object.version = ", App.web3Object.version.api);
  //web3.eth.defaultAccount = web3.eth.accounts[0];

    return App.initContract();
  },





  initContract: function() {

    var abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "propId",
				"type": "uint256"
			}
		],
		"name": "Ownership_changed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum asset.Status",
				"name": "",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "propId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cnic",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "size",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "property_created",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "add",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "CNIC",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Phone",
				"type": "uint256"
			}
		],
		"name": "user",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_newAdmin",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addNewAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_newSuperAdmin",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addNewSuperAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_CNIC",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Phone",
				"type": "uint256"
			}
		],
		"name": "addNewUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			}
		],
		"name": "approveChangeOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			}
		],
		"name": "approveProperty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_newUser",
				"type": "address"
			}
		],
		"name": "approveUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newValue",
				"type": "uint256"
			}
		],
		"name": "changeValue",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_currOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_size",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_regDate",
				"type": "uint256"
			}
		],
		"name": "createProperty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creatorAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			}
		],
		"name": "getPropertyDetails",
		"outputs": [
			{
				"internalType": "enum asset.Status",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAdd",
				"type": "address"
			}
		],
		"name": "getUserDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "propOwnerChange",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "CNIC",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Phone",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "properties",
		"outputs": [
			{
				"internalType": "enum asset.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "currOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "CNIC",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "size",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "regDate",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propId",
				"type": "uint256"
			}
		],
		"name": "rejectProperty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userslist",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "CNIC",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Phone",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "verifiedUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

App.contracts.asset =new  web3.eth.Contract(abi,'0xf9181F5d0dFD3277d6fb2f3DB87540607D6f8911');

    return App.bindEvents();

  },


bindEvents: function() {
    $(document).on('click', '#btn-PropAdd', App.createProperty);
    $(document).on('click', '#btn-PropApprove', App.approveProperty);
    $(document).on('click', '#btn-PropReject', App.rejectProperty);
    $(document).on('click', '#btn-PropReqChange', App.reqchangeOwnership);
    $(document).on('click', '#btn-PropAcptChange', App.approveChangeOwnership);
    $(document).on('click', '#btn-PropValChange', App.changeValue);
    $(document).on('click', '#btn-PropSearch', App.getPropertyDetails);
    $(document).on('click', '#btn-PropAddUser', App.adduser);
    $(document).on('click', '#btn-PropApproveUser', App.approveUsers);        
    $(document).on('click', '#btn-UserSearch', App.getUserDetails);
    // Details for ownership change request 
    $(document).on('click', '#btn-ChangeDetail', function(event){
    	var PropId = $('#PropSearchform #PropSearch').val();
    	$("#historyTable").hide(); $("#search1").hide();

    	   App.contracts.asset.getPastEvents("Ownership_changed_requested",{filter: {PropId : PropId }, fromBlock: 0 , toBlock:"latest" },
              (function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result);
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        }));

    });
    // View All
    $(document).on('click', '#btn-PropSearchAll', function(event){
    	//get past events 
    	//$("#PropTable").innerHTML = "";
    	//$("tbody#PropTable tr").remove();
    	$("#historyTable").hide();
    	$("#search1").hide();
    	$("#PropReqChangeform").hide();
    	$("#PropValChangeform").hide();
    	$("#btn-PropReqChange").hide();
    	$("#btn-PropValChange").hide();
    	$("#fieldset").hide(); 
    	$('#search').keyup(function(){  
                search_table($(this).val());  
           });  
           function search_table(value){  
                $('#PropTable tr').each(function(){  
                     var found = 'false';  
                     $(this).each(function(){  
                          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)  
                          {  
                               found = 'true';  
                          }  
                     });  
                     if(found == 'true')  
                     {  
                          $(this).show();  
                     }  
                     else  
                     {  
                          $(this).hide();  
                     }  
                });  
           };

    	var Table = document.getElementById("PropTable");
		Table.innerHTML = "";
		var row = `<tr>
													<th>#</th>
													<th>Property ID</th>
													<th>Reg. Date</th>
													<th>Status</th>
													<th>Owner Name</th>
													<th>Owner Address</th>
													<th>CNIC</th>
													<th>Area</th>
													<th>Value</th>
													<th></th>
								  			  	  </tr>`
								  			  	 
												Table.innerHTML += row;
    	$("#PropTable").show();
    	$("#search").show();


    	App.contracts.asset.getPastEvents("property_created",
    									{fromBlock:0, toBlock:"latest"},
    									function(error,result){
    										if (!error) 
    										{
    											$("#loader").hide();
    										//	document.getElementById("PropTable").deleteRow(1);
    											console.log(result);
							                    for(var i = 0; i < result.length ; i++){
							                    var state = result[i].returnValues[0]; 
							                     if (state == 1)
		                                          {
		                                          	var status = "Pending";
		                                          $('#resultPropStatus').text('Pending');
		                                          }
		                                          else if(state == 2){
		                                          	var status = "Approved";
		                                          $('#resultPropStatus').text('Approved');
		                                          }
		                                          else if(state == 3){
		                                          	var status = "Rejected";
		                                          $('#resultPropStatus').text('Rejected');
		                                          };
		                                          console.log(status);
							                    var id = (result[i].returnValues[1]);
							                    var name = result[i].returnValues[2];
							                  	var owner = result[i].returnValues[3];
							                   	var cnic = result[i].returnValues[4];
							                   	var size = result[i].returnValues[5];
							                   	var value = result[i].returnValues[6];
							                   	var date = result[i].returnValues[7];
               									var table = document.getElementById('PropTable');
												var row = `<tr>
													<td>${i+1}</td>
													<td>${id}</td>
													<td>${date}</td>
													<td id="resultPropStatus">${status}</td>
													<td>${name}</td>
													<td>${owner}</td>
													<td>${cnic}</td>
													<td>${size}</td>
													<td>${value}</td>
													<td></td>
								  			  	  </tr>`
								  			  	 
												table.innerHTML += row
                                           
							                   	};
							                   	
    										}
    									}); });
    // History of records									   
    $(document).on('click', '#btn-PropHistory', function (event) {
    	$("#PropReqChangeform").hide(); $("#PropValChangeform").hide(); $("#btn-PropReqChange").hide();
    	$("#btn-PropValChange").hide(); $("#fieldset").hide();
    	$('#search1').keyup(function(){  
                search_table($(this).val());  
           });  
           function search_table(value){  
                $('#historyTable tr').each(function(){  
                     var found = 'false';  
                     $(this).each(function(){  
                          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)  
                          {  
                               found = 'true';  
                          }  
                     });  
                     if(found == 'true')  
                     {  
                          $(this).show();  
                     }  
                     else  
                     {  
                          $(this).hide();  
                     }  
                });  
           };
     	var PropId = $('#PropSearchform #PropSearch').val();
     	console.log(PropId);
    	function timeConverter(unixTime){
    		var unixTime = new Date(unixTime*1000);
    		var time =	unixTime.toUTCString();
    		return time;
			};
		function convertUTCDateToLocalDate(date) {
    		var date = new Date(date);  
    		newDate = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();  
    		return newDate;   
			};
		var id;
		var from = [];
		var to = [];
		var fromName = [];
		var fromCnic = [];
		var toName = [];
		var toCnic = [];
		var block = [];
		var timestamp = [];
		var history = []; 
		var Table = document.getElementById("historyTable");
		Table.innerHTML = "";
		var row = `<tr>
                  <th scope="col" data-column="index" data-order="desc">#</th>
                  <th scope="col" data-column="id" data-order="desc">Property ID</th>
                  <th scope="col" data-column="from" data-order="desc">From</th>
                  <th scope="col" data-column="from" data-order="desc">Name</th>
                  <th scope="col" data-column="from" data-order="desc">CNIC</th>
                  <th scope="col" data-column="to" data-order="desc">To</th>
                  <th scope="col" data-column="from" data-order="desc">Name</th>
                  <th scope="col" data-column="from" data-order="desc">CNIC</th>
                  <th scope="col" data-column="time" data-order="desc">Date</th>
               </tr>`
               Table.innerHTML += row;

		//get past event  	
 		App.contracts.asset.getPastEvents("Ownership_changed",
				{ filter : {propId : PropId},
					fromBlock: 0, toBlock: 'latest' },
				
				function(error, result){
            		if (!error)
                {	$("#search1").show();
          	    	$("#historyTable").show();
                    $("#loader").hide();
                    console.log(result);
                    for(var i = 0; i < result.length ; i++){
                    from.push(result[i].returnValues.from);
                  	to.push(result[i].returnValues.to);
                   	id = result[i].returnValues.propId;
                   	fromName.push(result[i].returnValues.fromName);
                   	fromCnic.push(result[i].returnValues.fromCnic);
                   	toName.push(result[i].returnValues.toName);
                   	toCnic.push(result[i].returnValues.toCnic);

                   	block.push(web3.eth.getBlock(result[i].blockNumber));
                   	web3.eth.getBlock((result[i].blockNumber),function(error,time){
                   		if(!error){
                   		console.log(time.timestamp);}
                   		else {console.log(error);}
                   	});
                	}
              		block.forEach( function(element, index) {
               						element.then(res=>{
               							var utc = timeConverter(res.timestamp);
              							console.log(id+" "+from[index]+" "+to[index]+" "+convertUTCDateToLocalDate(utc));
               							var table = document.getElementById('historyTable');
										var row = `<tr>
													<td>${index}</td>
													<td>${id}</td>
													<td>${from[index]}</td>
													<td>${fromName[index]}</td>
													<td>${fromCnic[index]}</td>
													<td>${to[index]}</td>
													<td>${toName[index]}</td>
													<td>${toCnic[index]}</td>
										  			<td>${convertUTCDateToLocalDate(utc)}</td>
								  			  	  </tr>`
										table.innerHTML += row
               						}).catch(error=>{
               							console.log(error);
               						})
              		});
               } 
                	else 
                {
                    $("#loader").hide();
                    console.log(error);
                }
        		}) ;
    } );
    },


  createProperty: function(event) {
    event.preventDefault();
    var PropId = $('#PropAdd #PropId').val();
    var PropOwner = $('#PropAdd #PropOwner').val();
    var PropSize = $('#PropAdd #PropSize').val();    
    var PropVal = $('#PropAdd #PropVal').val();
    var date =$("#propDate").data("datepicker").getDate();
    PropReg  = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();  
    console.log(PropReg);
    console.log(date);               
    var from = web3.eth.accounts["currentProvider"].selectedAddress;
    web3.eth.getAccounts(function(error, accounts) {
									      if (error) {
										console.log(error);
									      }
      App.contracts.asset.methods.createProperty(PropId, PropOwner, PropSize, PropVal, PropReg).send(
      	{from: from, 
      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}, 
      	function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
      });
    });

  },

  approveProperty: function(event) {
    event.preventDefault();
     var PropId = $('#PropSearchform #PropSearch').val();

    var from = web3.eth.accounts["currentProvider"].selectedAddress;

    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.approveProperty(PropId).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}, 
                        	function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });});

  },
  rejectProperty: function(event) {
    event.preventDefault();
    var PropId = $('#PropSearchform #PropSearch').val();
        var from = web3.eth.accounts["currentProvider"].selectedAddress;

    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.rejectProperty(PropId).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}, 
                        	function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });});

  },
  reqchangeOwnership: function(event) {
    event.preventDefault();
    $("#historyTable").hide();
    $("#search1").hide();
    var from = web3.eth.accounts["currentProvider"].selectedAddress;
    console.log(JSON.stringify(from));
    var PropId = $('#PropSearchform #PropSearch').val();
    var NewOwner = $('#PropReqChangeform #PropReqChange').val();
    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.changeOwnership(PropId, NewOwner).send({from: from,gas: 1000000,gasPrice: web3.utils.toWei("20", 'gwei')},
                        	function(error,result){
                        	if (!error) {
                        		console.log(result)}
                        	else {
                        		console.log(error);
                        	}
                        });
                    });

  },
  approveChangeOwnership: function(event) {
    event.preventDefault();
    var to = $("#PropReqChangeform #PropReqChange").val();
    console.log(to);
    var PropId = $('#PropSearchform #PropSearch').val();
        var from = web3.eth.accounts["currentProvider"].selectedAddress;

        web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.approveChangeOwnership(PropId).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });});

  

//event 
	
	$("#loader").show()


},               

    
  

  changeValue: function(event) {
    event.preventDefault();
    $("#historyTable").hide();
    $("#search1").hide();
    var PropId = $('#PropSearchform #PropSearch').val();
    var NewVal = $('#PropValChangeform #PropValChange').val();
            var from = web3.eth.accounts["currentProvider"].selectedAddress;

    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.changeValue(PropId, NewVal).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}, 
                        	function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });});

  },
  getPropertyDetails: function() {
  	$("#search").hide();
  	$("#historyTable").hide();
  	$("#search1").hide();
  	var Table = document.getElementById("PropTable");
		Table.innerHTML = "";
		var row = `<br><tr>
													<th>Property ID</th>
													<th>Reg. Date</th>
													<th>Status</th>
													<th>Owner Name</th>
													<th>Owner Address</th>
													<th>CNIC</th>
													<th>Area</th>
													<th>Value</th>
													<th>Latest Transfer</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
								  			  	  </tr>
								  			  	  <tr>
						                           <td id="resultPropID"></td>
						                           <td id="resultPropReg"></td>
						                           <td id="resultPropStatus"></td>
						                           <td id="resultOwnerName"></td>
						                           <td id="resultPropOwner"></td>
						                           <td id="resultOwnerCnic"></td>
						                           <td id="resultPropSize"></td>
						                           <td id="resultPropValue"></td>
						                           <td id="resultTransfer"></td>
						                           <td></td>
						                           <td></td>
						                           <td></td>
						                           <td id="resultPropFunc1"></td>
						                           <td id="resultPropFunc2"></td>
						                           <td id="resultPropFunc3"></td>
						                        </tr>`
												Table.innerHTML += row;
    var PropId = $('#PropSearchform #PropSearch').val();
    $("#PropTable").show();
    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);}
                            App.contracts.asset.methods.getPropertyDetails(PropId).call(
                                            	{gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}, function(error, result){
                                              if(!error)
                                          {        console.log(JSON.stringify(result));
                                          	function timeConverter(unixTime){
								    		var unixTime = new Date(unixTime*1000);
								    		var time =	unixTime.toUTCString();
								    		return time;
											};
											function convertUTCDateToLocalDate(date) {
									    		var date = new Date(date);  
									    		newDate = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();  
									    		return newDate;   
												};
                                          	App.contracts.asset.getPastEvents("Ownership_changed",
											{   filter: { propId: PropId}, 
												fromBlock: 0, toBlock: 'latest' },
											function(error, result){
							            		if (!error)
							                {	len = result.length;

							                    console.log(result);
							                    if (result.length == 0){
							                    	$("#resultTransfer").text("NaN");}
							                    else{
							                    	console.log(result[len-1].blockNumber);
							                     web3.eth.getBlock(result[len-1].blockNumber,function(error,res){
							                    	if(!error){
							                    		console.log(res);
							                    		time = res.timestamp;
							                    console.log(time);
							                    var utc = timeConverter(res.timestamp);
							              		console.log(convertUTCDateToLocalDate(utc));
							              		$("#resultTransfer").text(convertUTCDateToLocalDate(utc)); }; }); };

							                 };
              								});

              								var state = result[0];
                                                  var add = result[2];
                                                  var value = result[5];
                                                  var name = result[1];
                                                  var cnic = result[3];
                                                  var area = result[4];
                                                  var date = result[6];
                                                  $('#resultOwnerName').text(name);
                                                  $("#resultPropValue").text(value);
                                                  $("#resultPropOwner").text(add);
                                          		$('#resultPropID').text(PropId);
                                          		$('#resultOwnerCnic').text(cnic);
                                          		$('#resultPropSize').text(area);
                                          		$('#resultPropReg').text(date);                                          	

                                          if(state == 0)
                                          {$('#resultPropStatus').text('NotExist');
                                          $('#resultPropFunc1 #btn-PropApprove').attr('disabled', true);
                                          $('#resultPropFunc2 #btn-PropReject').attr('disabled', true);
                                          $('#resultPropFunc3 #btn-PropHistory').attr('disabled', true);
                                          $('.sec1').html(''); 
                                          $('.sec2').html('');
                                          $('.sec3').html('');}
                                          else if (state == 1)
                                          {
                                          $('#resultPropStatus').text('Pending');
                                          $('#resultPropFunc1').html('<a href="#" id="btn-PropApprove" class="btn btn-primary">Approve</a>');
                                          $('#resultPropFunc2').html('<a href="#" id="btn-PropReject" class="btn btn-primary">Reject</a>');
                                          $('#resultPropFunc3 #btn-PropHistory').attr("disabled", true);
                                          $('.sec1').html('');
                                          $('.sec2').html('');
                                          $('.sec3').html('');}
                                          else if(state == 2){
                                          $('#resultPropStatus').text('Approved');
                                          $('#resultPropFunc1 #btn-PropApprove').attr("disabled", true);
                                          $('#resultPropFunc2 #btn-PropReject').attr('disabled', true);
                                          $('#resultPropFunc3').html('<a href="#" id="btn-PropHistory" class="btn btn-primary">History</a>');
                                          $('.sec1').html('');
                                          $('.sec2').html('');
                                          $('.sec3').html('');

                                          App.contracts.asset.methods.propOwnerChange(PropId).call(function(error, result){
                                            if(!error)
                                            {
                                                if(result[1] == "0x0000000000000000000000000000000000000000")
                                                {
 $('.sec1').html('<fieldset><legend>Change Ownership</legend><form action="#" id ="PropReqChangeform"><div class="form-group"><input type="text" class="form-control" id="PropReqChange" name="PropReqChange" placeholder="Enter New Owner Address"></div></form></fieldset><button type="submit"  class="btn btn-primary" id="btn-PropReqChange"  form="form1" value="Submit">Request</button><br>');
 $('.sec3').html('<fieldset><legend>Change Value/Price</legend><form action="#" id="PropValChangeform"><div class="form-group"><input type="text" class="form-control" id="PropValChange" name="PropValChange" placeholder="Enter New Value/Price"></div></form></fieldset><button type="submit"  class="btn btn-primary" id="btn-PropValChange"  form="form1" value="Submit">Change</button>');

                                                }
                                                else if(result[1] != "0x0000000000000000000000000000000000000000")
                                                {
 $('.sec2').html('<label>Change of Ownership Requested </label><button type="submit"  class="btn btn-primary" id="btn-ChangeDetail" value="Submit">Details</button<br><button type="submit"  class="btn btn-primary" id="btn-PropAcptChange" value="Submit">Accept</button>');
                                                }
                                            }
                                            else
                                                console.error(error);   });
									       }
                                          else if(state == 3){
                                          $('#resultPropStatus').text('Rejected');
                                          $('#resultPropFunc1 #btn-PropApprove').attr('disabled', true);
                                          $('#resultPropFunc2 #btn-PropReject').attr('disabled', true);
                                          $('.sec1').html('');
                                          $('.sec2').html('');
                                          $('.sec3').html('');}
                                                  
                                        }
                                              else
                                                  console.error(error);
                                            });  });
  },


getUserDetails: function() {
  //  event.preventDefault();
    var UserAdd = $('#UserSearchform #UserSearch').val();
    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }


                                            App.contracts.asset.methods.getUserDetails(UserAdd).call(
                                            	function(error, result){
                                              if(!error)
                                          {        console.log(JSON.stringify(result));

                                                  var cnic = result[1];
                                                  $('#resultUserCnic').text(cnic);
                                                  var name = result[0];
                                                  $('#resultUserName').text(name);
                                                  var phone = result[2];
                                                  $('#resultUserPhone').text(phone);

                                          $('#resultUserAdd').text(UserAdd);
                                      }


                                          
                                              else
                                                  console.error(error);
                                            });  });
  },


  adduser: function(event) {
  	 event.preventDefault();
    var useraddress = $('#adduser #PropAddUser').val();
    var username = $('#adduser #UserName').val();
    var cnic = $('#adduser #UserCnic').val();
    var userphone = $('#adduser #UserPhone').val();
            var from = web3.eth.accounts["currentProvider"].selectedAddress;

            web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log("errorrrrrr");
                        }
                        if($('#adduser #PropAddUserrole').val() == "User")
                        {App.contracts.asset.methods.addNewUser(username, useraddress, cnic, userphone).send({from: from, gas: 1000000, 
                        	gasPrice: web3.utils.toWei("20", 'gwei')}, 
                        	function(error, result){
                          if(!error)
                              console.log(result);
                          else
                              console.error(error+"rrrrs");
                        });
                        }
                        else if ($('#adduser #PropAddUserrole').val() == "Admin")
                        {App.contracts.asset.methods.addNewAdmin(useraddress, username).send({from: from, gas: 1000000, gasPrice: web3.toWei(20, 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result)); 
                          else
                              console.error(error);
                        });
                        }
                        else if ($('#adduser #PropAddUserrole').val() == "SuperAdmin")
                        {App.contracts.asset.methods.addNewSuperAdmin(useraddress, username).send({from: from, gas: 1000000, gasPrice: web3.toWei(20, 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });
                        }


                      }); 



// event 
    $("#loader").show()
    var added = App.contracts.asset.events.user({},{fromBlock:0 , toBlock:'latest'},
              (function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result);
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        }));
	
       
   },

   
  approveUsers: function(event) {
    event.preventDefault();
    var useraddress = $('#adduser #PropAddUser').val();
    var from = web3.eth.accounts["currentProvider"].selectedAddress;


    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.approveUsers(useraddress).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });});

  }





};






$(function() {
  $(window).load(function() {
  	$("#historyTable").hide();
  	$("#PropTable").hide();
  //	$('#btn-PropSearchAll').attr("disabled", true);
  	$("#search1").hide();
  	
           

    App.init();
  });
});





 