import { SCHEME } from "../consts/ApiConsts";
import { BASE_URL } from "../consts/ApiConsts";
import HttpResponseModel from "../models/HttpResponseModel";

class HttpClientService
{
    /**
     * @returns {HttpResponseModel}
    */
    async getAsync(endpoint, token = "", ...args)
    {
        try
        {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            if (token)
            {
                headers.append('Authorization', `${SCHEME} ${token}`);
            }
            const response = await fetch(BASE_URL + endpoint.replace(/\{(\d+)\}/g, (_, index) => args[index]),
                {
                    method: 'GET',
                    headers
                });
            const responseData = await response.json();
            if (response.ok)
            {
                return new HttpResponseModel(true, responseData, null);
            }
            return new HttpResponseModel(false, null, responseData);
        }
        catch (error)
        {
            console.log(error);
            return null;
        }
    }

    /**
     * @returns {HttpResponseModel}
    */
    async postAsync(data, endpoint, token = "")
    {
        try
        {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            if (token)
            {
                headers.append('Authorization', `${SCHEME} ${token}`);
            }
            const response = await fetch(BASE_URL + endpoint,
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(data),
                });
            const responseData = await response.json();
            if (response.ok)
            {
                return new HttpResponseModel(true, responseData, null);
            }
            return new HttpResponseModel(false, null, responseData);
        }
        catch (error)
        {
            return null;
        }
    }
}

export default new HttpClientService();