import HttpClientService from './HttpClientService';

class TripService
{
    async getStudentBusLocation(authToken, parentID)
    {
        return HttpClientService.getAsync('/Trip/get-student-bus-location?parentID={0}', authToken, parentID);
    }
}

export default new TripService();