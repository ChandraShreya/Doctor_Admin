// import axiosInstance from "@/api/axios/axios";
import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "domain";
import { Cookies } from "react-cookie";
import {
    IDoctorState,
    IDoctor,
    IDepartment,
    IAppointment,
    IDepartmentCreatePayload,
    IDoctorCreatePayload,
    IDoctorEditPayload,
    IDoctorListPayload,
    IPaginatedDoctorResponse,
    IAppointmentResponse
} from "@/typescript";


const initialState = {
    loading: false,
    department: null,
    departmentId: null,
    departmentList: [],
    doctorList: [],
    allDoctors: [],
    success: false,
    doctorTotal: 0,
    appointmentList: [],
    appointmentTotal: 0,
    acceptedAppointments: [],
    cancelledAppointments: [],
    totalItems: 0
}

const cookie = new Cookies()
export const departmentCreate = createAsyncThunk(
    "departmentCreate",
    async (payload) => {
        const response = await axiosInstance.post(endpoints.doctor.department, payload)
        console.log("department create",response)
        return response.data
    }

)

export const getDepartmentList = createAsyncThunk(
    "getDepartmentList",
    async () => {
        const response = await axiosInstance.get(endpoints.doctor.departmentList)
        console.log("department list",response)
        return response.data
    }
)

export const departmentDelete = createAsyncThunk<{ id: string }, string>(
    "departmentDelete",
    async (id) => {
        const response = await axiosInstance.post(endpoints.doctor.departmentDelete,
            { id }
        )
        console.log(response)
        return { id }
    }
)
export const doctorCreate = createAsyncThunk<any, IDoctorCreatePayload>(
    "doctorCreate",
    async (payload) => {
        const response = await axiosInstance.post(endpoints.doctor.doctorCreate, payload)
        console.log("doctor create", response)
        return response.data
    }
)

export const doctorList = createAsyncThunk<IPaginatedDoctorResponse, IDoctorListPayload>(
    "doctorList",
    async (payload) => {
        const response = await axiosInstance.get(endpoints.doctor.doctorList,
            { params: payload }
        )
        console.log("doctor list", response)
        return response.data
    }
)

export const getAllDoctors = createAsyncThunk<IDoctor[]>(
    "getAllDoctors",
    async () => {
        const response = await axiosInstance.get(endpoints.doctor.doctorList)
        console.log("all doctors", response)
        return response.data
    }
)

export const doctorEdit = createAsyncThunk<any, IDoctorEditPayload>(
    "doctorEdit",
    async ({ id, data }) => {
        const response = await axiosInstance.post(endpoints.doctor.doctorEdit, {
            id,
            ...data
        }

        )
        console.log(response)
        return response.data
    }
)

export const doctorDelete = createAsyncThunk<{ id: string }, string>(
    "doctorDelete",
    async (id) => {
        const response = await axiosInstance.post(endpoints.doctor.doctorDelete,
            { id }
        )
        console.log(response)
        return { id }
    }
)

export const departmentwiseDoctor = createAsyncThunk(
    "departmentwiseDoctor",
    async (departmentId) => {

        const response = await axiosInstance.get(
            `/admin/departments/${departmentId}/doctors`
        );
        console.log("filter", response)

        return response.data;
    }
);


export const appointmentList = createAsyncThunk<IAppointmentResponse>(
    "appointmentList",
    async () => {
        const response = await axiosInstance.get(endpoints.doctor.appointmentList)
        console.log("appointment", response)
        return response.data
    }
)

export const confirmAppointment = createAsyncThunk(
    "confirmAppointment",
    async (id) => {

        const response = await axiosInstance.put(
            `/admin/doctor/appointment/${id}`
        );

        console.log("confirm appointment", response);

        return { id, data: response.data };
    }
);

export const cancelAppointment = createAsyncThunk(
    "cancelAppointment",
    async (id) => {

        const response = await axiosInstance.put(
            `/admin/doctor/appointment/cancelld/${id}`
        );

        console.log("cancel appointment", response);

        return { id, data: response.data };
    }
);

export const acceptedAppointment = createAsyncThunk(
    "acceptedAppointment",
    async () => {
        const response = await axiosInstance.get(endpoints.doctor.acceptedAppointment)
        console.log("accept appointment", response)
        return response.data
    }
)


