import { ComboService } from '../../services/combos/comboService.js'

export class ComboController {
    static async listProbes(req, res, next) {
        try {
            const result = await ComboService.listProbes();
            return res.status(200).json({ Probes: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listTerrainTypes(req, res, next) {
        try {
            const result = await ComboService.listTerrainTypes();
            return res.status(200).json({ TerrainTypes: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listPositions(req, res, next) {
        try {
            const result = await ComboService.listPositions();
            return res.status(200).json({ Positions: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listCompanies(req, res, next) {
        try {
            const result = await ComboService.listCompanies();
            return res.status(200).json({ Companies: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listUsersEmails(req, res, next) {
        try {
            const result = await ComboService.listUsersEmails();
            return res.status(200).json({ UsersEmails: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listModules(req, res, next) {
        try {
            const result = await ComboService.listModules();
            return res.status(200).json({ Modules: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listCountries(req, res, next) {
        try {
            const result = await ComboService.listCountries();
            return res.status(200).json({ Countries: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listClients(req, res, next) {
        try {
            const result = await ComboService.listClients();
            return res.status(200).json({ Clients: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listProjects(req, res, next) {
        try {
            const result = await ComboService.listProjects();
            return res.status(200).json({ Projects: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listEquipment(req, res, next) {
        try {
            const result = await ComboService.listEquipment();
            return res.status(200).json({ Teams: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listUsers(req, res, next) {
        try {
            const result = await ComboService.listUsers();
            return res.status(200).json({ Users: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listProductTypes(req, res, next) {
        try {
            const result = await ComboService.listProductTypes();
            return res.status(200).json({ ProductTypes: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listMeasures(req, res, next) {
        try {
            const result = await ComboService.listMeasures();
            return res.status(200).json({ Measures: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listProducts(req, res, next) {
        try {
            const result = await ComboService.listProducts();
            return res.status(200).json({ Products: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listLines(req, res, next) {
        try {
            const result = await ComboService.listLines();
            return res.status(200).json({ Lines: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listProductSerialNumbers(req, res, next) {
        try {
            const result = await ComboService.listProductSerialNumbers();
            return res.status(200).json({ ProductSerialNumbers: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listActivityTypes(req, res, next) {
        try {
            const result = await ComboService.listActivityTypes();
            return res.status(200).json({ ActivityTypes: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listDocumentTypes(req, res, next) {
        try {
            const result = await ComboService.listDocumentTypes();
            return res.status(200).json({ DocumentTypes: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    static async listMailTypes(req, res, next) {
        try {
            const result = await ComboService.listMailTypes();
            return res.status(200).json({ MailTypes: result});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
}