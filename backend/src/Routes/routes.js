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
        postUpdateCategory
 } from '../controllers/tasks';

const router = Router();

router.get('/int/clientlist', getClientList)
router.get('/int/routeslist', getRoutesList)
router.get('/int/advisorslist', getAdvisorsList)
router.post('/int/newclient', postNewClient)
router.get('/int/supplierlist', getSupplierList)
router.get('/int/workerlist', getWorkerList)
router.get('/int/subcategorylist', getSubCategoryList)
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
export default router