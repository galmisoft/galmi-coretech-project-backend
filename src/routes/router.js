import { Router} from "express";
import { UserController } from "../controllers/userController.js";

import { DayPartController } from "../controllers/dayPartController.js";
import { CostoMetroController } from "../controllers/costoMetroController.js"
import { CompanyController } from "../controllers/companyController.js"
import { ProductController } from "../controllers/productController.js";
import { ActivityController } from "../controllers/activityController.js";

const router = Router();


// VIEWS
// LOGIN
router.post('/sigin', UserController.validateUser);

// INICIO

// DAY PART
router.post('/dayPart', DayPartController.listDayParts)
router.post('/dayPart/form', DayPartController.dayPartData)
router.post('/dayPart/create', DayPartController.createDayParts)

// COSTO X METRO
router.post('/costoMetro', CostoMetroController.listCostoMetro)
router.post('/costoMetro/download', CostoMetroController.downloadCostoMetro)


/**** ADMIN *****/
// FALTA PATALLA RESUMEN
// Company (Contrata de Coretech)
router.post('/admin/company', CompanyController.listCompanies)
router.post('/admin/company/create', CompanyController.createCompany)
router.post('/admin/company/update', CompanyController.updateCompany)
router.post('/admin/company/delete', CompanyController.deleteCompany)
// User (Usuarios de Companies)
router.post('/admin/user/create', UserController.createUser)
router.post('/admin/user/update', UserController.updateUser)
router.post('/admin/user/delete', UserController.deleteUser)
// Products
router.post('/admin/product', ProductController.listProducts)
router.post('/admin/product/create', ProductController.createProduct)
router.post('/admin/product/update', ProductController.updateProduct)
router.post('/admin/product/delete', ProductController.deleteProduct)
router.post('/admin/product/toggle', ProductController.toggleActive)
// Activity
router.post('/admin/activity', ActivityController.listActivies)
router.post('/admin/activity/create', ActivityController.createActivities)
router.post('/admin/activity/update', ActivityController.updateActivities)
router.post('/admin/activity/delete', ActivityController.deleteActivities)
router.post('/admin/activity/toggle', ActivityController.toggleActive)

export default router;