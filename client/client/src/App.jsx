
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";


// import Login from "./pages/auth/Login";
// import Dashboard from "./pages/dashboard/Dashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import CreateRequest from "./pages/requests/CreateRequest";
// import MyRequests from "./pages/requests/MyRequests";
// import Members from "./pages/members/Members";
// import AddMember from "./pages/members/AddMember";
// import MemberProfile from "./pages/members/MemberProfile";
// import EditMember from "./pages/members/EditMember";
// import Assets from "./pages/assets/Assets";
// import AddAsset from "./pages/assets/AddAsset";
// import AssetProfile from "./pages/assets/AssetProfile";
// import EditAsset from "./pages/assets/EditAsset";
// import Profile from "./pages/profile/Profile";
// import Departments from "./pages/departments/Departments";
// import AddDepartment from "./pages/departments/AddDepartment";
// import EditDepartment from "./pages/departments/EditDepartment";
// import DepartmentProfile from "./pages/departments/DepartmentProfile";
// import DepartmentRequests from "./pages/departments/DepartmentRequests";
// import GlobalSearch from "./components/search/GlobalSearch";
// import Statistics from "./pages/Statistics";
// function App(){

// return (

// <BrowserRouter>

// <Routes>


// <Route 
// path="/"
// element={
// <Navigate to="/login"/>
// }
// />


// <Route
// path="/login"
// element={<Login/>}
// />



// <Route
// path="/dashboard"
// element={
// <ProtectedRoute>
// <Dashboard/>
// </ProtectedRoute>
// }
// />

// <Route
// path="/requests/create"
// element={
// <ProtectedRoute>
// <CreateRequest/>
// </ProtectedRoute>
// }
// />
// <Route
//   path="/requests"
//   element={
//     <ProtectedRoute>
//       <MyRequests />
//     </ProtectedRoute>
//   }
// />
// <Route
//     path="/members"
//     element={
//         <ProtectedRoute>
//             <Members />
//         </ProtectedRoute>
//     }
// />
// <Route
// path="/members/add"
// element={
// <ProtectedRoute>
// <AddMember/>
// </ProtectedRoute>
// }
// />
// <Route
// path="/members/:id"
// element={
// <ProtectedRoute>
// <MemberProfile/>
// </ProtectedRoute>
// }
// />



// <Route
// path="/members/edit/:id"
// element={
// <ProtectedRoute>
// <EditMember/>
// </ProtectedRoute>
// }
// />
// <Route
// path="/assets"
// element={
// <ProtectedRoute>
// <Assets/>
// </ProtectedRoute>
// }
// />
// <Route
// path="/assets/add"
// element={
// <ProtectedRoute>
// <AddAsset/>
// </ProtectedRoute>
// }
// />



//  <Route
// path="/assets/:id"
// element={
// <ProtectedRoute>
// <AssetProfile/>
// </ProtectedRoute>
// }
// />


// <Route
// path="/assets/edit/:id"
// element={
// <ProtectedRoute>
// <EditAsset/>
// </ProtectedRoute>
// }
// />
// <Route

// path="/profile"

// element={

// <ProtectedRoute>

// <Profile/>

// </ProtectedRoute>

// }

// />
// <Route
//   path="/departments"
//   element={
//     <ProtectedRoute>
//       <Departments />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/departments/add"
//   element={
//     <ProtectedRoute>
//       <AddDepartment />
//     </ProtectedRoute>
//   }
// />
// <Route
//  path="/departments/edit/:id"
//  element={
//    <ProtectedRoute>
//      <EditDepartment />
//    </ProtectedRoute>
//  }
// />
// <Route

// path="/departments/:id"

// element={<DepartmentProfile/>}

// />
// <Route

// path="/department/requests"

// element={<DepartmentRequests/>}

// />

// <Route
// path="/search"
// element={<GlobalSearch/>}
// />
// <Route

// path="/statistics"

// element={<Statistics/>}

// />
// </Routes>


// </BrowserRouter>

// );

// }


// export default App;
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// AUTH PAGES
import Home from "./pages/auth/Home";
import Login from "./pages/auth/Login";


