/**Aqui se definen las rutas */
const { Router } = require('express');
import {getClientList,
        getRoutesList,
        getAdvisorsList,
        postNewClient,
        getSupplierList,
        getWorkerList,
        getSubCategoryList,
        getProductList,
        postUpdateProduct,
        postOtherSupplier,
        getClasesList,
        quiantityAndDisponible,
        postNewProduct,
        checkLogInData,
        quiantityProductList,
        postUpdateClient,
        postNewSupplier,
        postUpdateSupplier,
        getCategoryList,
        postNewCategory,
        postUpdateCategory,
        postDeteleCategory,
        postNewSubCategory,
        postUpdateSubCategory,
        postDeteleSubCategory,
        getEntrantsList,
        getPurchaseList,
        getEnteredList,
        getStatusList,
        getPartialPaymentPurchase,
        getPPPurchase,
        postMakePP,
        postNewPurchase,
        getPPSales,
        getPPSalesBalances,
        getCreditNotes,
        getPreparationList,
        postStateFlow,
        getPendingList,
        postOntheRoute,
        getSpecificPurchase,
        getAliasList,
        postNewAlias,
        getOrderHeader,
        getOrderDetail,
        updateOrder,
        postCloseOrder,
        postAnuul,
        getWeekly,
        postNewSale
 } from '../controllers/tasks';

const router = Router();

router.get('/int/clientlist', getClientList)
router.get('/int/routeslist', getRoutesList)
router.get('/int/advisorslist', getAdvisorsList)
router.post('/int/newclient', postNewClient)
router.get('/int/supplierlist', getSupplierList)
router.get('/int/workerlist', getWorkerList)
router.get('/int/getproductlist', getProductList)
router.get('/int/categorylist', getCategoryList)
router.get('/int/claseslist', getClasesList)
router.post('/int/postupdateproduct', postUpdateProduct)
router.post('/int/othersupplier', postOtherSupplier)
router.post('/int/quiantityanddisponible', quiantityAndDisponible)
router.post('/int/newproduct', postNewProduct)
router.post('/int/checklogindata',checkLogInData)
router.get('/int/quiantityproductList',quiantityProductList)
router.post('/int/updateclient',postUpdateClient)
router.post('/int/newsupplier',postNewSupplier)
router.post('/int/updatesupplier',postUpdateSupplier)
router.post('/int/newcategory',postNewCategory)
router.post('/int/updatecategory',postUpdateCategory)
router.post('/int/detelecategory',postDeteleCategory)
//!SubCategories
router.get('/int/subcategorylist', getSubCategoryList)
router.post('/int/newsubcategory',postNewSubCategory)
router.post('/int/updatesubcategory',postUpdateSubCategory)
router.post('/int/detelesubcategory',postDeteleSubCategory)
//! Purchase 
router.get('/int/entrantslist',getEntrantsList)
router.get('/int/purchaselist',getPurchaseList)
router.post('/int/newpurchase',postNewPurchase)

//!Entered
router.get('/int/enteredlist',getEnteredList)
router.get('/int/statuslist',getStatusList)

//!Partil paiment
router.get('/int/partialpaymentpurchase',getPartialPaymentPurchase)
router.post('/int/pppurchase', getPPPurchase)
router.post('/int/postmakepp', postMakePP)

//!Sales
router.get('/int/ppsales',getPPSales)
router.get('/int/ppsalesbalances',getPPSalesBalances)
router.post('/int/newsale',postNewSale)

//!credit notes
router.get('/int/creditnotes',getCreditNotes)

router.post('/int/preparationlist',getPreparationList)
router.post('/int/stateflow',postStateFlow)

router.get('/int/pendinglist',getPendingList)

router.post('/int/onTheRoute',postOntheRoute)
router.post('/int/specificpurchase',getSpecificPurchase)

//!Alias
router.post('/int/aliaslist',getAliasList)
router.post('/int/newalias',postNewAlias)

router.post('/int/orderheader',getOrderHeader)
router.post('/int/getorderdetail',getOrderDetail)
router.post('/int/updateorder',updateOrder)

router.post('/int/closeorder',postCloseOrder)
router.post('/int/anuul',postAnuul)

router.get('/int/weekly',getWeekly)

export default router