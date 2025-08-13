import { signalStore, withComputed, withHooks, withMethods, withState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { initialEmployeeSlice } from './employee.slice';
import { computed, inject } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

export const EmployeeStore = signalStore(
    {
        providedIn: 'root'
    },
    withState(initialEmployeeSlice),
    withComputed((store) => ({
        // compute total pages
        totalPages: computed(() => Math.ceil(store.employees().length / store.pageSize())),

        // compute filtered and paginated employees
        employeesFilterAndPaginated: computed(() => {
            const searchTerm = store.searchTerm().toLowerCase();
            let filteredEmployees = store.employees();

            if (searchTerm) {
                filteredEmployees = filteredEmployees.filter(employee =>
                    employee.name.toLowerCase().includes(searchTerm) ||
                    employee.department.toLowerCase().includes(searchTerm)
                )
            }

            const startIndex = (store.currentPage() - 1) * store.pageSize();
            const endIndex = startIndex + store.pageSize();
            return filteredEmployees.slice(startIndex, endIndex);
        })
    })),
    withMethods((store, employeeService = inject(EmployeeService)) => ({
        loadEmployees: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() => employeeService.getEmployees()),
                tap((employees) => patchState(store, { employees, isLoading: false }))
            )
        ),

        createEmployee: rxMethod<Employee>(
            pipe(
                switchMap((employee) => employeeService.createEmployee(employee)),
                tap((newEmployee) => patchState(store, (state) => ({ employees: [...state.employees, newEmployee] }))
                )
            )
        ),

        updateEmployee: rxMethod<Employee>(
            pipe(
                switchMap((employee) => employeeService.updatedEmployee(employee)),
                tap((updateEmployee) =>
                    patchState(store, (state) => ({
                        employees: state.employees.map((emp) =>
                            emp.id === updateEmployee.id ? updateEmployee : emp
                        )
                    }))
                )
            )
        ),

        deleteEmployee: rxMethod<number>(
            pipe(
                switchMap((id) => employeeService.deleteEmployee(id)),
                tap((deleteEmployeeId) =>
                    patchState(store, (state) => ({
                        employees: state.employees.filter((emp) => deleteEmployeeId !== emp.id)
                    }))
                )
            )
        ),

        // Pagination methods
        setPage: rxMethod<number>(
            pipe(
                tap((page) => patchState(store, { currentPage: page }))
            )
        ),

        setPageSize: rxMethod<number>(
            pipe(
                tap((pageSize) => patchState(store, { pageSize, currentPage: 1 })) // Reset to first page
            )
        ),

        setSearchTerm: rxMethod<string>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap((searchTerm) => patchState(store, { searchTerm })),
                tap(() => patchState(store, { currentPage: 1 }))// Reset to first page
            )
        )
    })),
    // withHooks(store => ({

    // }))
)