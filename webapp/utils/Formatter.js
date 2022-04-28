sap.ui.define(
    [],
    function () {
        "use strict";
        return {

            formatterspeciecolor: function (specie) {
                

                if(specie=="dog"){
                    return "Success"
                }
                if(specie=="exotic"){
                    return "Warning"
                }
                
                if(specie=="cat"){
                    return "Error" 
                }
              

            }

            



        };



    },



    true


);





