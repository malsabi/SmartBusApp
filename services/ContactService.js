import HttpClientService from './HttpClientService';

class ContactService
{
    async postMessage(contactDto, authToken)
    {
        return HttpClientService.postAsync(contactDto, '/ContactUs/post-message', authToken);
    }
}

export default new ContactService();