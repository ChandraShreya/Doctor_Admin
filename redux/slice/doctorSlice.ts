
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
    IDepartmentCreatePayload,
    { rejectValue: string }
>(
    "departmentCreate",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.department, payload)
            console.log("department create", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Department not found.");
                else if (status === 400) return rejectWithValue("Invalid data provided.");
                else return rejectWithValue(error.response.data?.message || "Request failed.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }

)

export const getDepartmentList = createAsyncThunk<
    any,
    void,
    { rejectValue: string }
>(
    "getDepartmentList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.departmentList)
            console.log("department list", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Departments not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to load departments.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const departmentDelete = createAsyncThunk<{ id: string }, string,
    { rejectValue: string }

>(
    "departmentDelete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.departmentDelete,
                { id }
            )
            console.log(response)
            return { id }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Department not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to delete department.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)


export const doctorCreate = createAsyncThunk<
    any,
    IDoctorCreatePayload,
    { rejectValue: string }
>(
    "doctorCreate",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.doctorCreate, payload)
            console.log("doctor create", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 400) return rejectWithValue("Invalid doctor data.");
                else return rejectWithValue(error.response.data?.message || "Failed to create doctor.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const doctorList = createAsyncThunk<
    IPaginatedDoctorResponse,
    IDoctorListPayload,
    { rejectValue: string }
>(
    "doctorList",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.doctorList,
                { params: payload }
            )
            console.log("doctor list", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Doctors not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to load doctors.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const getAllDoctors = createAsyncThunk<IAllDoctorsResponse, void, { rejectValue: string }>(
    "getAllDoctors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.doctorList)
            console.log("all doctors", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Doctors not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to load all doctors.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const doctorEdit = createAsyncThunk<
    any,
    IDoctorEditPayload,
    { rejectValue: string }
>(
    "doctorEdit",
    async ({ id, data }, { rejectWithValue }) => {
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
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Doctor not found.");
                else if (status === 400) return rejectWithValue("Invalid update data.");
                else return rejectWithValue(error.response.data?.message || "Failed to update doctor.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const doctorDelete = createAsyncThunk<
    { id: string },
    string,
    { rejectValue: string }
>(
    "doctorDelete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.doctor.doctorDelete,
                { id }
            )
            console.log(response)
            return { id }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Doctor not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to delete doctor.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const departmentwiseDoctor = createAsyncThunk<
    {
        data: IDoctor[];
        totalItems: number
    },
    string,
    { rejectValue: string }
>(
    "departmentwiseDoctor",
    async (departmentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/admin/departments/${departmentId}/doctors`
            );
            console.log("filter", response)

            return response.data;
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Department or doctors not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to load doctors by department.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
);


export const appointmentList = createAsyncThunk<
    IAppointmentResponse,
    void,
    { rejectValue: string }
>(
    "appointmentList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.appointmentList)
            console.log("appointment list", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Appointments not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to load appointments.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
)

export const confirmAppointment = createAsyncThunk<
    { id: string; data: any },
    string,
    { rejectValue: string }
>(



    "confirmAppointment",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/admin/doctor/appointment/${id}`
            );

            console.log("confirm appointment", response);

            return { id, data: response.data };
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Appointment not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to confirm appointment.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
);

export const cancelAppointment = createAsyncThunk<{ id: string; data: any }, string, { rejectValue: string }>(
    "cancelAppointment",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/admin/doctor/appointment/cancelld/${id}`
            );

            console.log("cancel appointment", response);

            return { id, data: response.data };
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Appointment not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to cancel appointment.");
            } else {
                return rejectWithValue("Network error, check your connection.");
            }
        }
    }
);

export const acceptedAppointment = createAsyncThunk<any, void, { rejectValue: string }>(
    "acceptedAppointment",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.doctor.acceptedAppointment)
            console.log("accept appointment", response)
            return response.data
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 500) return rejectWithValue("Server error, please try again later.");
                else if (status === 404) return rejectWithValue("Accepted appointments not found.");
                else return rejectWithValue(error.response.data?.message || "Failed to load accepted appointments.");
            } else {
                return rejectWithValue("Network error, check your connection.");
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
                toast.error(action.payload || "Failed to create department")
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
                toast.error(action.payload || "Failed to load departments")
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
                toast.error(action.payload || "Failed to delete department")
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
                toast.error(action.payload || "Failed to create doctor")
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
                toast.error(action.payload || "Failed to load doctors")
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
                toast.error(action.payload || "Failed to load all doctors")
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
                toast.error(action.payload || "Failed to update doctor")
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
                toast.error(action.payload || "Failed to delete doctor")
            })



            /* departmentwise doctor*/

            .addCase(departmentwiseDoctor.pending, (state) => {
                state.loading = true;
            })

            .addCase(departmentwiseDoctor.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.doctorList = payload.data;
                // Keep pagination correct for filtered department results
                // state.doctorTotal = payload.totalItems ?? payload.data?.length ?? 0;
            })

            .addCase(departmentwiseDoctor.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload || "Failed to load doctors by department")
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
                toast.error(action.payload || "Failed to load appointments")
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
                toast.error(action.payload || "Failed to confirm appointment")
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
                toast.error(action.payload || "Failed to cancel appointment")
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
                toast.error(action.payload || "Failed to load accepted appointments")
            })

    }
}


)
export default doctorSlice;