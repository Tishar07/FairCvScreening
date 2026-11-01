import api from "../API/axios";

export const fetchJobs = async () => {
    try {
        const response = await api.get("/jobs/list_jobs");
        return response.data;
    } catch (error) {
        console.warn("Could not fetch jobs from server:", error?.message || error);
        return [
            {
                id: 0,
                title: "No Jobs Found",
                description: "No job openings are currently available matching your search criteria.",
                location: "",
                level: "",
                numOpenings: 0,
                experienceRequired: 0,
                department: "",
                status: "NO_RESULTS"
            }
        ];
    }
};