
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import { getDashboard } from "../../services/dashboardService";


function Dashboard() {

  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadDashboard();

  }, []);




  const loadDashboard = async () => {

    try {

      const data = await getDashboard();

      console.log("Dashboard Data:", data);

      setDashboard(data);


    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };





  const cards = [

    {
      title: "Employees",
      value: dashboard?.statistics?.users ?? 0,
      color: "#2563eb",
    },


    {
      title: "Resources",
      value: dashboard?.statistics?.resources ?? 0,
      color: "#16a34a",
    },


    {
      title: "Work Requests",
      value: dashboard?.statistics?.requests ?? 0,
      color: "#ea580c",
    },


    {
      title: "Pending",
      value: dashboard?.statistics?.pending ?? 0,
      color: "#dc2626",
    },

  ];






  return (

    <DashboardLayout>


      <div style={styles.header}>

        <div>

          <h1 style={{margin:0}}>

            Welcome, {user?.first_name}

          </h1>


          <p style={styles.subtitle}>

            NexusHub Office Operations Management Portal

          </p>


        </div>


      </div>





      {
        loading ?

        (

          <h2>
            Loading dashboard...
          </h2>

        )

        :

        (

          <>


          {/* STATISTIC CARDS */}

          <div style={styles.grid}>


            {
              cards.map((card)=>(


                <div

                  key={card.title}

                  style={{
                    ...styles.card,
                    borderTop:`5px solid ${card.color}`
                  }}

                >


                  <h3>
                    {card.title}
                  </h3>


                  <h1>
                    {card.value}
                  </h1>



                </div>


              ))
            }



          </div>







          <div style={styles.bottomGrid}>



            {/* QUICK ACTIONS */}

            <div style={styles.panel}>


              <h2>
                Quick Actions
              </h2>



              <div style={styles.buttons}>


                <Link

                  to="/requests/create"

                  style={styles.button}

                >

                  ➕ Create Request

                </Link>





                <Link

                  to="/requests"

                  style={styles.button}

                >

                  📋 My Requests

                </Link>





                <Link

                  to="/members"

                  style={styles.button}

                >

                  👥 Members

                </Link>



              </div>



            </div>







            {/* RECENT ACTIVITY */}

            <div style={styles.panel}>


              <h2>
                Recent Activity
              </h2>




              {
                dashboard?.activities?.length === 0 ?


                (

                  <p>
                    No recent activities.
                  </p>


                )

                :

                (


                  <ul style={styles.list}>


                    {

                      dashboard.activities.map(
                        (activity,index)=>(


                          // <li key={index}>
<li
  key={index}
  style={styles.activityItem}
>

                            <strong>
                              {activity.action}
                            </strong>


                            <br/>


                            <small>
                              {activity.created_at}
                            </small>



                          </li>


                        )

                      )

                    }



                  </ul>


                )

              }




            </div>





          </div>



          </>

        )

      }




    </DashboardLayout>


  );


}








const styles = {



  header:{

    marginBottom:30,

  },



  subtitle:{

    color:"#64748b",

  },




  grid:{


    display:"grid",

    gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

    gap:20,

    marginBottom:30,


  },





  card:{


    background:"#fff",

    padding:25,

    borderRadius:15,

    boxShadow:
    "0 10px 20px rgba(0,0,0,.08)",


  },






  // bottomGrid:{


  //   display:"grid",

  //   gridTemplateColumns:
  //   "2fr 1fr",

  //   gap:20,


  // },

bottomGrid: {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 20,
  alignItems: "stretch",
},




  // panel:{


  //   background:"#fff",

  //   padding:25,

  //   borderRadius:15,

  //   boxShadow:
  //   "0 10px 20px rgba(0,0,0,.08)",


  // },
  panel: {
  background: "#fff",
  padding: 25,
  borderRadius: 15,
  boxShadow: "0 10px 20px rgba(0,0,0,.08)",
  display: "flex",
  flexDirection: "column",
  minHeight: 420,
},






  buttons:{


    display:"flex",

    gap:15,

    marginTop:20,

    flexWrap:"wrap",


  },







  button:{


    flex:"1",

    minWidth:"180px",

    textAlign:"center",

    padding:"12px 20px",

    background:"#2563eb",

    color:"#fff",

    borderRadius:10,

    textDecoration:"none",

    fontWeight:"bold",


  },







  // list:{


  //   lineHeight:"2",

  // },
list: {
  listStyle: "none",
  margin: "15px 0 0",
  padding: 0,
  overflowY: "auto",
  maxHeight: 320,
},
activityItem: {
  padding: "12px 0",
  borderBottom: "1px solid #e2e8f0",
},



};





export default Dashboard;