import axiosInstance from "../connectionConfigs/axiosInstance";
import config from "../connectionConfigs/config.json";
const baseUrl = config.api.base + config.api.freelancerProfile;

const get = async (filter: FreelancerFilter) => {

   let url = `${baseUrl}?`
   if (filter.priceFrom !== 0) {
      url += `&$filter=Price ge ${filter.priceFrom}`
   }

   if (filter.priceTo !== 0) {
      url += `${!url.includes('filter') ? '&$filter=' : ' and '}Price le ${filter.priceTo}`
   }

   if (filter.categories.length > 0) {
      url += `${!url.includes('filter') ? '&$filter=' : ' and '}Categories/any(item:item eq ${filter.categories[0]}`;
      for (let i = 1; i < filter.categories.length; i++) {
         url += ` or item eq ${filter.categories[i]}`
      }
      url += ")"
   }

   url += `&$skip=${filter.skip}&$count=true`;
   console.log(url);
   const response = await axiosInstance.get(url);
   return response.data;
};

const getCount = async () => {
   const url = `${baseUrl}/$count`;
   const response = await axiosInstance.get(url);
   return response.data;
}

export interface FreelancerFilter {
   skip: number,
   priceFrom?: number,
   priceTo?: number,
   categories: number[]
}

const getDetail = async (id: any) => {
   const url = `${baseUrl}/${id}`;
   const response = await axiosInstance.get(url);
   return response.data;
}

const exportObject = {
   get,
   getCount,
   getDetail
};

export default exportObject;