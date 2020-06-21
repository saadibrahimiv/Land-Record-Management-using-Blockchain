pragma solidity ^0.5.0;

contract asset {

    address public creatorAdmin;
	enum Status { NotExist, Pending, Approved, Rejected }
	enum userStatus { NotExist, Pending, Approved }

	struct PropertyDetail {
		Status status;
		string name;	
	//	address currOwner;
		uint CNIC;
		uint size;
		uint value;
		string regDate;
	}

	struct UserDetail {
		userStatus status;
		string name;
	//	address add;
		uint CNIC;
		uint Phone;
	}
	
	struct AdminDetail{
		userStatus status;
	    string name;
	    address add;
	    uint CNIC;
	    uint Phone;
	}
 

	// Dictionary of all the properties, mapped using their { propertyId: PropertyDetail } pair.
	mapping(uint => PropertyDetail) public properties;
	mapping(uint => UserDetail) public propOwnerChange;
    mapping(uint => UserDetail) public userslist;
    mapping(uint => int) public users;
    mapping(address => AdminDetail) public adminslist;
    mapping(address => int) public admins;
    mapping(uint => bool) public verifiedUsers;
    mapping(address => bool) public verifiedAdmins;   
	modifier onlyOwner(uint _propId) {
	//	require(properties[_propId].CNIC == msg.sender);
		_;
	}

	modifier verifiedUser(uint _cnic) {
	    require(verifiedUsers[_cnic]);
	    _;
	}

	modifier verifiedAdmin() {
		require(admins[msg.sender] >= 2 && verifiedAdmins[msg.sender]);
		_;
	}

	modifier verifiedSuperAdmin() {
	    require(admins[msg.sender] == 3 && verifiedAdmins[msg.sender]);
	    _;
	}

	// Initializing the User Contract.
	constructor ()public {
		creatorAdmin = msg.sender;
		admins[creatorAdmin] = 3;
		verifiedAdmins[creatorAdmin] = true;
	}

	// Create a new Property.
	event property_created (
		Status, uint propId,string name, uint cnic, uint size,uint value, string date 
		);

	function createProperty(uint _propId, uint _cnic, uint _size, uint _value, string memory _regDate)
	public verifiedAdmin  verifiedUser(_cnic)
	 returns (bool) {
	 	string memory name = userslist[_cnic].name;
	 	// uint cnic = userslist[_currOwner].CNIC;
		properties[_propId] = PropertyDetail(Status.Pending, name,  _cnic, _size, _value, _regDate);
		emit property_created(Status.Pending, _propId, name, _cnic, _size, _value, _regDate);
		return true;
	}
	

	// Approve the new Property.
	function approveProperty(uint _propId)public verifiedSuperAdmin returns (bool){
		require(properties[_propId].CNIC != adminslist[msg.sender].CNIC);
		properties[_propId].status = Status.Approved;
		return true;
	}

	// Reject the new Property.
	function rejectProperty(uint _propId)public verifiedSuperAdmin returns (bool){
		require(properties[_propId].CNIC != adminslist[msg.sender].CNIC);
		properties[_propId].status = Status.Rejected;
		return true;
	}

	event Ownership_changed_requested (
	    uint indexed propId,
		uint to,
		string name

		);

	// Request Change of Ownership.
	function changeOwnership(uint _propId, uint _NewCnic)public verifiedAdmin verifiedUser(_NewCnic) returns (bool) {
		require(properties[_propId].CNIC != _NewCnic);
		require(propOwnerChange[_propId].CNIC == 0);
		propOwnerChange[_propId].CNIC = _NewCnic;
		propOwnerChange[_propId].name = userslist[_NewCnic].name;
	//	propOwnerChange[_propId].CNIC = userslist[_newOwner].CNIC;
		emit Ownership_changed_requested(_propId, _NewCnic, propOwnerChange[_propId].name);
		return true;
	}

	event Ownership_changed (

		uint from,
		string fromName,
		uint to,
		string toName,
		uint indexed propId

		);

	// Approve chage in Onwership.
	function approveChangeOwnership(uint _propId)public verifiedSuperAdmin returns (bool) {
	    require(propOwnerChange[_propId].CNIC != 0);

	    uint from = properties[_propId].CNIC;
	    string memory fromName = properties[_propId].name;
	  //  uint fromCnic = properties[_propId].CNIC;	
	    			//key					 	
	    properties[_propId].CNIC = propOwnerChange[_propId].CNIC;
	    properties[_propId].name = propOwnerChange[_propId].name;
	  //  properties[_propId].CNIC = propOwnerChange[_propId].CNIC;

	    uint to = propOwnerChange[_propId].CNIC;
	    string memory toName = propOwnerChange[_propId].name;
	 //   uint toCnic = propOwnerChange[_propId].CNIC;
	    
	    propOwnerChange[_propId].CNIC = 0;

	    emit Ownership_changed(from, fromName, to, toName, _propId );

	    return true;
	}

	function rejectChangeOwnership(uint _propId)public verifiedSuperAdmin returns (bool) {
		propOwnerChange[_propId].CNIC = 0 ;

	}

	// Change the price of the property.
    function changeValue(uint _propId, uint _newValue)public verifiedAdmin returns (bool) {
        require(propOwnerChange[_propId].CNIC == 0);
        properties[_propId].value = _newValue;
        return true;
    }

	// Get the property details.
	function getPropertyDetails(uint _propId)public view returns (Status,string memory, uint, uint, uint, string memory) {
		return (properties[_propId].status, properties[_propId].name, 
		 properties[_propId].CNIC, properties[_propId].size, properties[_propId].value, properties[_propId].regDate);
	}

	// Get the user details.
	function getUserDetails(uint _cnic)public view returns (string memory, uint, uint, userStatus) {
		return (userslist[_cnic].name, userslist[_cnic].CNIC, 
			userslist[_cnic].Phone, userslist[_cnic].status);
	}

	// Get the admins details.
	function getAdminDetails(address _add)public view returns (string memory, address, uint, uint, userStatus) {
		return (adminslist[_add].name, adminslist[_add].add, adminslist[_add].CNIC, 
			adminslist[_add].Phone, adminslist[_add].status);
	}

	event user ( 
	        userStatus,
			string name,
			uint CNIC,
			uint Phone 
		);


	// Add new user.
	function addNewUser(string memory _name, uint _CNIC, uint _Phone)public verifiedAdmin returns (bool) {
	    require(users[_CNIC] == 0);
	    require(verifiedUsers[_CNIC] == false);
	    users[_CNIC] = 1;
	    userslist[_CNIC] = UserDetail(userStatus.Pending ,_name, _CNIC, _Phone);
	    emit user(userStatus.Pending ,_name, _CNIC, _Phone);
	    return true;
	}

	event adminAdded (
	    userStatus,
		string name,
		address add,
		uint cnic,
		uint Phone
		);

	// Add new Admin.
	function addNewAdmin(string memory _name, address _newAdmin, uint _CNIC, uint Phone)public verifiedSuperAdmin returns (bool) {
	    require(admins[_newAdmin] == 0);
	    require(verifiedAdmins[_newAdmin] == false);
	    admins[_newAdmin] = 2;
	    adminslist[_newAdmin] = AdminDetail(userStatus.Pending ,_name, _newAdmin, _CNIC, Phone);
	    emit adminAdded(userStatus.Pending ,_name, _newAdmin, _CNIC, Phone);
	    return true;
	}

	// Add new SuperAdmin.
	function addNewSuperAdmin(string memory _name, address _newSuperAdmin, uint _CNIC, uint Phone)public verifiedSuperAdmin returns (bool) {
	    require(admins[_newSuperAdmin] == 0);
	    require(verifiedAdmins[_newSuperAdmin] == false);
	    admins[_newSuperAdmin] = 3;
	    adminslist[_newSuperAdmin] = AdminDetail(userStatus.Pending ,_name, _newSuperAdmin, _CNIC, Phone);
	    emit adminAdded(userStatus.Pending ,_name, _newSuperAdmin, _CNIC, Phone);
	    return true;
	}

	// Approve User.
	function approveUsers(uint _CNIC)public verifiedSuperAdmin returns (bool) {
	    require(users[_CNIC] != 0);
	    verifiedUsers[_CNIC] = true;
	    return true;
	}
	
	// Approve admins
	function approveAdmins(address _add)public verifiedSuperAdmin returns (bool) {
	    require(admins[_add] != 0);
	    verifiedAdmins[_add] = true;
	    return true;
	}
	
}

