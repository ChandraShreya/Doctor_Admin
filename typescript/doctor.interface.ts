export interface IAvailableSlot {
  date: string;
  time: string;
}

export interface IDoctor {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  specialization?: string;
  departmentId?: string;
  fees?: string;
  availableSlots?: IAvailableSlot[];
  schedule?: {
    startTime: string;
    endTime: string;
    slotDuration: number;
  };
  createdAt?: string;
  updatedAt?: string;
  count:any;
  department:any;

}

export interface IDepartment {
  _id: string;
  name: string;
  description?: string;
  themeIdx?: number;
  doctorCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IDepartmentWithDoctors extends IDepartment {
  doctors?: IDoctor[];
}

export interface IAppointment {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  date: string;
  time: string;
  doctorId: string;
  doctorName?: string;
  departmentId?: string;
  departmentName?: string;
  status: "pending" | "confirmed" | "cancelled" | "Confirmed" | "Cancelled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAppointmentStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

export interface IDoctorState {
  loading: boolean;
  success: boolean;
  doctorList: IDoctor[];
  allDoctors: IDoctor[];
  doctorTotal: number;
  departmentList: IDepartment[];
  departmentId: string | null;
  appointmentList: IAppointment[];
  appointmentTotal: number;
  acceptedAppointments: IAppointment[];
  cancelledAppointments: IAppointment[];
  totalItems: number;
  department?: IDepartment | null;
}
export interface IAllDoctorsResponse {
  data: IDoctor[];
  totalItems: number;
}

export interface IDepartmentForm {
  name: string;
  description: string;
  themeIdx: number;
}

export interface IDoctorForm {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  departmentId: string;
  fees: number;
}

export interface IAppointmentForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  doctorId: string;
  departmentId: string;
  notes?: string;
}

export interface IDepartmentCreatePayload {
  name: string;
  description: string;
}

export interface IDoctorCreatePayload {
  name: string;
  email?: string;          
  phone?: string;          
  departmentId: string;
  fees: string;
  schedule?: {
    startTime: string;
    endTime: string;
    slotDuration: number;
  };
}

export interface IDoctorEditPayload {
  id: string;
  data: Partial<IDoctorCreatePayload>;
}

export interface IDoctorListPayload {
  page: number;
  limit: number;
  search?: string;
}

export interface IPaginatedDoctorResponse {
  data: IDoctor[];
  totalItems: number;
  totalPages: number;
  currentPage?: number;
}

export interface IAppointmentResponse {
  // data?: IAppointment[];
  appointments?: IAppointment[];
  totalItems: number;
  totalPages: number;
}

export interface IPayload{
    name: any;
    fees: any;
    departmentId: any;
    schedule: {
        startTime: any;
        endTime: any;
        slotDuration: any;
    };
}