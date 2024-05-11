import { type Image} from "../types";
const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";

export const getImageById = async (id: number | undefined, token : any) => {
   const response = await fetch(`${apiUrl}images/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const image = (await response.json());
    return image.images as Image;
}

