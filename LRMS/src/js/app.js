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
				"internalType": "uint256",
				"name": "from",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fromName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "to",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "toName",
				"type": "string"
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
				"indexed": true,
				"internalType": "uint256",
				"name": "propId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "to",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "Ownership_changed_requested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum asset.userStatus",
				"name": "",
				"type": "uint8"
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
				"name": "add",
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
				"name": "Phone",
				"type": "uint256"
			}
		],
		"name": "adminAdded",
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
				"internalType": "string",
				"name": "date",
				"type": "string"
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
				"internalType": "enum asset.userStatus",
				"name": "",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
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
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_newAdmin",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_CNIC",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Phone",
				"type": "uint256"
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
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_newSuperAdmin",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_CNIC",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Phone",
				"type": "uint256"
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
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
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
		"name": "adminslist",
		"outputs": [
			{
				"internalType": "enum asset.userStatus",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "approveAdmins",
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
				"internalType": "uint256",
				"name": "_CNIC",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_NewCnic",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_cnic",
				"type": "uint256"
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
				"internalType": "string",
				"name": "_regDate",
				"type": "string"
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
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "getAdminDetails",
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
			},
			{
				"internalType": "enum asset.userStatus",
				"name": "",
				"type": "uint8"
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
				"internalType": "string",
				"name": "",
				"type": "string"
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
				"name": "_cnic",
				"type": "uint256"
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
				"internalType": "enum asset.userStatus",
				"name": "",
				"type": "uint8"
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
				"internalType": "enum asset.userStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
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
				"internalType": "string",
				"name": "regDate",
				"type": "string"
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
		"name": "rejectChangeOwnership",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userslist",
		"outputs": [
			{
				"internalType": "enum asset.userStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
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
		"name": "verifiedAdmins",
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

App.contracts.asset =new  web3.eth.Contract(abi,'0x2284fB406791232CbF0DD1F2b923e0056EC2Db55');

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
    $(document).on('click', '#btn-PropRejectChange', App.rejectChange);


    $(document).on('click', '#btn-PropApproveUser', App.approveUsers);
    $(document).on('click', '#btn-PropApproveAdmin', App.approveAdmins);
    $(document).on('click', '#btn-AdminSearch', App.getAdminDetails);


    //admin details
    $(document).on('click', '#adminDetail', App.adminDetailsForm);
    $(document).on('click', '#btn-UserSearch', App.getUserDetails);

    // view all users 
    $(document).on('click', '#btn-Userall', App.allUser);
    $(document).on('click', '#btn-allAdmin', App.allAdmin);

    // user details 
    $(document).on('click', '#userDetail', App.userDetailTable);

    //add user form
    $(document).on('click', '#addUser', App.addUserForm);
    //add admin form 
    $(document).on('click', '#addAdmin', App.addAdminForm);
    // View All
    $(document).on('click', '#btn-PropSearchAll', App.viewAllProp);

    // History of records									   
    $(document).on('click', '#btn-PropHistory', App.history );

     $(document).on('click', '#btn-ChangeDetail', App.OwnershipRequestDetail );
    },




    OwnershipRequestDetail: function(event){
    	var PropId = $('#PropSearchform #PropSearch').val();
    	$("#historyTable").hide(); $("#search1").hide();

    	   App.contracts.asset.getPastEvents("Ownership_changed_requested",{filter: {PropId : PropId }, fromBlock: 0 , toBlock:"latest" },
              (function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result);
                    len = result.length;
                    alert("Change of ownership has been requested for property " + result[len-1].returnValues[0] + " to new owner " + result[len-1].returnValues[2]+ " with cnic " + result[len-1].returnValues[1]);
                    $("#sec4").innerHTML="Change of ownership has been requested for property " + result[len-1].returnValues[0] + " to new owner " + result[len-1].returnValues[2]+ " with cnic " + result[len-1].returnValues[1]; 
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        }));

    },

    userDetailTable: function(event){
    	setTimeout(()=>{
           document.getElementById("btn-Userall").click();
         },100);
    	var form = document.getElementById("UserSearchform");
    	form.innerHTML = " ";
    	$("#UserSearchform").show();
    	var row = ` <div class="form-group">
                     <input style="margin-top: 24px; width: 50%;" type="text" class="form-control" id="UserSearch" name="UserSearch" placeholder="Enter User CNIC">
                  </div>
                  <button type="submit"  class="btn btn-primary" id="btn-UserSearch"  form="form1" value="Submit">Search User</button>
                  <button type="submit"  class="btn btn-primary" id="btn-Userall"  form="form1" value="Submit">View All</button>
                  <input style="margin-top: 15px;width: 300px" type="text" name="search" id="search2" class="form-control" placeholder="Search by Cnic"/> 
                   `
                  form.innerHTML += row;
        var table = document.getElementById("usertable");
        table.innerHTML= "";
        var row1 = `
        			<thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Name</th>
                     <th scope="col">Status</th>
                     <th scope="col">Cnic</th>
                     <th scope="col">Phone</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th scope="row">1</th>
                     <td id="resultUserName"></td>
                     <td id="resultUserName"></td>
                     <td id="resultUserCnic"></td>
                     <td id="resultUserPhone"></td>
                  </tr>
               </tbody>
        `
        		table.innerHTML += row1;

    },

    addUserForm: function(event){
    	var form = document.getElementById("adduser");
		form.innerHTML = "";
    	$("#adduser").show();
    	var form = document.getElementById("adduser");
    	var row = ` <div><label>User Name</label>
                        <input type="text" class="form-control" id="UserName" name="UserName" placeholder="Enter User Name">
                        </div><br>
                        <div>
                        <label>CNIC</label>
                        <input type="text" class="form-control" id="UserCnic" name="UserCnic" placeholder="Enter User Cnic">
                        </div><br>
                         <div class="form-group">
			            <label>User Role</label>
			            <select class="form-control" id="PropAddUserrole">
			              <option value="User">User</option>
			            </select>
			          </div>
                        <div>
                        <label>Phone</label>
                        <input type="text" class="form-control" id="UserPhone" name="UserPhone" placeholder="Enter User Phone">
                        </div><br>
                        <div>
                         <img style="display: none; width: 40px" id="loader" src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif"/>
                         </div><br?
                         <div>
                         <button type="submit"  class="btn btn-primary" id="btn-PropAddUser"  form="form1" value="Submit">Add User</button>
                         </div><br>`
                        
        				form.innerHTML += row;
        var approveform = document.getElementById("approve");
        approveform.innerHTML="";
        var row1 = `
        			<div class="form-group">
                        <label>User CNIC</label>
                        <input type="text" class="form-control" id="PropApproveUser" name="PropApproveUser" placeholder="Enter User CNIC">
                     </div><br>
                     <button type="submit"  class="btn btn-primary" id="btn-PropApproveUser"  form="form1" value="Submit">Approve User</button>
        `
        approveform.innerHTML += row1;


    },

    addAdminForm: function(event){
    	var form = document.getElementById("adduser");
		form.innerHTML = "";
		var row = ` <div><label>Admin Name</label>
                        <input type="text" class="form-control" id="UserName" name="UserName" placeholder="Enter Admin Name">
                        </div><br>
                        <div><label>Admin Address</label>
                        <input type="text" class="form-control" id="Useradd" name="Useradd" placeholder="Enter Admin Address">
                        </div><br>
                        <div class="form-group">
			            <label>Authority</label>
			            <select class="form-control" id="PropAddUserrole">
			              <option value="Admin">Admin</option>
			              <option value="SuperAdmin">SuperAdmin</option>
			            </select>
			          </div>
                        <div>
                        <label>CNIC</label>
                        <input type="text" class="form-control" id="UserCnic" name="UserCnic" placeholder="Enter Admin Cnic">
                        </div><br>
                        <div>
                        <label>Phone</label>
                        <input type="text" class="form-control" id="UserPhone" name="UserPhone" placeholder="Enter Admin Phone">
                        </div><br>
                        <div>
                         <img style="display: none; width: 40px" id="loader" src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif"/>
                         </div><br?
                         <div>
                         <button type="submit"  class="btn btn-primary" id="btn-PropAddUser"  value="Submit">Add Admin</button>
                         </div><br>`
                        
        				form.innerHTML += row;

    	
                        
        var approveform = document.getElementById("approve");
        approveform.innerHTML="";
        var row1 = `
        			<div class="form-group">
                        <label>Admin address</label>
                        <input type="text" class="form-control" id="PropApproveUser" name="PropApproveUser" placeholder="Enter Admin Address">
                     </div><br>
                     <button type="submit"  class="btn btn-primary" id="btn-PropApproveAdmin"  form="form1" value="Submit">Approve Admin</button>
        `
        approveform.innerHTML += row1;

    },
    // Details for ownership change request 
   

    viewAllProp: function(event){
    	//get past events 
    	//$("#PropTable").innerHTML = "";
    	//$("tbody#PropTable tr").remove();
    	$("#historyTable").hide();
    	$("#search1").hide();
    	$("#PropReqChangeform").hide();
    	$("#PropValChangeform").hide();
    	$("#btn-PropReqChange").hide();
    	$("#btn-PropValChange").hide();
    	$("#ownershipChange").hide();
    	$("#valueChange").hide();
    	$("#ownershipRequested").hide();
    	$("#btn-ChangeDetail").hide();
    	$("#btn-PropAcptChange").hide();
    	$("#btn-PropRejectChange").hide();

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
													<th>name</th>
													<th>cNIC</th>
													<th>Area</th>
													<th>Value</th>
													<th></th>
								  			  	  </tr>`
								  			  	 
												Table.innerHTML += row;
    	$("#PropTable").show();
    	$("#search").show();
    	var id = []; var name = []; var owner = []; var size = []; var value = []; var date = []; var state = []; var status = [];
    	App.contracts.asset.getPastEvents("property_created",
    									{fromBlock:0, toBlock:"latest"},
    									function(error,result){
    										if (!error) 
    										{
    											$("#loader").hide();
    										//	document.getElementById("PropTable").deleteRow(1);
    											console.log(result);
							                    for(var i = 0; i < result.length ; i++){							                    
							                     id.push(result[i].returnValues[1]);
							                   //  name.push(result[i].returnValues[2]);
							                  //	 owner.push(result[i].returnValues[3]);
							                   	 size.push(result[i].returnValues[4]);
							                   	 value.push(result[i].returnValues[5]);
							                   	 date.push(result[i].returnValues[6]);
							                   	var fromAdd = web3.eth.accounts["currentProvider"].selectedAddress;
							                   	state.push(App.contracts.asset.methods.getPropertyDetails(id[i]).call(
										      	{from: fromAdd, 
										      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}));
										      	console.log(state);

							                   	App.contracts.asset.methods.getPropertyDetails(id[i]).call(
										      	{from: fromAdd, 
										      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}, 
										      	function(error, result1){
										      		if(!error){
										      			console.log(result1);
										      		}
										      		else {
										      			console.log(error);
										      		};

										      	}); 
							                   }

							                   state.forEach( function(element, index) {
			               						element.then(res=>{
			               							var status = res[0];
			               							var name =  res[1];
			               							var cnic = res[2];
			               							if (status==1) {var stat  = "Pending"}
			               							else if (status==2) {var stat = "Approved"}
			               							else {var stat = "Rejected"};
			               							var table = document.getElementById('PropTable');
													var row = `<tr>
													<td>${index+1}</td>
													<td>${id[index]}</td>
													<td>${date[index]}</td>
													<td>${stat}</td>
													<td>${name}</td>
													<td>${cnic}</td>
													<td>${size[index]}</td>
													<td>${value[index]}</td>
													<td></td>
								  			  	  </tr>`
												table.innerHTML += row;
			               						}).catch(error=>{
			               							console.log(error);
			               						})
			              		});

										      	
							                   		
    										}
    									}); },

    history: function (event) {
    	$("#PropReqChangeform").hide(); $("#PropValChangeform").hide(); $("#btn-PropReqChange").hide();
    	$("#btn-PropValChange").hide(); $("#ownershipChange").hide(); $("#ownershipRequested").hide(); $("#valueChange").hide();
    	$("#btn-ChangeDetail").hide();
    	$("#btn-PropAcptChange").hide();
    	$("#btn-PropRejectChange").hide();

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
                  <th scope="col" data-column="to" data-order="desc">To</th>
                  <th scope="col" data-column="from" data-order="desc">Name</th>
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
                   	toName.push(result[i].returnValues.toName);

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
													<td>${index+1}</td>
													<td>${id}</td>
													<td>${from[index]}</td>
													<td>${fromName[index]}</td>
													<td>${to[index]}</td>
													<td>${toName[index]}</td>
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
    },

  	adminDetailsForm: function(event){
  		setTimeout(()=>{
           document.getElementById("btn-allAdmin").click();
         },100);
    	var form = document.getElementById("UserSearchform");
    	form.innerHTML = " ";
    	$("#UserSearchform").show();
    	var row = ` <div class="form-group">
                     <input style="margin-top: 24px; width: 50%;" type="text" class="form-control" id="UserSearch" name="UserSearch" placeholder="Enter Admin Address">
                  </div>
                  <button type="submit"  class="btn btn-primary" id="btn-AdminSearch"  form="form1" value="Submit">Search Admin</button>
                  <button type="submit"  class="btn btn-primary" id="btn-allAdmin"  form="form1" value="Submit">View All</button>
                  <input style="margin-top: 15px;width: 300px" type="text" name="search" id="search3" class="form-control" placeholder="Search by Address"/> 
                   `
                  form.innerHTML += row;
        var table = document.getElementById("usertable");
        table.innerHTML= "";
        var row1 = `
        			<thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Admin Address</th>
                     <th scope="col">Name</th>
                     <th scope="col">Cnic</th>
                     <th scope="col">Phone</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th scope="row">1</th>
                     <td id="resultUserAdd"></td>
                     <td id="resultUserName"></td>
                     <td id="resultUserCnic"></td>
                     <td id="resultUserPhone"></td>
                  </tr>
               </tbody>
        `
        		table.innerHTML += row1;

    },  

    allAdmin: function(event){
    	$('#search3').keyup(function(){  
                search_table($(this).val());  
           });  
           function search_table(value){  
                $('#usertable tr').each(function(){  
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
    	var Table = document.getElementById("usertable");
												Table.innerHTML = "";
												var row1 = `
										        			<thead>
										                  <tr>
										                     <th scope="col">#</th>
										                     <th scope="col">Name</th>
										                     <th scope="col">Address</th>
										                     <th scope="col">Status</th>
										                     <th scope="col">CNIC</th>
										                     <th scope="col">Phone</th>
										                  </tr>
										               </thead>`
												Table.innerHTML += row1;
		 var name = []; var state = []; var cnic = []; var phone = []; var bool = []; var add = [];
    	 App.contracts.asset.getPastEvents("adminAdded",{fromBlock:0 , toBlock:'latest'},
              (function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result);
                    for(var i=0 ; i < result.length; i ++){
                    add.push(result[i].returnValues[2])
                     name.push(result[i].returnValues[1]);
                     cnic.push(result[i].returnValues[3]);
                     phone.push(result[i].returnValues[4]);
                     state.push(result[i].returnValues[0]);
                     	var fromAdd = web3.eth.accounts["currentProvider"].selectedAddress;
                     							bool.push(App.contracts.asset.methods.verifiedAdmins(add[i]).call(
										      	{from: fromAdd, 
										      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}));
										      	console.log(bool);
							                   }

										      	bool.forEach( function(element, index) {
										      		element.then(res=>{
										      			if(res == true){var status = "Approved"}
										      			else{ var status = "Pending" }
														var Table = document.getElementById("usertable");
														var row2 = `
																	<tbody>
													                  <tr>
													                     <th scope="row">${index+1}</th>
													                     <td id="resultUserName">${name[index]}</td>
													                     <td id="resultUserName">${add[index]}</td>
													                     <td>${status}</td>													                     
													                     <td id="resultUserCnic">${cnic[index]}</td>
													                     <td id="resultUserPhone">${phone[index]}</td>
													                  </tr>
													               </tbody>`
														Table.innerHTML += row2;
										      			
										      		}).catch(error=>{
			               							console.log(error);
			               						})
										      		// statements
										      	}); 
				
                } else {
                    $("#loader").hide();
                    console.log(error);
                };
        }));


    },

   

    allUser: function(event){
    	$('#search2').keyup(function(){  
                search_table($(this).val());  
           });  
           function search_table(value){  
                $('#usertable tr').each(function(){  
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

    	var Table = document.getElementById("usertable");
												Table.innerHTML = "";
												var row1 = `
										        			<thead>
										                  <tr>
										                     <th scope="col">#</th>
										                     <th scope="col">Name</th>
										                     <th scope="col">Status</th>
										                     <th scope="col">CNIC</th>
										                     <th scope="col">Phone</th>
										                  </tr>
										               </thead>`
												Table.innerHTML += row1;
		 var name = []; var state = []; var cnic = []; var phone = []; var bool = [];
    	 App.contracts.asset.getPastEvents("user",{fromBlock:0 , toBlock:'latest'},
              (function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result);
                    for(var i=0 ; i < result.length; i ++){
                     name.push(result[i].returnValues[1]);
                     cnic.push(result[i].returnValues[2]);
                     phone.push(result[i].returnValues[3]);
                     state.push(result[i].returnValues[0]);
                     	var fromAdd = web3.eth.accounts["currentProvider"].selectedAddress;
                     							bool.push(App.contracts.asset.methods.verifiedUsers(cnic[i]).call(
										      	{from: fromAdd, 
										      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')}));
										      	console.log(bool);
							                   
							                   }

										      	bool.forEach( function(element, index) {
										      		element.then(res=>{
										      			if(res == true){var status = "Approved"}
										      			else{ var status = "Pending" }
														var Table = document.getElementById("usertable");
														var row2 = `
																	<tbody>
													                  <tr>
													                     <th scope="row">${index+1}</th>
													                     <td id="resultUserName">${name[index]}</td>
													                     <td>${status}</td>													                     
													                     <td id="resultUserCnic">${cnic[index]}</td>
													                     <td id="resultUserPhone">${phone[index]}</td>
													                  </tr>
													               </tbody>

														`
														Table.innerHTML += row2;
										      			
										      		}).catch(error=>{
			               							console.log(error);
			               						})
										      		// statements
										      	}); 
				
                } else {
                    $("#loader").hide();
                    console.log(error);
                };
        }));

    },
    							
    viewAllAdmin: function(event){
    	var Table = document.getElementById("usertable");
												Table.innerHTML = "";
												var row1 = `
										        			<thead>
										                  <tr>
										                     <th scope="col">#</th>
										                     <th scope="col">Admin Adrress</th>
										                     <th scope="col">Name</th>
										                     <th scope="col">CNIC</th>
										                     <th scope="col">Phone</th>
										                  </tr>
										               </thead>`
												Table.innerHTML += row1;
    	 App.contracts.asset.getPastEvents("adminAdded",{fromBlock:0 , toBlock:'latest'},
              (function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result);
                    for(var i=0 ; i < result.length; i ++){
                    	var add = result[i].returnValues[0];
                    var name = result[i].returnValues[1];
                    var cnic = result[i].returnValues[2];
                    var phone = result[i].returnValues[3];
					var Table = document.getElementById("usertable");
					var row2 = `
								<tbody>
				                  <tr>
				                     <th scope="row">${i+1}</th>
				                     <td id="resultUserAdd">${add}</td>
				                     <td id="resultUserName">${name}</td>
				                     <td id="resultUserCnic">${cnic}</td>
				                     <td id="resultUserPhone">${phone}</td>
				                  </tr>
				               </tbody>

					`
					Table.innerHTML += row2;
				}
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        }));




    },

  createProperty: function(event) {
    event.preventDefault();
    var PropId = $('#PropAdd #PropId').val();
	var PropOwner = $('#PropAdd #PropOwner').val();
    var PropSize = $('#PropAdd #PropSize').val();    
    var PropVal = $('#PropAdd #PropVal').val();
    var date =$("#propDate").data("datepicker").getDate();
    PropReg  = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();  
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
	
	$("#loader").show()
},  


rejectChange: function(event){
	event.preventDefault();
    var PropId = $('#PropSearchform #PropSearch').val();
        var from = web3.eth.accounts["currentProvider"].selectedAddress;
        web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.rejectChangeOwnership(PropId).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });});
    	

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
  	$("#sec4").hide();
  	var Table = document.getElementById("PropTable");
		Table.innerHTML = "";
		var row = `<br><tr>
													<th>Property ID</th>
													<th>Reg. Date</th>
													<th>Status</th>
													<th>Owner Name</th>
													<th>Owner CNIC</th>
													<th>Area</th>
													<th>Value</th>
													<th>Latest Transfer</th>
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
						                           <td id="resultPropSize"></td>
						                           <td id="resultPropValue"></td>
						                           <td id="resultTransfer"></td>
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
                                                  var cnic = result[2];
                                                  var value = result[4];
                                                  var name = result[1];
                                                //  var cnic = result[3];
                                                  var area = result[3];
                                                  var date = result[5];
                                                  $('#resultOwnerName').text(name);
                                                  $("#resultPropValue").text(value);
                                                  $("#resultPropOwner").text(cnic);
                                          		$('#resultPropID').text(PropId);
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
                                          $('#resultPropFunc1').html('<a  href="#" id="btn-PropApprove" class="btn btn-primary">Approve</a>');
                                          $('#resultPropFunc2').html('<a style="margin-left:-30px;" href="#" id="btn-PropReject" class="btn btn-primary">Reject</a>');
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
                                            {	console.log(result);
                                                if(result.CNIC == "0")
                                                {
 $('.sec1').html(`<fieldset><legend id="ownershipChange">Change Ownership</legend><form action="#" id ="PropReqChangeform">
 	<div class="form-group"><input type="text" class="form-control" id="PropReqChange" name="PropReqChange" placeholder="Enter New Owner CNIC"></div></form></fieldset>
 	<button type="submit"  class="btn btn-primary" id="btn-PropReqChange"  form="form1" value="Submit">Request</button><br>`);
 $('.sec3').html(`<fieldset><legend id="valueChange">Change Value/Price</legend><form action="#" id="PropValChangeform">
 	<div class="form-group"><input type="text" class="form-control" id="PropValChange" name="PropValChange" placeholder="Enter New Value/Price"></div></form></fieldset>
 	<button type="submit"  class="btn btn-primary" id="btn-PropValChange"  form="form1" value="Submit">Change</button>`);

                                                }
                                                else if(result.CNIC != "0")
                                                {
 $('.sec2').html(`<div style="width:100%;float: left"><legend style="float:left" id=ownershipRequested>Change of Ownership Requested </legend></div>
 	<div style="float:left; width:30%; height:100%;"><button style="width:100%; margin-left:px;" 
 	type="submit"  class="btn btn-primary" id="btn-ChangeDetail" value="Submit">Details</button><br>

 	<button style="margin-top:3px; width:100%" type="submit"  class="btn btn-primary" id="btn-PropAcptChange" value="Submit">Accept</button> <br>
 	<button style="margin-top:3px;width:100%;" type="submit"  class="btn btn-primary" id="btn-PropRejectChange" value="Submit">Reject</button><br></div>
 	
 	
 	 `);
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
  $("#search").hide();
  var Table = document.getElementById("usertable");
	Table.innerHTML = "";
	var row1 = `
        			<thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Name</th>
                     <th scope="col">Status</th>
                     <th scope="col">Cnic</th>
                     <th scope="col">Phone</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th scope="row">1</th>
                     <td id="resultUserName"></td>
                     <td id="resultUserStatus"></td>
                     <td id="resultUserCnic"></td>
                     <td id="resultUserPhone"></td>
                  </tr>
               </tbody>
        `
        		Table.innerHTML += row1;
    var UserAdd = $('#UserSearchform #UserSearch').val();
    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                                            App.contracts.asset.methods.getUserDetails(UserAdd).call(
                                            	function(error, result){
                                              if(!error)
                                          {        console.log(JSON.stringify(result));

                                          		var status = result[3];
                                          		 var cnic = result[1];
                                          		bool = App.contracts.asset.methods.verifiedUsers(cnic).call(
										      	{
										      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')});
										      	console.log(bool);
										      	bool.then(res=>{
										      		console.log(res);
										      		if (res == true && status==1){$("#resultUserStatus").text("Approved");}
										      	else if (res == false && status==1) { $("#resultUserStatus").text("Pending");										      		
										      	}
										      	else if(status==0) {$("#resultUserStatus").text("NotExist"); };

                                                 
                                                  $('#resultUserCnic').text(cnic);
                                                  var name = result[0];
                                                  $('#resultUserName').text(name);
                                                  var phone = result[2];
                                                  $('#resultUserPhone').text(phone);

										      	}).catch(error=>{
			               							console.log(error);
			               						});
										      	

                                      }                                          
                                              else
                                                  console.error(error);
                                            });  });
  },

  getAdminDetails: function() {
  //  event.preventDefault();
  $("#search").hide();
   var Table = document.getElementById("usertable");
	Table.innerHTML = "";
	var row1 = `
        			<thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Name</th>
                     <th scope="col">Address</th>
                     <th scope="col">Status</th>
                     <th scope="col">Cnic</th>
                     <th scope="col">Phone</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th scope="row">1</th>
                     <td id="resultUserName"></td>
                     <td id="resultUserAdd"></td>
                     <td id="resultUserStatus"></td>
                     <td id="resultUserCnic"></td>
                     <td id="resultUserPhone"></td>
                  </tr>
               </tbody>
        `
        		Table.innerHTML += row1;
    var UserAdd = $('#UserSearchform #UserSearch').val();

    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                                            App.contracts.asset.methods.getAdminDetails(UserAdd).call(
                                            	function(error, result){
                                              if(!error)
                                          {        console.log(JSON.stringify(result));

                                          		var status = result[4];

                                                  
                                                  var add = result[1];
                                                  $("#resultUserAdd").text(add);
                                                  bool = App.contracts.asset.methods.verifiedAdmins(add).call(
										      	{
										      	gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')});
										      	console.log(bool);
										      	bool.then(res=>{
										      		console.log(res);
										      		if (res == true && status==1){$("#resultUserStatus").text("Approved");}
										      	else if (res == false && status==1) { $("#resultUserStatus").text("Pending");										      		
										      	}
										      	else if(status==0) {$("#resultUserStatus").text("NotExist"); };

                                                 
                                                 var cnic = result[2];
                                                  $('#resultUserCnic').text(cnic);
                                                  var name = result[0];
                                                  $('#resultUserName').text(name);
                                                  var phone = result[3];
                                                  $('#resultUserPhone').text(phone);

										      	}).catch(error=>{
			               							console.log(error);
			               						});


                                      }                                          
                                              else
                                                  console.error(error);
                                            });  });
  },

  adduser: function(event) {
  	 event.preventDefault();
 //   var useraddress = $('#adduser #PropAddUser').val();
 	var useraddress = $("#adduser #Useradd").val();
    var username = $('#adduser #UserName').val();
    var cnic = $('#adduser #UserCnic').val();
    var userphone = $('#adduser #UserPhone').val();
            var from = web3.eth.accounts["currentProvider"].selectedAddress;
           web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log("errorrrrrr");
                        }
                        if($('#adduser #PropAddUserrole').val() == "User")
                        {App.contracts.asset.methods.addNewUser(username, cnic, userphone).send({from: from, gas: 1000000, 
                        	gasPrice: web3.utils.toWei("20", 'gwei')}, 
                        	function(error, result){
                          if(!error){
                              console.log(result);}

                          else{
                              console.error(error+"rrrrs");
                          }
                        });
                        }
                        else if ($('#adduser #PropAddUserrole').val() == "Admin")
                        {App.contracts.asset.methods.addNewAdmin( username, useraddress, cnic, userphone).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')},
                         function(error, result){
                          if(!error){
                              console.log(JSON.stringify(result)); 
                          
                          }
                          else{
                              console.error(error);
                          }
                        });
                        }
                        else if ($('#adduser #PropAddUserrole').val() == "SuperAdmin")
                        {App.contracts.asset.methods.addNewSuperAdmin(username, useraddress, cnic, userphone).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });
                        }


                      }); 
// event 
  
   },

  
  approveUsers: function(event) {
    event.preventDefault();
    var useraddress = $('#approve #PropApproveUser').val();
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

  },

   approveAdmins: function(event) {
    event.preventDefault();
    var useraddress = $('#approve #PropApproveUser').val();
    var from = web3.eth.accounts["currentProvider"].selectedAddress;
    web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
                        App.contracts.asset.methods.approveAdmins(useraddress).send({from: from, gas: 1000000, gasPrice: web3.utils.toWei("20", 'gwei')},
                         function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                          		alert(error);
                          		alert("error");
                        });});

  }
};

$(function() {
  $(window).load(function() {
  	$("#historyTable").hide();
  	$("#PropTable").hide();
  	$("#search1").hide();

  	
           

    App.init();
  });
});
