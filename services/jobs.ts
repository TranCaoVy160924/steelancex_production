import axiosInstance from "../connectionConfigs/axiosInstance";
import config from "../connectionConfigs/config.json";
const baseUrl = config.api.base + config.api.job;

const getOpenJob = async (filter: JobFilter) => {
   let url = `${baseUrl}/GetOpenJobs()?`
   if (filter.offerFrom !== 0) {
      url += `&$filter=Offer ge ${filter.offerFrom}`
   }

   if (filter.offerTo !== 0) {
      url += `${!url.includes('filter') ? '&$filter=' : ' and '}Offer le ${filter.offerTo}`
   }

   if (filter.categories.length > 0) {
      url += `${!url.includes('filter') ? '&$filter=' : ' and '}Categories/any(item:item eq ${filter.categories[0]}`;
      for (let i = 1; i < filter.categories.length; i++) {
         url += `or item eq ${filter.categories[i]}`
      }
      url += ")"
   }

   url += `&$skip=${filter.skip}&$count=true`;
   const response = await axiosInstance.get(url);
   return response.data;
};

const getJobByBusiness = async (businessName: string) => {
   let url = `${baseUrl}/GetOpenJobs()?$filter=BusinessName eq '${businessName}'`

   const response = await axiosInstance.get(url);
   return response.data;
}

const getCount = async () => {
   const url = `${baseUrl}/$count`;
   const response = await axiosInstance.get(url);
   return response.data;
}

const getDetail = async (id: number) => {
   const url = `${baseUrl}/${id}`;
   const response = await axiosInstance.get(url);
   return response.data;
}

export interface JobFilter {
   skip: number,
   offerFrom?: number,
   offerTo?: number,
   categories: number[]
}

const exportObject: any = {
   getOpenJob,
   getCount,
   getDetail,
   getJobByBusiness
};

export default exportObject;