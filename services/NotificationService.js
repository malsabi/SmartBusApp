import HttpClientService from './HttpClientService';

class NotificationService
{
    async getNotifications(authToken, id)
    {
        return HttpClientService.getAsync('/Notification?id={0}', authToken, id);
    }

    async getNotificationsStartFrom(authToken, value, id)
    {
        return HttpClientService.getAsync('/Notification/start-from?value={0}&id={1}', authToken, value, id);
    }
}

export default new NotificationService();