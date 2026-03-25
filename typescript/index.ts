
// ============================================
// DOCTOR TYPES
// ============================================

export interface IDoctor {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  specialization?: string;
  departmentId?: string;
  fees?: number;
  availableSlots?: IAvailableSlot[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAvailableSlot {
  date: string;
  time: string;
}

// ============================================
// DEPARTMENT TYPES
// ============================================

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

// ============================================
// APPOINTMENT TYPES
// ============================================

export interface IAppointment {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  date: string;
  time: string;
  doctorId: string;
  departmentId?: string;
  status: "pending" | "confirmed" | "cancelled";
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

// ============================================
// USER / AUTH TYPES
// ============================================

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role?: "admin" | "doctor" | "patient";
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: IUser;
  token?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  totalItems?: number;
  totalPages?: number;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// ============================================
// REDUX STATE TYPES
// ============================================

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
}

export interface IAuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
  error: string | null;
}

// ============================================
// FORM TYPES
// ============================================

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

// ============================================
// FILTER & PAGINATION TYPES
// ============================================

export interface IFilterOptions {
  type: "all" | "pending" | "confirmed" | "cancelled" | "accepted";
  search?: string;
}

export interface IPaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

// ============================================
// MODAL TYPES
// ============================================

export interface IModalProps {
  show: boolean;
  onClose: () => void;
}

export interface IConfirmModalProps extends IModalProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

// ============================================
// TABLE/LIST ITEM TYPES
// ============================================

export interface ITableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

// ============================================
// ENUM TYPES
// ============================================

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

// ============================================
// REDUX THUNK TYPES
// ============================================

// Doctor Thunks
export interface IDepartmentCreatePayload {
  name: string;
  description: string;
  themeIdx: number;
}

export interface IDoctorCreatePayload {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  departmentId: string;
  fees: number;
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
  data?: IDoctor[];
  doctors?: IDoctor[];
  totalItems: number;
  totalPages: number;
  currentPage?: number;
}

export interface IAppointmentResponse {
  data?: IAppointment[];
  appointments?: IAppointment[];
  totalItems: number;
  totalPages: number;
}

// Auth Thunks
export interface IAuthSignInPayload {
  email: string;
  password: string;
}

export interface IAuthSignInResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: IUser;
}

// Location Thunks
export interface ILocationPayload {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
export type Callback<T = void> = (data: T) => void;
