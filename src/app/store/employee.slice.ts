import { Employee } from "../models/employee.model";

export interface EmployeeSlice {
    readonly employees: Employee[],
    readonly isLoading: boolean,
    currentPage: number;
    pageSize: number;
    searchTerm: string;
}

export const initialEmployeeSlice: EmployeeSlice = {
    employees: [],
    isLoading: false,
    currentPage: 1,
    pageSize: 5,
    searchTerm: ''
}