// PROTECTED
import ProtectedRoute from "./routes/ProtectedRoute";


// DASHBOARD
import Dashboard from "./pages/dashboard/Dashboard";


// REQUESTS
import CreateRequest from "./pages/requests/CreateRequest";
import MyRequests from "./pages/requests/MyRequests";


// MEMBERS
import Members from "./pages/members/Members";
import AddMember from "./pages/members/AddMember";
import MemberProfile from "./pages/members/MemberProfile";
import EditMember from "./pages/members/EditMember";


// ASSETS
import Assets from "./pages/assets/Assets";
import AddAsset from "./pages/assets/AddAsset";
import AssetProfile from "./pages/assets/AssetProfile";
import EditAsset from "./pages/assets/EditAsset";


// PROFILE
import Profile from "./pages/profile/Profile";


// DEPARTMENTS
import Departments from "./pages/departments/Departments";
import AddDepartment from "./pages/departments/AddDepartment";
import EditDepartment from "./pages/departments/EditDepartment";
import DepartmentProfile from "./pages/departments/DepartmentProfile";
import DepartmentRequests from "./pages/departments/DepartmentRequests";


// OTHER
import GlobalSearch from "./components/search/GlobalSearch";
import Statistics from "./pages/Statistics";



function App(){


return (

<BrowserRouter>


<Routes>



{/* PUBLIC HOME PAGE */}

<Route

path="/"

element={<Home/>}

/>




{/* LOGIN */}

<Route

path="/login"

element={<Login/>}

/>






{/* DASHBOARD */}

<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>





{/* REQUESTS */}

<Route

path="/requests/create"

element={

<ProtectedRoute>

<CreateRequest/>

</ProtectedRoute>

}

/>



<Route

path="/requests"

element={

<ProtectedRoute>

<MyRequests/>

</ProtectedRoute>

}

/>






{/* MEMBERS */}


<Route

path="/members"

element={

<ProtectedRoute>

<Members/>

</ProtectedRoute>

}

/>



<Route

path="/members/add"

element={

<ProtectedRoute>

<AddMember/>

</ProtectedRoute>

}

/>



<Route

path="/members/:id"

element={

<ProtectedRoute>

<MemberProfile/>

</ProtectedRoute>

}

/>



<Route

path="/members/edit/:id"

element={

<ProtectedRoute>

<EditMember/>

</ProtectedRoute>

}

/>






{/* ASSETS */}


<Route

path="/assets"

element={

<ProtectedRoute>

<Assets/>

</ProtectedRoute>

}

/>



<Route

path="/assets/add"

element={

<ProtectedRoute>

<AddAsset/>

</ProtectedRoute>

}

/>



<Route

path="/assets/:id"

element={

<ProtectedRoute>

<AssetProfile/>

</ProtectedRoute>

}

/>



<Route

path="/assets/edit/:id"

element={

<ProtectedRoute>

<EditAsset/>

</ProtectedRoute>

}

/>






{/* PROFILE */}

<Route

path="/profile"

element={

<ProtectedRoute>

<Profile/>

</ProtectedRoute>

}

/>






{/* DEPARTMENTS */}


<Route

path="/departments"

element={

<ProtectedRoute>

<Departments/>

</ProtectedRoute>

}

/>



<Route

path="/departments/add"

element={

<ProtectedRoute>

<AddDepartment/>

</ProtectedRoute>

}

/>



<Route

path="/departments/edit/:id"

element={

<ProtectedRoute>

<EditDepartment/>

</ProtectedRoute>

}

/>



<Route

path="/departments/:id"

element={

<ProtectedRoute>

<DepartmentProfile/>

</ProtectedRoute>

}

/>




<Route

path="/department/requests"

element={

<ProtectedRoute>

<DepartmentRequests/>

</ProtectedRoute>

}

/>






{/* SEARCH */}

<Route

path="/search"

element={

<ProtectedRoute>

<GlobalSearch/>

</ProtectedRoute>

}

/>






{/* STATISTICS */}

<Route

path="/statistics"

element={

<ProtectedRoute>

<Statistics/>

</ProtectedRoute>

}

/>





</Routes>


</BrowserRouter>


);


}


export default App;