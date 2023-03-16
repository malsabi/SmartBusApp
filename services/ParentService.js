import HttpClientService from './HttpClientService';

class ParentService
{
    async getParentChildren(authToken, parentID)
    {
        return HttpClientService.getAsync('/Parent/{0}', authToken, parentID);
    }
}

export default new ParentService();