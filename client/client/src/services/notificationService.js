import API from "../api/axios";


// ======================================
// GET MY NOTIFICATIONS
// ======================================

export async function getNotifications(){

    const response = await API.get(
        "/notifications"
    );

    return response.data;

}



// ======================================
// MARK AS READ
// ======================================

export async function markAsRead(id){

    const response = await API.put(
        `/notifications/${id}/read`
    );

    return response.data;

}



// ======================================
// MARK ALL AS READ
// ======================================

export async function markAllRead(){

    const response = await API.put(
        "/notifications/read-all"
    );

    return response.data;

}



// ======================================
// DELETE NOTIFICATION
// ======================================

export async function deleteNotification(id){

    const response = await API.delete(
        `/notifications/${id}`
    );

    return response.data;

}