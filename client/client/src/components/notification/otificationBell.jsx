// import {
//   useEffect,
//   useRef,
//   useState
// } from "react";

// import {
//   useNavigate
// } from "react-router-dom";

// import {

//   getNotifications,

//   markAsRead,

//   markAllRead,

//   deleteNotification

// } from "../../services/notificationService";

// const animationStyle = document.createElement("style");

// animationStyle.innerHTML = `

// @keyframes spin {

// from{
// transform:rotate(0deg);
// }

// to{
// transform:rotate(360deg);
// }

// }


// @keyframes notificationDrop {

// from{

// opacity:0;
// transform:translateY(-10px);

// }

// to{

// opacity:1;
// transform:translateY(0);

// }

// }

// `;

// document.head.appendChild(animationStyle);

// function NotificationBell(){


// const navigate = useNavigate();



// const bellRef = useRef(null);

// const dropdownRef = useRef(null);



// const [notifications,setNotifications] = useState([]);

// const [loading,setLoading] = useState(true);

// const [open,setOpen] = useState(false);

// const [processing,setProcessing] = useState(false);





// // ======================================
// // LOAD NOTIFICATIONS
// // ======================================

// const loadNotifications = async()=>{


// try{


// const result = await getNotifications();


// setNotifications(

// result.notifications || []

// );


// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoading(false);

// }


// };




// // ======================================
// // INITIAL LOAD
// // ======================================

// useEffect(()=>{

// loadNotifications();

// },[]);





// // ======================================
// // AUTO REFRESH
// // ======================================

// useEffect(()=>{


// const interval = setInterval(()=>{

// loadNotifications();

// },15000);


// return()=>clearInterval(interval);


// },[]);





// // ======================================
// // CLOSE WHEN CLICK OUTSIDE
// // ======================================

// useEffect(()=>{


// const handleOutside=(event)=>{


// if(

// dropdownRef.current &&

// !dropdownRef.current.contains(event.target)

// &&

// bellRef.current &&

// !bellRef.current.contains(event.target)

// ){

// setOpen(false);

// }


// };



// document.addEventListener(

// "mousedown",

// handleOutside

// );


// return()=>{


// document.removeEventListener(

// "mousedown",

// handleOutside

// );


// };


// },[]);






// // ======================================
// // UNREAD COUNT
// // ======================================

// const unreadCount = notifications.filter(

// (item)=>!item.is_read

// ).length;






// // ======================================
// // TOGGLE DROPDOWN
// // ======================================

// const toggleDropdown=()=>{

// setOpen(!open);

// };






// // ======================================
// // MARK ONE AS READ
// // ======================================

// const handleRead = async(notification)=>{


// try{


// if(!notification.is_read){

// await markAsRead(notification.id);

// }


// loadNotifications();


// if(notification.request_id){

// navigate(

// `/department-requests?request=${notification.request_id}`

// );

// }


// setOpen(false);


// }
// catch(error){

// console.log(error);

// }


// };






// // ======================================
// // MARK ALL
// // ======================================

// const handleMarkAll = async()=>{


// try{


// setProcessing(true);


// await markAllRead();


// loadNotifications();


// }
// catch(error){

// console.log(error);

// }
// finally{

// setProcessing(false);

// }


// };







// // ======================================
// // DELETE
// // ======================================

// const handleDelete = async(

// event,

// id

// )=>{


// event.stopPropagation();


// try{


// await deleteNotification(id);


// loadNotifications();


// }
// catch(error){

// console.log(error);

// }


// };






// // ======================================
// // RELATIVE TIME
// // ======================================

// const timeAgo=(date)=>{


// const seconds = Math.floor(

// (new Date()-new Date(date))/1000

// );


// const minutes = Math.floor(seconds/60);

// const hours = Math.floor(minutes/60);

// const days = Math.floor(hours/24);



// if(seconds<60){

// return "Just now";

// }


// if(minutes<60){

// return `${minutes} min ago`;

// }


// if(hours<24){

// return `${hours} hr ago`;

// }


// if(days<7){

// return `${days} day ago`;

// }


// return new Date(date).toLocaleDateString();

// };
// // ======================================
// // JSX
// // ======================================

// return(

// <>

// <div style={styles.wrapper}>


// <button

// ref={bellRef}

// style={

// open

// ?

// {

// ...styles.bell,

// ...styles.bellActive

// }

// :

// styles.bell

// }

// onClick={toggleDropdown}

// title="Notifications"

// >


// <span style={styles.bellIcon}>

// 🔔

// </span>



// {

// unreadCount>0 &&

// (

// <div style={styles.badge}>


// {

// unreadCount>99

// ?

// "99+"

// :

// unreadCount

// }


// </div>

// )

// }


// </button>






// {

// open &&

// (


// <div

// ref={dropdownRef}

// style={styles.dropdown}

// >


// {/* ===========================
// HEADER
// =========================== */}



// <div style={styles.header}>


// <div>


// <h3 style={styles.title}>

