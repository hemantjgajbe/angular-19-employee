# Creating a signal store

1. Create a `/store` folder and in it a `employee.slice.ts` file
   - Define an interface with the correct **Core State**
   - Define a constant with the initial value of the sate
2. Create a `employee.store.ts` file
   - Define a constant, and call the `signalStore` function
   - Use the `withState` function to add a state feature with the slice you have defined
   - Add configuration so that the store is provided in root
3. Consume the store into the app component
    - Inject the store using the `inject` function
    - Display the questions in the template
4. Features implemented - List, Add, Edit, Delete, Pagination with next previous and page option selection

# Dynamic component

For Add and Edit Employee details created Dynamic modal having employee form as content

# Syntax Related changes since Angular 16 implemented are

1. CanActivate route 
2. Control flow using if and for loop

# For creating user third party api end point use - https://api.freeprojectapi.com/api/UserApp/CreateNewUser
   