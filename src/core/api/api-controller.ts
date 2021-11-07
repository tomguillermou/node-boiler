import { apiService as service, ApiService } from './api.service';

export abstract class ApiController {
    protected apiService: ApiService;

    constructor() {
        this.apiService = service;
    }
}
