
// import { useEffect, useState } from "react";
// import API from "../api/axios";


// function Statistics() {


//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);



//   useEffect(() => {


//     const fetchStatistics = async () => {


//       try {


//         const response = await API.get(
//           "/statistics"
//         );


//         setStats(
//           response.data.statistics
//         );


//       } catch (error) {


//         console.log(
//           "Statistics Error:",
//           error
//         );


//       } finally {


//         setLoading(false);


//       }


//     };


//     fetchStatistics();


//   }, []);





//   if (loading) {


//     return (

//       <div style={styles.loading}>

//         Loading statistics...

//       </div>

//     );


//   }





//   if (!stats) {


//     return (

//       <div style={styles.loading}>

//         No statistics available

//       </div>

//     );


//   }





//   return (

//     <div>


//       <h1 style={styles.title}>
//         System Statistics
//       </h1>



//       <div style={styles.grid}>


//         <div style={styles.card}>

//           <h3>
//             Members By Department
//           </h3>


//           {
//             stats.membersByDepartment?.map(
//               (item)=>(
                
//                 <div
//                   key={item.department_name}
//                   style={styles.row}
//                 >

//                   <span>
//                     {item.department_name}
//                   </span>


//                   <strong>
//                     {item.total}
//                   </strong>

//                 </div>

//               )
//             )
//           }


//         </div>





//         <div style={styles.card}>

//           <h3>
//             Requests By Status
//           </h3>


//           {
//             stats.requestsByStatus?.map(
//               (item)=>(

//                 <div
//                   key={item.status}
//                   style={styles.row}
//                 >

//                   <span>
//                     {item.status}
//                   </span>


//                   <strong>
//                     {item.total}
//                   </strong>


//                 </div>

//               )
//             )
//           }


//         </div>





//         <div style={styles.card}>

//           <h3>
//             Resources By Category
//           </h3>


//           {
//             stats.resourcesByCategory?.map(
//               (item)=>(

//                 <div
//                   key={item.category}
//                   style={styles.row}
//                 >

//                   <span>
//                     {item.category}
//                   </span>


//                   <strong>
//                     {item.total}
//                   </strong>


//                 </div>

//               )
//             )
//           }


//         </div>





//         <div style={styles.card}>

//           <h3>
//             Members Status
//           </h3>


//           {
//             stats.membersStatus?.map(
//               (item)=>(

//                 <div
//                   key={item.status}
//                   style={styles.row}
//                 >

//                   <span>
//                     {item.status}
//                   </span>


//                   <strong>
//                     {item.total}
//                   </strong>


//                 </div>

//               )
//             )
//           }


//         </div>


//       </div>


//     </div>

//   );


// }




// const styles = {


//   title: {

//     marginBottom:30,

//     fontSize:28,

//     fontWeight:700,

//     color:"#0f172a"

//   },


//   grid:{


//     display:"grid",

//     gridTemplateColumns:
//     "repeat(auto-fit,minmax(300px,1fr))",

//     gap:25


//   },



//   card:{


//     background:"#ffffff",

//     borderRadius:16,

//     padding:25,

//     boxShadow:
//     "0 8px 25px rgba(0,0,0,0.08)"


//   },



//   row:{


//     display:"flex",

//     justifyContent:"space-between",

//     padding:"12px 0",

//     borderBottom:
//     "1px solid #e2e8f0",

//     color:"#334155"


//   },



//   loading:{


//     padding:40,

//     fontSize:20,

//     color:"#475569"


//   }



// };



// export default Statistics;
import { useEffect, useState } from "react";
import API from "../api/axios";


