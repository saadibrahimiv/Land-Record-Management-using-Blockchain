






                        web3.eth.getAccounts(function(error, accounts) {
                        if (error) {
                    console.log(error);
                        }
   

                        var added = App.contracts.asset.user();
              added.watch(function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    $("#instructor").html(result.args.name + ' (' + result.args.age + ' years old)');
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        });





               history: function (event) {
      event.preventDefault();

      App.contracts.asset.getPastEvents("Ownership_changed", {filter: {propId:1},fromBlock:0,
                toBlock:"latest"

                },function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    console.log(result); //.c[0]
                   // var from = result.args._from;
                   // var to = result.args.to;
                   // var id = result.args.propId.toNumber(); 
                  //  $("#history").html("land id "+id+"from "+from+"to "+to); //.c[0]

                   // console.log("land id "+id+"from "+from+"to "+to);
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        } )
    },



{
                        if (error) {
                    console.log("errorrrrrr");
                        }
                        if($('#adduser #PropAddUserrole').val() == "User")
                        {App.contracts.asset.addNewUser(username, useraddress, cnic, userphone, {gas: 1000000, gasPrice: web3.toWei(20, 'gwei')}, function(error, result){
                          if(!error)
                              console.log(result);
                          else
                              console.error(error+"rrrrs");
                        });
                        }
                        else if ($('#adduser #PropAddUserrole').val() == "Admin")
                        {App.contracts.asset.addNewAdmin(useraddress, username, {gas: 1000000, gasPrice: web3.toWei(20, 'gwei')}, function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result)); 
                          else
                              console.error(error);
                        });
                        }
                        else if ($('#adduser #PropAddUserrole').val() == "SuperAdmin")
                        {App.contracts.asset.addNewSuperAdmin(useraddress, username, {gas: 1000000, gasPrice: web3.toWei(20, 'gwei')}, function(error, result){
                          if(!error)
                              console.log(JSON.stringify(result));
                          else
                              console.error(error);
                        });
                        }


                      }