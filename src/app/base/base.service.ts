import { HttpRequestMethods } from './../shared/constants/http-request-methods';
import { HttpService } from './../core/services/http/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class BaseService {

    constructor(
        private httpService: HttpService
    ) { }

    async register(registrationData) {

        const requestData = {
            'name': registrationData.organizationName,
            'user': {
                'email': registrationData.email,
                'userName': registrationData.userName,
                'password': registrationData.password,
                'firstName': registrationData.firstName,
                'lastName': registrationData.lastName,
                'phone': registrationData.phoneNumber
            }
        };

        const formData = new FormData();
        formData.append('jsonFormData', JSON.stringify(requestData));

        try {
            await this.httpService.makeMultiPartRequest(
                environment.organizationServiceURL,
                'organizations',
                HttpRequestMethods.POST,
                formData
            );
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
