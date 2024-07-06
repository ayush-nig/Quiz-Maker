import axios from "axios";

export const api=axios.create({
    baseURL : "http://localhost:8080/api/quizzes"
})

export const createquestion = async(quizquestion) =>{
    try {
        const response = await api.post("/create-new-question", quizquestion);
        return ((response).data);
    } catch (error) {
        console.error(error);
    }
}

export const getallquestions = async() => {
    try {
        const response = await api.get("/all-questions");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchquizforuser = async(number, subject) => {
    try {
        const response = await api.get(
            `/quiz/fetch-questions-for-user?numberofquestions=${number}&Subject=${subject}`
        );
        return response.data;
    } catch (error) {
        console.log(error); 
        return [];  
    }
}

export const getallsubjects = async() => {
    try {
        const response = await api.get("/subjects");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updatequestion = async(id, question) => {
    try {
        const response = await api.put(`/quiz/${id}/update`, question);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getquestionbyid = async(id) => {
    try {
        const response = await api.get(`/question/${id}`);
        return response.data;
    } catch (error) {
       console.log(error); 
    }
}

export const deletequestion = async(id) => {
    try {
        const response = await  api.delete(`/question/${id}/delete`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}