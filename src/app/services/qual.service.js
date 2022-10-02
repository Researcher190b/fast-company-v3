import httpService from "./http.service";

const qualEndpoint = "quality/";

const qualitiesService = {
    get: async () => {
        const { data } = await httpService.get(qualEndpoint);
        return data;
    }
};
export default qualitiesService;
