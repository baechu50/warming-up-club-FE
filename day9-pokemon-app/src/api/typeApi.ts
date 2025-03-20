import axiosClient from './axiosClient';

export const getType = async (typeName: string) => {
  return async () => {
    const response = await axiosClient.get(`type/${typeName}`);
    return response.data;
  };
};
