sap.ui.define(

    [],

    function () {

        "use strict";

        return {

            
            MODELS: {
                    products: "modelProducts",
                    selectedProd: "modelSelectedProd",

                },

            ID: {

                tablas:{

                   ejemplo: "tableid",
 
                } 


            },    

            
            routes: {

                ENTITYS: {
                    products: "/V3/Northwind/Northwind.svc/Products",
                },
                
                    sortDialog: "veterinaria.view.fragment.sorterPopUp",
                     groupDialog: "IntegradorFinal.IntegradorFinal.fragments.GroupDialog",

                

            },

        };

    },

    true

);