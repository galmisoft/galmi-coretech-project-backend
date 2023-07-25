import { Router} from "express";
import { UserController } from "../controllers/userController.js";
import { ClientController } from "../controllers/clientController.js";
import { DayPartController } from "../controllers/dayPartController.js";
import { CostoMetroController } from "../controllers/costoMetroController.js"
import { CompanyController } from "../controllers/companyController.js"
import { ProductController } from "../controllers/productController.js";
import { ActivityController } from "../controllers/activityController.js";
import { ProjectController } from "../controllers/projectController.js";
import { EquipmentController } from "../controllers/equipmentController.js";
import { AssignationController } from "../controllers/assignationController.js";

const router = Router();


// VIEWS
// LOGIN
// router.post('/sigin', UserController.validateUser);

// // INICIO

// // DAY PART
// router.post('/dayPart', DayPartController.listDayParts)
// router.post('/dayPart/form', DayPartController.dayPartData)
// router.post('/dayPart/create', DayPartController.createDayParts)

// // COSTO X METRO
// router.post('/costoMetro', CostoMetroController.listCostoMetro)
// router.post('/costoMetro/download', CostoMetroController.downloadCostoMetro)


/**** ADMIN *****/
// FALTA PATALLA RESUMEN
// Company (Contrata de Coretech)
router.post('/admin/company', CompanyController.listCompanies)
router.post('/admin/company/create', CompanyController.createCompany)
router.post('/admin/company/update', CompanyController.updateCompany)
router.post('/admin/company/delete', CompanyController.deleteCompany)
// User (Usuarios de Companies)
router.post('/admin/user', UserController.listUser)
router.post('/admin/user/create', UserController.createUser)
router.post('/admin/user/update', UserController.updateUser)
router.post('/admin/user/delete', UserController.deleteUser)
// Clients
router.post('/admin/client', ClientController.listClients)
router.post('/admin/client/create', ClientController.createClient)
router.post('/admin/client/update', ClientController.updateClient)
router.post('/admin/client/delete', ClientController.deleteClient)
// Projects
router.post('/admin/project', ProjectController.listProject)
router.post('/admin/project/create', ProjectController.createProject)
router.post('/admin/project/update', ProjectController.updateProject)
router.post('/admin/project/delete', ProjectController.deleteProject)
// Equipment
router.post('/admin/equipment', EquipmentController.listEquipment)
router.post('/admin/equipment/create', EquipmentController.createEquipment)
router.post('/admin/equipment/update', EquipmentController.updateEquipment)
router.post('/admin/equipment/delete', EquipmentController.deleteEquipment)
// Assignation
router.post('/admin/assignation', AssignationController.listAssignation)
router.post('/admin/assignation/create', AssignationController.createAssignation)
router.post('/admin/assignation/update', AssignationController.updateAssignation)
router.post('/admin/assignation/delete', AssignationController.deleteAssignation)
// Products
// router.post('/admin/product', ProductController.listProducts)
// router.post('/admin/product/create', ProductController.createProduct)
// router.post('/admin/product/update', ProductController.updateProduct)
// router.post('/admin/product/delete', ProductController.deleteProduct)
// router.post('/admin/product/toggle', ProductController.toggleActive)
// Activity
router.post('/admin/activity', ActivityController.listActivies)
router.post('/admin/activity/create', ActivityController.createActivities)
router.post('/admin/activity/update', ActivityController.updateActivities)
router.post('/admin/activity/delete', ActivityController.deleteActivities)
router.post('/admin/activity/toggle', ActivityController.toggleActive)

export default router;