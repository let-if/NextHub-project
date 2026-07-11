import CreateRequest from "../pages/requests/CreateRequest";
<Route

path="/requests/create"

element={

<ProtectedRoute>

<CreateRequest/>

</ProtectedRoute>

}

/>