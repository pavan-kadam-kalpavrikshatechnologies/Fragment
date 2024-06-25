sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // "sap.m.MessageBox.js"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.kt.fragment.fragment.controller.View1", {
            onInit: function () {
                var jsondata = [{
                    "id":1,
                    "name":"hotel",
                    "amount":1200
                }]
                var oModel = new sap.ui.model.json.JSONModel(jsondata)
                var oColItem = this.getView().byId("comunListId")
                this.getView().setModel(oModel,"modelStudent")
               // this.getView().byId("TableId").bindAggregation("items","/",oColItem)
            },
            onPressEvent : function(){
                var oView = this.getView();
                if (!this.oDialog) {
                    this.oDialog = sap.ui.core.Fragment.load({
                        name: "sap.kt.fragment.fragment.fragment.first",
                        controller: this
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        oView.addDependent(this.oDialog);
                        this.oDialog.open();
                    }.bind(this));
                } else {
                    this.oDialog.open();
                }
            },
            onDelete : function(oEvent){
                var sSelectedPath = oEvent.getParameter("listItem").getBindingContextPath().split("/")[1];
                this.getView().getModel("modelStudent").getData().splice(sSelectedPath,"1");
                this.byId("TableId").getModel("modelStudent").refresh();
            },
            onPressSave: function () {
                var sExpId = sap.ui.getCore().byId("idExpId").getValue();
                var sAmount = sap.ui.getCore().byId("idAmount").getValue();
                var sName = sap.ui.getCore().byId("idName").getValue();
                var oModel = this.getView().getModel("modelStudent").getData();
                var oPayload = {
                    "id":sExpId,
                    "name":sName,
                    "amount":sAmount
                }
                oModel.push(oPayload);
                this.oDialog.close();
                this.byId("TableId").getModel("modelStudent").refresh();
                // MessageBox.success("Expense Saved Successfully")
            },

        });
    });
