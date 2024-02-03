"use server"

import { connectToDB } from "../mongoose"

export const createClass = async (state: any, formData: FormData) => {
    connectToDB();
    

}