
import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";
import { IAllDoctorsResponse, IAppointmentResponse, IDepartmentCreatePayload, IDoctor, IDoctorCreatePayload, IDoctorEditPayload, IDoctorListPayload, IDoctorState, IPaginatedDoctorResponse } from "@/typescript/doctor.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { toast } from "sonner";



const initialState: IDoctorState = {
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
export const departmentCreate = createAsyncThunk<
  any, 
  IDepartmentCreatePayload 
>(
    "departmentCreate",
    async (payload) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.department, payload)
            console.log("department create",response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Department not found.");
                else if (status === 400) throw new Error("Invalid data provided.");
                else throw new Error(error.response.data?.message || "Request failed.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }

)

export const getDepartmentList = createAsyncThunk(
    "getDepartmentList",
    async () => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.departmentList)
            console.log("department list",response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Departments not found.");
                else throw new Error(error.response.data?.message || "Failed to load departments.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const departmentDelete = createAsyncThunk<{ id: string }, string>(
    "departmentDelete",
    async (id) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.departmentDelete,
                { id }
            )
            console.log(response)
            return { id }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Department not found.");
                else throw new Error(error.response.data?.message || "Failed to delete department.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)
export const doctorCreate = createAsyncThunk<any, IDoctorCreatePayload>(
    "doctorCreate",
    async (payload) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.doctorCreate, payload)
            console.log("doctor create", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 400) throw new Error("Invalid doctor data.");
                else throw new Error(error.response.data?.message || "Failed to create doctor.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const doctorList = createAsyncThunk<IPaginatedDoctorResponse, IDoctorListPayload>(
    "doctorList",
    async (payload) => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.doctorList,
                { params: payload }
            )
            console.log("doctor list", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Doctors not found.");
                else throw new Error(error.response.data?.message || "Failed to load doctors.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const getAllDoctors = createAsyncThunk<IAllDoctorsResponse>(
    "getAllDoctors",
    async () => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.doctorList)
            console.log("all doctors", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Doctors not found.");
                else throw new Error(error.response.data?.message || "Failed to load all doctors.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const doctorEdit = createAsyncThunk<any, IDoctorEditPayload>(
    "doctorEdit",
    async ({ id, data }) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.doctorEdit, {
                id,
                ...data
            }

            )
            console.log(response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Doctor not found.");
                else if (status === 400) throw new Error("Invalid update data.");
                else throw new Error(error.response.data?.message || "Failed to update doctor.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const doctorDelete = createAsyncThunk<{ id: string }, string>(
    "doctorDelete",
    async (id) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.doctorDelete,
                { id }
            )
            console.log(response)
            return { id }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Doctor not found.");
                else throw new Error(error.response.data?.message || "Failed to delete doctor.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const departmentwiseDoctor = createAsyncThunk<
  { data: IDoctor[]; totalItems: number }, 
  string                                   
>(
    "departmentwiseDoctor",
    async (departmentId) => {
        try {
            const response = await axiosInstance.get(
                `/admin/departments/${departmentId}/doctors`
            );
            console.log("filter", response)

            return response.data;
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Department or doctors not found.");
                else throw new Error(error.response.data?.message || "Failed to load doctors by department.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
);


export const appointmentList = createAsyncThunk<IAppointmentResponse>(
    "appointmentList",
    async () => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.appointmentList)
            console.log("appointment", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Appointments not found.");
                else throw new Error(error.response.data?.message || "Failed to load appointments.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
)

export const confirmAppointment = createAsyncThunk<{ id: string; data: any }, string>(


    
    "confirmAppointment",
    async (id) => {
        try {
            const response = await axiosInstance.put(
                `/admin/doctor/appointment/${id}`
            );

            console.log("confirm appointment", response);

            return { id, data: response.data };
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Appointment not found.");
                else throw new Error(error.response.data?.message || "Failed to confirm appointment.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
);

export const cancelAppointment = createAsyncThunk<{ id: string; data: any }, string>(
    "cancelAppointment",
    async (id) => {
        try {
            const response = await axiosInstance.put(
                `/admin/doctor/appointment/cancelld/${id}`
            );

            console.log("cancel appointment", response);

            return { id, data: response.data };
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Appointment not found.");
                else throw new Error(error.response.data?.message || "Failed to cancel appointment.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
    }
);

export const acceptedAppointment = createAsyncThunk(
    "acceptedAppointment",
    async () => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.acceptedAppointment)
            console.log("accept appointment", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) throw new Error("Server error, please try again later.");
                else if (status === 404) throw new Error("Accepted appointments not found.");
                else throw new Error(error.response.data?.message || "Failed to load accepted appointments.");
            } else {
                throw new Error("Network error, check your connection.");
            }
        }
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
            .addCase(departmentCreate.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to create department")
            })

            /*get department list*/
            .addCase(getDepartmentList.pending, (state, { payload }) => {
                state.loading = true

            })
            .addCase(getDepartmentList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.departmentList = payload.data;


            })
            .addCase(getDepartmentList.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to load departments")
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
            .addCase(departmentDelete.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error?.message || "Failed to delete department")
            })


            /*doctor create*/

            .addCase(doctorCreate.pending, (state, { payload }) => {
                state.loading = true

            })
            .addCase(doctorCreate.fulfilled, (state, { payload }) => {
                state.loading = false;

            })
            .addCase(doctorCreate.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to create doctor")
            })


            /*doctor list*/
            .addCase(doctorList.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(doctorList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.doctorList = payload.data;
                state.doctorTotal = payload.totalItems;

            })
            .addCase(doctorList.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to load doctors")
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
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to load all doctors")
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
            .addCase(doctorEdit.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to update doctor")
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
            .addCase(doctorDelete.rejected, (state, action) => {
                state.loading = false
                toast.error(action.error?.message || "Failed to delete doctor")
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

            .addCase(departmentwiseDoctor.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error?.message || "Failed to load doctors by department")
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

            .addCase(appointmentList.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error?.message || "Failed to load appointments")
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

            .addCase(confirmAppointment.rejected, (state, action) => {
                toast.error(action.error?.message || "Failed to confirm appointment")
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

            .addCase(cancelAppointment.rejected, (state, action) => {
                toast.error(action.error?.message || "Failed to cancel appointment")
            })
            /* accept appointment*/

            .addCase(acceptedAppointment.pending, (state) => {
                state.loading = true;
            })

            .addCase(acceptedAppointment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.acceptedAppointments = payload.data;
            })

            .addCase(acceptedAppointment.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error?.message || "Failed to load accepted appointments")
            })

    }
}


)
export default doctorSlice;