function Statistics() {


  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const fetchStatistics = async () => {


      try {


        const response = await API.get(
          "/statistics"
        );


        setStats(
          response.data.statistics
        );


      } catch (error) {


        console.log(
          "Statistics Error:",
          error
        );


      } finally {


        setLoading(false);


      }


    };


    fetchStatistics();


  }, []);






  if (loading) {


    return (

      <div style={styles.loadingBox}>

        <div style={styles.spinner}></div>

        <p>
          Loading statistics...
        </p>

      </div>

    );

  }







  if (!stats) {


    return (

      <div style={styles.emptyBox}>

        <h3>
          No statistics available
        </h3>

        <p>
          Statistics data will appear when the system contains records.
        </p>

      </div>

    );

  }






  return (

    <div style={styles.container}>


      <div style={styles.header}>

        <div>

          <h1 style={styles.title}>
            System Statistics
          </h1>


          <p style={styles.subtitle}>
            Overview of NexusHub management activities
          </p>

        </div>


      </div>






      <div style={styles.grid}>


        {/* MEMBERS DEPARTMENT */}

        <div style={styles.card}>


          <div style={styles.cardHeader}>

            <div style={styles.iconBlue}>
              👥
            </div>


            <h3>
              Members By Department
            </h3>

          </div>




          {
            stats.membersByDepartment?.length > 0 ?

            stats.membersByDepartment.map(
              (item)=>(

                <div
                  key={item.department_name}
                  style={styles.row}
                >

                  <span>
                    {item.department_name}
                  </span>


                  <strong>
                    {item.total}
                  </strong>


                </div>

              )

            )

            :

            <p style={styles.noData}>
              No members available
            </p>
          }



        </div>







        {/* REQUEST STATUS */}


        <div style={styles.card}>


          <div style={styles.cardHeader}>

            <div style={styles.iconGreen}>
              📋
            </div>


            <h3>
              Requests By Status
            </h3>

          </div>




          {
            stats.requestsByStatus?.length > 0 ?

            stats.requestsByStatus.map(
              (item)=>(

                <div
                  key={item.status}
                  style={styles.row}
                >

                  <span>
                    {item.status}
                  </span>


                  <strong>
                    {item.total}
                  </strong>


                </div>

              )

            )

            :

            <p style={styles.noData}>
              No requests available
            </p>

          }



        </div>









        {/* RESOURCES / ASSETS */}


        <div style={styles.card}>


          <div style={styles.cardHeader}>

            <div style={styles.iconPurple}>
              💻
            </div>


            <h3>
              Resources By Category
            </h3>

          </div>





          {
            stats.resourcesByCategory?.length > 0 ?

            stats.resourcesByCategory.map(
              (item)=>(


                <div

                  key={item.category}

                  style={styles.row}

                >

                  <span>
                    {item.category}
                  </span>


                  <strong>
                    {item.total}
                  </strong>


                </div>


              )

            )

            :

            <p style={styles.noData}>
              No resources available
            </p>

          }





        </div>









        {/* MEMBERS STATUS */}


        <div style={styles.card}>


          <div style={styles.cardHeader}>


            <div style={styles.iconOrange}>
              🔐
            </div>


            <h3>
              Members Status
            </h3>


          </div>





          {
            stats.membersStatus?.length > 0 ?

            stats.membersStatus.map(
              (item)=>(


                <div

                  key={item.status}

                  style={styles.row}

                >


                  <span>
                    {item.status}
                  </span>


                  <strong>
                    {item.total}
                  </strong>


                </div>


              )

            )

            :

            <p style={styles.noData}>
              No member status available
            </p>

          }




        </div>





      </div>


    </div>

  );

}





const styles = {


container:{

width:"100%"

},



header:{


marginBottom:35


},




title:{


margin:0,

fontSize:32,

fontWeight:800,

color:"#0f172a"


},



subtitle:{


marginTop:8,

fontSize:15,

color:"#64748b"


},






grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(320px,1fr))",

gap:25


},






card:{


background:"#ffffff",

borderRadius:18,

padding:25,

boxShadow:
"0 10px 30px rgba(15,23,42,0.08)",

border:
"1px solid #e2e8f0"


},






cardHeader:{


display:"flex",

alignItems:"center",

gap:14,

marginBottom:20


},






cardHeaderTitle:{


fontSize:18

},





iconBlue:{


width:45,

height:45,

borderRadius:12,

background:"#dbeafe",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:22


},




iconGreen:{


width:45,

height:45,

borderRadius:12,

background:"#dcfce7",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:22


},




iconPurple:{


width:45,

height:45,

borderRadius:12,

background:"#f3e8ff",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:22


},




iconOrange:{


width:45,

height:45,

borderRadius:12,

background:"#ffedd5",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:22


},






row:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"14px 0",

borderBottom:
"1px solid #e2e8f0",

fontSize:15,

color:"#334155"


},





noData:{


color:"#94a3b8",

fontSize:14


},





loadingBox:{


height:300,

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

color:"#475569"


},




spinner:{


width:40,

height:40,

borderRadius:"50%",

border:"4px solid #e2e8f0",

borderTop:
"4px solid #2563eb",

animation:
"spin 1s linear infinite"


},




emptyBox:{


background:"#ffffff",

padding:40,

borderRadius:18,

textAlign:"center",

color:"#64748b",

boxShadow:
"0 10px 30px rgba(0,0,0,.08)"


}



};



export default Statistics;