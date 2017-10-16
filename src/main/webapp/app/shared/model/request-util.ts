import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        params.set('query', req.query);

        options.params = params;
    }
    return options;
};

export const createQueryRequestOption = (req?: any, criteria?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const urlParams: URLSearchParams = new URLSearchParams();
        const params = {};
        params['page'] = req.page;
        params['size'] = req.size;
        if (req.sort) {
            params['sort'] = req.sort;
        }
        params['query'] = req.query;


        urlParams.set("pageable", JSON.stringify(params));
        if(criteria){
            criteria["active"]=true;
            urlParams.set("criteria", JSON.stringify(criteria));
        }
        else
            //urlParams.set("criteria", JSON.stringify({"active": false, "startDate":"", "endDate":"","desc":"","startAmount":"","endAmount":""}));
            urlParams.set("criteria", JSON.stringify({"active": false}));
        options.params = urlParams;
    }
    return options;
};
