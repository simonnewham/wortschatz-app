import dataService from "./DataService";

class BaseEntityDataService {
    constructor() {
    }

    public async Create(entity: string, body: any): Promise<Response> {
        return dataService.Post(`${entity}/create`, body);
    }

    public async Update(entity: string, body?: any): Promise<Response> {
        return dataService.Post(`${entity}/update`, body);
    }

    public async Delete(entity: string, id: string): Promise<Response> {
        return dataService.Delete(`${entity}`, id);
    }

    public async GetList(entity: string, body?: any): Promise<Response> {
        return dataService.Post(`${entity}/getList`, body);
    }

    public async GetDetail(entity: string, id?: string): Promise<Response> {
        return dataService.GetById(`${entity}`, id);
    }

}

const baseEntityDataService = new BaseEntityDataService();
export default baseEntityDataService;