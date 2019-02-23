import { AppError } from '../models/app-error';

export class HttpError {

    static get BAD_REQUEST(): AppError {
        return new AppError('ERR_BAD_REQUEST', 'Bad Request');
    }

    static get UNAUTHORIZED(): AppError {
        return new AppError('ERR_UNAUTHORIZED', 'Unauthorized Request');
    }

    static get FORBIDDEN(): AppError {
        return new AppError('ERR_FORBIDDEN', 'Forbidden Request');
    }

    static get NOT_FOUND(): AppError {
        return new AppError('ERR_RESOURCE_NOT_FOUND', 'Resource Not Found');
    }

    static get REQUEST_TIMEOUT(): AppError {
        return new AppError('ERR_REQUEST_TIME_OUT', 'Request Time Out');
    }

    static get INTERNAL_SERVER_ERROR(): AppError {
        return new AppError('eRR_INTERNAL_SERVER_ERROR', 'Internal Server Error');
    }

    static get BAD_GATEWAY(): AppError {
        return new AppError('ERR_BAD_GATEWAY', 'Bad Gateway');
    }

    static get SERVICE_UNAVAILABLE(): AppError {
        return new AppError('ERR_SERVICE_UNAVAILABLE', 'Service Unavailable');
    }

    static get GATEWAY_TIMEOUT(): AppError {
        return new AppError('ERR_GATEWAY_TIMEOUT', 'Gateway Timeout');
    }

    static get BACK_END_ERROR(): AppError {
        return new AppError('ERR_BACK_END_ERROR', 'Error while contacting the Server');
    }
}
