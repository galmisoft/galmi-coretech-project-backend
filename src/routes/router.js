import { Router} from "express";
import { UserController } from "../controllers/admin/userController.js";
import { ClientController } from "../controllers/admin/clientController.js";
import { DayPartController } from "../controllers/modules/dayPartController.js";
import { CostoMetroController } from "../controllers/modules/costoMetroController.js"
import { CompanyController } from "../controllers/admin/companyController.js"
import { ProductController } from "../controllers/admin/productController.js";
import { ActivityController } from "../controllers/admin/activityController.js";
import { ProjectController } from "../controllers/admin/projectController.js";
import { EquipmentController } from "../controllers/admin/equipmentController.js";
import { AssignationController } from "../controllers/admin/assignationController.js";
import { ItemController } from "../controllers/admin/itemController.js";
import { PersonController } from "../controllers/admin/personController.js";
import { EmailController } from "../controllers/admin/emailController.js";
import { ComboController } from "../controllers/combos/comboController.js";
import { AuthController } from "../controllers/admin/authController.js";
import { ProbeController } from "../controllers/admin/probeController.js";

const router = Router();


router.post('/sigin', AuthController.login);
router.post('/dayPart', DayPartController.listDayParts)
router.post('/dayPart/form', DayPartController.dayPartData)
router.post('/dayPart/create', DayPartController.createDayParts)

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
router.post('/admin/product', ProductController.listProducts)
router.post('/admin/product/create', ProductController.createProduct)
router.post('/admin/product/update', ProductController.updateProduct)
router.post('/admin/product/delete', ProductController.deleteProduct)
router.post('/admin/product/toggle', ProductController.toggleActive)
// Items
router.post('/admin/items', ItemController.listItems)
router.post('/admin/items/create', ItemController.createItem)
router.post('/admin/items/update', ItemController.updateItem)
router.post('/admin/items/delete', ItemController.deleteItem)
// Activity
router.post('/admin/activity', ActivityController.listActivies)
router.post('/admin/activity/create', ActivityController.createActivities)
router.post('/admin/activity/update', ActivityController.updateActivities)
router.post('/admin/activity/delete', ActivityController.deleteActivities)
router.post('/admin/activity/toggle', ActivityController.toggleActive)
// Person
router.post('/admin/person', PersonController.listPersons)
router.post('/admin/person/create', PersonController.createPerson)
router.post('/admin/person/update', PersonController.updatePerson)
router.post('/admin/person/delete', PersonController.deletePerson)
router.post('/admin/person/toggle', PersonController.toggleActive)
// Person
router.post('/admin/email', EmailController.listEmail)
router.post('/admin/email/create', EmailController.createEmail)
router.post('/admin/email/update', EmailController.updateEmail)
router.post('/admin/email/delete', EmailController.deleteEmail)
// Probe
router.post('/admin/probe', ProbeController.findProbe)

// COMBOS
router.post('/combo/probes', ComboController.listProbes)
router.post('/combo/terrainTypes', ComboController.listTerrainTypes)
router.post('/combo/positions', ComboController.listPositions)
router.post('/combo/companies', ComboController.listCompanies)
router.post('/combo/usersEmails', ComboController.listUsersEmails)
router.post('/combo/modules', ComboController.listModules)
router.post('/combo/countries', ComboController.listCountries)
router.post('/combo/clients', ComboController.listClients)
router.post('/combo/projects', ComboController.listProjects)
router.post('/combo/equipment', ComboController.listEquipment)
router.post('/combo/users', ComboController.listUsers)
router.post('/combo/productTypes', ComboController.listProductTypes) 
router.post('/combo/measures', ComboController.listMeasures)
router.post('/combo/products', ComboController.listProducts)
router.post('/combo/lines', ComboController.listLines)
router.post('/combo/productSerialNumbers', ComboController.listProductSerialNumbers)
router.post('/combo/activityTypes', ComboController.listActivityTypes)
router.post('/combo/documentTypes', ComboController.listDocumentTypes)
router.post('/combo/mailTypes', ComboController.listMailTypes)

export default router;