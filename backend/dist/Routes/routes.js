"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tasks = require("../controllers/tasks");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**Aqui se definen las rutas */
var _require = require('express'),
  Router = _require.Router;
console.log('DEBUG postAllowed:', _typeof(_tasks.postAllowed));
console.log('DEBUG postAllowedList:', _typeof(_tasks.postAllowedList));
var router = Router();
router.get('/int/clientlist', _tasks.getClientList);
router.get('/int/routeslist', _tasks.getRoutesList);
router.get('/int/advisorslist', _tasks.getAdvisorsList);
router.post('/int/newclient', _tasks.postNewClient);
router.get('/int/supplierlist', _tasks.getSupplierList);
router.get('/int/workerlist', _tasks.getWorkerList);
//!Products
router.get('/int/getproductlist', _tasks.getProductList);
router.get('/int/coordinatespageslist', _tasks.CoordinatesPagesList);
router.get('/int/categorylist', _tasks.getCategoryList);
router.get('/int/claseslist', _tasks.getClasesList);
router.post('/int/postupdateproduct', _tasks.postUpdateProduct);
router.post('/int/othersupplier', _tasks.postOtherSupplier);
router.post('/int/quiantityanddisponible', _tasks.quiantityAndDisponible);
router.post('/int/newproduct', _tasks.postNewProduct);
router.post('/int/checklogindata', _tasks.checkLogInData);
router.get('/int/quiantityproductList', _tasks.quiantityProductList);
router.post('/int/updateclient', _tasks.postUpdateClient);
router.post('/int/newsupplier', _tasks.postNewSupplier);
router.post('/int/updatesupplier', _tasks.postUpdateSupplier);
router.post('/int/newcategory', _tasks.postNewCategory);
router.post('/int/updatecategory', _tasks.postUpdateCategory);
router.post('/int/detelecategory', _tasks.postDeteleCategory);
//!SubCategories
router.get('/int/subcategorylist', _tasks.getSubCategoryList);
router.post('/int/newsubcategory', _tasks.postNewSubCategory);
router.post('/int/updatesubcategory', _tasks.postUpdateSubCategory);
router.post('/int/detelesubcategory', _tasks.postDeteleSubCategory);
//! Purchase 
router.get('/int/entrantslist', _tasks.getEntrantsList);
router.get('/int/purchaselist', _tasks.getPurchaseList);
router.post('/int/newpurchase', _tasks.postNewPurchase);
router.post('/int/updatepurchase', _tasks.postUpdatePurchase);
router.post('/int/deletepp', _tasks.postDeletePP);

//!Entered
router.get('/int/enteredlist', _tasks.getEnteredList);
router.get('/int/statuslist', _tasks.getStatusList);

//!Partil paiment
router.get('/int/partialpaymentpurchase', _tasks.getPartialPaymentPurchase);
router.post('/int/pppurchase', _tasks.getPPPurchase);
router.post('/int/postmakepp', _tasks.postMakePP);

//!Sales
router.get('/int/ppsales', _tasks.getPPSales);
router.get('/int/ppsalesbalances', _tasks.getPPSalesBalances);
router.post('/int/newsale', _tasks.postNewSale);

//!credit notes
router.get('/int/creditnotes', _tasks.getCreditNotes);
router.post('/int/preparationlist', _tasks.getPreparationList);
router.post('/int/stateflow', _tasks.postStateFlow);
router.get('/int/pendinglist', _tasks.getPendingList);
router.post('/int/onTheRoute', _tasks.postOntheRoute);
router.post('/int/specificpurchase', _tasks.getSpecificPurchase);

//!Alias
router.post('/int/aliaslist', _tasks.getAliasList);
router.post('/int/newalias', _tasks.postNewAlias);
router.post('/int/deletelias', _tasks.postDeleteAlias);
router.post('/int/orderheader', _tasks.getOrderHeader);
router.post('/int/getorderdetail', _tasks.getOrderDetail);
router.post('/int/updateorder', _tasks.updateOrder);
router.post('/int/closeorder', _tasks.postCloseOrder);
router.post('/int/anuul', _tasks.postAnuul);
router.get('/int/weekly', _tasks.getWeekly);
router.post('/int/allowed', _tasks.postAllowed);
router.post('/int/allowedlist', _tasks.postAllowedList);
router.post('/int/changepermits', _tasks.postChangePermits);
router.post('/int/changepassword', _tasks.postChangePassword);

//!New Worker
router.post('/int/newworker', _tasks.postNewWorker);
router.post('/int/updateworker', _tasks.postUpdateWorker);
var _default = exports["default"] = router;