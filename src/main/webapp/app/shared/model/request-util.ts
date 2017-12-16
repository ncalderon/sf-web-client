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
        urlParams.set('page', req.page);
        urlParams.set('size', req.size);
        /*params['page'] = req.page;
        params['size'] = req.size;*/
        if (req.sort) {
            /*params['sort'] = req.sort;*/
            urlParams.paramsMap.set('sort', req.sort);
        }
        /*params['query'] = req.query;*/
        urlParams.set('query', req.query);

        //urlParams.set("pageable", JSON.stringify(params));
        if(criteria){
            criteria["active"]=true;
            urlParams.set("criteria", JSON.stringify(criteria) + "");
        }
        else
            //urlParams.set("criteria", JSON.stringify({"active": false, "startDate":"", "endDate":"","desc":"","startAmount":"","endAmount":""}));
            urlParams.set("criteria", JSON.stringify({"active": false}));
        options.params = urlParams;
    }
    return options;
};
