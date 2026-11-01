import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../Services/jobServices";

export const useJobs = () => {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: fetchJobs
    });
};