// Notifications

// </h3>


// <p style={styles.subtitle}>


// {

// unreadCount===0

// ?

// "No unread notifications"

// :

// `${unreadCount} unread notification${unreadCount>1?"s":""}`

// }


// </p>


// </div>





// <button

// style={

// processing

// ?

// {

// ...styles.markAll,

// opacity:.6,

// cursor:"not-allowed"

// }

// :

// styles.markAll

// }

// disabled={

// processing ||

// unreadCount===0

// }

// onClick={handleMarkAll}

// >

// {

// processing

// ?

// "Updating..."

// :

// "Mark all"

// }

// </button>



// </div>






// <div style={styles.divider}></div>





// <div style={styles.body}>


// {

// loading

// ?

// (

// <div style={styles.loadingContainer}>


// <div style={styles.loader}></div>


// <p style={styles.loadingText}>

// Loading notifications...

// </p>


// </div>

// )

// :
// :

// notifications.length===0

// ?

// (

// <div style={styles.empty}>


// <div style={styles.emptyIcon}>

// 📭

// </div>


// <h4 style={styles.emptyTitle}>

// No Notifications

// </h4>


// <p style={styles.emptyText}>

// You don't have any new notifications.

// </p>


// </div>

// )


// :

// (

// <div style={styles.list}>


// {

// notifications.map((notification)=>(


// <div


// key={notification.id}


// style={

// notification.is_read

// ?

// styles.notification

// :

// {

// ...styles.notification,

// ...styles.unreadNotification

// }

// }


// onClick={()=>handleRead(notification)}


// >


// {/* ICON */}


// <div style={

// notification.is_read

// ?

// styles.icon

// :

// styles.iconUnread

// }>


// {

// notification.is_read

// ?

// "📩"

// :

// "🔔"

// }


// </div>







// {/* CONTENT */}


// <div style={styles.content}>


// <div style={styles.notificationHeader}>


// <h4 style={styles.notificationTitle}>

// {notification.title}

// </h4>



// {

// !notification.is_read &&

// <span style={styles.newBadge}>

// NEW

// </span>

// }



// </div>





// <p style={styles.message}>

// {notification.message}

// </p>





// <div style={styles.footer}>


// <span style={styles.time}>

// ⏰ {timeAgo(notification.created_at)}

// </span>





// <button


// style={styles.delete}


// onClick={(e)=>

// handleDelete(

// e,

// notification.id

// )

// }


// title="Delete notification"

// >


// 🗑

// </button>



// </div>




// </div>



// </div>


// ))

// }


// </div>


// )



// }


// </div>


// </div>


// )


// }


// </div>


// </>

// );


// }
// const styles={


// // ======================================
// // MAIN WRAPPER
// // ======================================

// wrapper:{

// position:"relative",

// display:"flex",

// alignItems:"center"

// },



// // ======================================
// // BELL BUTTON
// // ======================================

// bell:{

// position:"relative",

// width:"48px",

// height:"48px",

// borderRadius:"16px",

// border:"1px solid #e2e8f0",

// background:"#ffffff",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// cursor:"pointer",

// fontSize:"22px",

// transition:"all .25s ease",

// boxShadow:
// "0 8px 20px rgba(15,23,42,.08)"

// },



// bellActive:{

// background:"#eff6ff",

// border:
// "1px solid #bfdbfe",

// transform:"translateY(-2px)"

// },



// bellIcon:{

// fontSize:"22px"

// },




// // ======================================
// // UNREAD BADGE
// // ======================================

// badge:{

// position:"absolute",

// top:"-5px",

// right:"-5px",

// minWidth:"22px",

// height:"22px",

// padding:"0 6px",

// borderRadius:"50px",

// background:

// "linear-gradient(135deg,#ef4444,#dc2626)",

// color:"#ffffff",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontSize:"11px",

// fontWeight:"800",

// border:"3px solid #ffffff",

// boxShadow:
// "0 5px 15px rgba(239,68,68,.35)"

// },





// // ======================================
// // DROPDOWN
// // ======================================

// dropdown:{

// position:"absolute",

// top:"60px",

// right:"0",

// width:"420px",

// maxHeight:"600px",

// background:

// "rgba(255,255,255,.96)",

// backdropFilter:

// "blur(18px)",

// borderRadius:"24px",

// border:

// "1px solid #e2e8f0",

// boxShadow:

// "0 25px 70px rgba(15,23,42,.18)",

// overflow:"hidden",

// zIndex:9999,

// animation:

// "notificationSlide .25s ease"

// },




// // ======================================
// // HEADER
// // ======================================

// header:{

// display:"flex",

// justifyContent:"space-between",

// alignItems:"center",

// padding:"22px 24px"

// },



// title:{

// margin:0,

// fontSize:"20px",

// fontWeight:"800",

// color:"#0f172a"

// },



// subtitle:{

// margin:"5px 0 0",

// fontSize:"13px",

// color:"#64748b"

// },




// markAll:{

