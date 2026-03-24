import { appointmentList, departmentwiseDoctor } from "@/redux/slice/doctorSlice"

export const endpoints ={
    auth:{
        signIn:`/admin/auth/login`,
        logOut:`/admin/logout`,
    },
    doctor:{
        department:`/admin/doctor/department`,
        departmentList:`/admin/departments/list`,
        doctorCreate:`/admin/doctor/create`,
        doctorList:`/admin/doctor/list`,
        doctorEdit:`/admin/doctor/update`,
        doctorDelete:`/admin/doctor/delete`,
        departmentDelete:`/admin/department/delete`,
        appointmentList:`/admin/doctor/appointment/list`,
        appointmentConfirm:`/admin/doctor/appointment/:id`,
        appointmentCancel:`/admin/doctor/appointment/cancelld/:id`,
        acceptedAppointment:`/admin/appointment/acceptedlist`
    },

    location:{
        createLocation:`/admin/diagnostic/create`
    }

    

}

export const points=[
    endpoints.auth.signIn,
    endpoints.doctor.department,
    endpoints.doctor.departmentList,
    endpoints.doctor.doctorCreate,
    endpoints.doctor.doctorList,
    endpoints.doctor.doctorEdit,
    endpoints.doctor.doctorDelete,
    endpoints.auth.logOut,
    endpoints.doctor.departmentDelete,
    endpoints.doctor.appointmentList,
    endpoints.doctor.appointmentConfirm,
    endpoints.doctor.appointmentCancel,
    endpoints.doctor.acceptedAppointment,
    endpoints.location.createLocation
]

