import Swal from "sweetalert2";

export const confirmLogout = async () => {

  const result = await Swal.fire({
    html: `
      <div style="text-align:center;padding-top:6px">

        <div style="
          width:54px;
          height:54px;
          margin:0 auto 14px auto;
          border-radius:14px;
          background:#dbeafe;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          color:#2563eb;
          font-weight:600;
        ">
          ⎋
        </div>

        <h3 style="
          font-size:16px;
          font-weight:600;
          color:#1e293b;
          margin-bottom:6px;
        ">
          Logout
        </h3>

        <p style="
          font-size:13px;
          color:#64748b;
        ">
          Are you sure you want to logout?
        </p>

      </div>
    `,

    width: 320,
    padding: "20px",
    showCancelButton: true,
    confirmButtonText: "Logout",
    cancelButtonText: "Cancel",
    buttonsStyling: false,

    customClass: {
      popup: "rounded-2xl shadow-xl",
      actions: "mt-4 flex justify-center gap-2",
      confirmButton:
        "px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700",
      cancelButton:
        "px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
    }

  });

  return result.isConfirmed;
};


export const showLogoutSuccess = () => {
  Swal.fire({
    html: `
      <div style="text-align:center;padding-top:6px">

        <div style="
          width:54px;
          height:54px;
          margin:0 auto 14px auto;
          border-radius:14px;
          background:#eef2ff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          color:#5e72e4;
          font-weight:600;
        ">
          ✓
        </div>

        <h3 style="
          font-size:16px;
          font-weight:600;
          color:#1e293b;
          margin-bottom:6px;
        ">
          Logged Out
        </h3>

        <p style="
          font-size:13px;
          color:#64748b;
        ">
          You have been successfully logged out
        </p>

      </div>
    `,
    width: 320,
    padding: "20px",
    showConfirmButton: false,
    timer: 1400,
    background: "#ffffff",
    customClass: {
      popup: "rounded-2xl shadow-xl",
    }
  });
};