// border:"none",

// background:

// "#eff6ff",

// color:"#2563eb",

// padding:"8px 14px",

// borderRadius:"12px",

// fontSize:"12px",

// fontWeight:"700",

// cursor:"pointer",

// transition:"all .2s"

// },




// divider:{

// height:"1px",

// background:"#e2e8f0"

// },




// // ======================================
// // BODY
// // ======================================

// body:{

// maxHeight:"500px",

// overflowY:"auto"

// },




// list:{

// display:"flex",

// flexDirection:"column"

// },




// // ======================================
// // NOTIFICATION CARD
// // ======================================

// notification:{

// display:"flex",

// gap:"14px",

// padding:"18px 22px",

// cursor:"pointer",

// borderBottom:

// "1px solid #f1f5f9",

// transition:"all .25s ease",

// background:"#ffffff"

// },




// unreadNotification:{

// background:

// "linear-gradient(90deg,#eff6ff,#ffffff)"

// },




// icon:{

// width:"42px",

// height:"42px",

// borderRadius:"14px",

// background:"#f1f5f9",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontSize:"20px",

// flexShrink:0

// },




// iconUnread:{

// width:"42px",

// height:"42px",

// borderRadius:"14px",

// background:"#dbeafe",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontSize:"20px",

// flexShrink:0

// },




// content:{

// flex:1,

// minWidth:0

// },




// notificationHeader:{

// display:"flex",

// alignItems:"center",

// gap:"8px",

// marginBottom:"6px"

// },




// notificationTitle:{

// margin:0,

// fontSize:"14px",

// fontWeight:"800",

// color:"#0f172a"

// },




// newBadge:{

// background:"#2563eb",

// color:"#ffffff",

// fontSize:"10px",

// fontWeight:"800",

// padding:"3px 7px",

// borderRadius:"20px"

// },




// message:{

// margin:0,

// fontSize:"13px",

// lineHeight:"1.5",

// color:"#475569",

// display:"-webkit-box",

// WebkitLineClamp:2,

// WebkitBoxOrient:"vertical",

// overflow:"hidden"

// },




// footer:{

// display:"flex",

// alignItems:"center",

// justifyContent:"space-between",

// marginTop:"10px"

// },




// time:{

// fontSize:"12px",

// color:"#94a3b8",

// fontWeight:"600"

// },




// delete:{

// border:"none",

// background:"#fee2e2",

// color:"#dc2626",

// width:"28px",

// height:"28px",

// borderRadius:"8px",

// cursor:"pointer",

// display:"flex",

// alignItems:"center",

// justifyContent:"center",

// fontSize:"12px"

// },
// /* ================================
//    LOADING STATE
// ================================ */

// loading:{
//     padding:"25px",
//     textAlign:"center",
//     color:"#64748b",
//     fontSize:"14px",
// },


// spinner:{
//     width:"28px",
//     height:"28px",
//     borderRadius:"50%",
//     border:"3px solid #e2e8f0",
//     borderTop:"3px solid #2563eb",
//     margin:"0 auto 12px",
//     animation:"spin 1s linear infinite"
// },




// /* ================================
//    EMPTY STATE
// ================================ */

// empty:{
//     padding:"35px 20px",
//     textAlign:"center",
//     color:"#64748b"
// },


// emptyIcon:{
//     fontSize:"40px",
//     marginBottom:"10px"
// },


// emptyTitle:{
//     margin:"0",
//     fontSize:"15px",
//     fontWeight:"700",
//     color:"#334155"
// },


// emptyText:{
//     marginTop:"5px",
//     fontSize:"13px"
// },




// /* ================================
//    NOTIFICATION ITEM
// ================================ */

// notificationItem:{
//     display:"flex",
//     gap:"14px",
//     padding:"15px",
//     borderBottom:"1px solid #f1f5f9",
//     cursor:"pointer",
//     transition:"all .25s ease"
// },


// notificationUnread:{
//     background:"#eff6ff"
// },


// notificationIcon:{
//     width:"38px",
//     height:"38px",
//     borderRadius:"50%",
//     background:"#dbeafe",
//     display:"flex",
//     alignItems:"center",
//     justifyContent:"center",
//     fontSize:"18px",
//     flexShrink:0
// },


// notificationContent:{
//     flex:1
// },


// notificationTitle:{
//     margin:0,
//     fontSize:"14px",
//     fontWeight:"800",
//     color:"#0f172a"
// },


// notificationMessage:{
//     margin:"5px 0",
//     fontSize:"13px",
//     color:"#64748b",
//     lineHeight:"1.4"
// },


// notificationDate:{
//     fontSize:"12px",
//     color:"#94a3b8"
// },





// /* ================================
//    RESPONSIVE
// ================================ */

// responsive:{
//     "@media(max-width:768px)":{

//         dropdown:{
//             position:"fixed",
//             right:"15px",
//             left:"15px",
//             width:"auto"
//         }

//     }
// }
// };


// export default NotificationBell;