export const doctorSlice = createSlice({
    name: "doctorSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            /*department create*/
            .addCase(departmentCreate.pending, (state, { payload }) => {
                state.loading = true

            })
            .addCase(departmentCreate.fulfilled, (state, { payload }) => {
                state.loading = false
                // state.department = payload.department
                // state.departmentId = payload.department._id
                if (payload.department._id) {
                    cookie.set("id", payload.department._id, { path: "/" })
                }
            })
            .addCase(departmentCreate.rejected, (state, { payload }) => {
                state.loading = false
            })

            /*get department list*/
            .addCase(getDepartmentList.pending, (state, { payload }) => {
                state.loading = true

            })
            .addCase(getDepartmentList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.departmentList = payload.data;


            })
            .addCase(getDepartmentList.rejected, (state, { payload }) => {
                state.loading = false
            })



            /* department delete */
            .addCase(departmentDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(departmentDelete.fulfilled, (state, { payload }) => {
                state.loading = false;

                state.departmentList = state.departmentList.filter(
                    (dept) => dept._id !== payload.id
                );
            })
            .addCase(departmentDelete.rejected, (state) => {
                state.loading = false;
            })


            /*doctor create*/

            .addCase(doctorCreate.pending, (state, { payload }) => {
                state.loading = true

            })
            .addCase(doctorCreate.fulfilled, (state, { payload }) => {
                state.loading = false;

            })
            .addCase(doctorCreate.rejected, (state, { payload }) => { })


            /*doctor list*/
            .addCase(doctorList.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(doctorList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.doctorList = payload.data;
                state.doctorTotal = payload.totalItems;

            })
            .addCase(doctorList.rejected, (state, { payload }) => {
                state.loading = false
            })

            /*get all doctors */
            .addCase(getAllDoctors.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllDoctors.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allDoctors = payload.data;
                state.totalItems = payload.totalItems;
            })
            .addCase(getAllDoctors.rejected, (state) => {
                state.loading = false
            })

            /*doctor edit*/
            .addCase(doctorEdit.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(doctorEdit.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;

                const updatedDoctor = payload.data;

                const index = state.doctorList.findIndex(
                    (doc) => doc._id === updatedDoctor._id
                );

                if (index !== -1) {
                    state.doctorList[index] = {
                        ...state.doctorList[index],
                        ...updatedDoctor,
                    };
                }
            })
            .addCase(doctorEdit.rejected, (state, { payload }) => {
                state.loading = false
            })

            /*doctor delete*/
            .addCase(doctorDelete.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(doctorDelete.fulfilled, (state, { payload }) => {
                state.loading = false
                state.doctorList = state.doctorList.filter(
                    (doc) => doc._id !== payload.id
                )
            })
            .addCase(doctorDelete.rejected, (state, { payload }) => {
                state.loading = false
            })



            /* departmentwise doctor*/

            .addCase(departmentwiseDoctor.pending, (state) => {
                state.loading = true;
            })

            .addCase(departmentwiseDoctor.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.doctorList = payload.data;
                // Keep pagination correct for filtered department results
                state.doctorTotal = payload.totalItems ?? payload.data?.length ?? 0;
            })

            .addCase(departmentwiseDoctor.rejected, (state) => {
                state.loading = false;
            })



            /* appointment list */

            .addCase(appointmentList.pending, (state) => {
                state.loading = true;
            })

            .addCase(appointmentList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.appointmentList = payload.data;
                state.appointmentTotal = payload.totalItems;
            })

            .addCase(appointmentList.rejected, (state) => {
                state.loading = false;
            })

            /* confirm appointment */

            .addCase(confirmAppointment.fulfilled, (state, { payload }) => {

                const index = state.appointmentList.findIndex(
                    (a) => a._id === payload.id
                );

                if (index !== -1) {
                    state.appointmentList[index].status = "Confirmed";
                }

            })


            /* cancel appointment */

            .addCase(cancelAppointment.fulfilled, (state, { payload }) => {

                const index = state.appointmentList.findIndex(
                    (a) => a._id === payload.id
                );

                if (index !== -1) {
                    state.appointmentList[index].status = "Cancelled";
                }

            })
            /* accept appointment*/

            .addCase(acceptedAppointment.pending, (state) => {
                state.loading = true;
            })

            .addCase(acceptedAppointment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.acceptedAppointments = payload.data;
            })

            .addCase(acceptedAppointment.rejected, (state) => {
                state.loading = false;
            })

    }
}


)
export default doctorSlice;