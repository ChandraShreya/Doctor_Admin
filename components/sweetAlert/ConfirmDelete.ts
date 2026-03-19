import Swal from "sweetalert2";

/* ================= CONFIRM ================= */

export const confirmDelete = async (entity = "Item", name = "") => {

  const result = await Swal.fire({
    html: `
      <div style="text-align:center;padding-top:6px">

        <div style="
          width:54px;
          height:54px;
          margin:0 auto 14px auto;
          border-radius:14px;
          background:#fee2e2;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          color:#dc2626;
          font-weight:600;
        ">
          !
        </div>

        <h3 style="
          font-size:16px;
          font-weight:600;
          color:#1e293b;
          margin-bottom:6px;
        ">
          Delete ${entity}
        </h3>

        <p style="
          font-size:13px;
          color:#64748b;
        ">
          <strong>${name}</strong> will be permanently removed.
        </p>

      </div>
    `,

    width: 320,
    padding: "20px",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    buttonsStyling: false,

    customClass: {
      popup: "rounded-2xl shadow-xl",
      actions: "mt-4 flex justify-center gap-2",
      confirmButton:
        "px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600",
      cancelButton:
        "px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
    }

  });

  return result.isConfirmed;
};


/* ================= SUCCESS ALERT ================= */

export const showDeleteSuccess = (entity = "Item", name = "") => {
  Swal.fire({
    icon: "success",
    title: "Deleted",
    text: `${name} ${entity} deleted successfully`,
    timer: 1500,
    showConfirmButton: false,
  });
};


/* ================= ERROR ALERT ================= */

export const showDeleteError = (entity = "Item", name = "") => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: `Failed to delete ${name}`,
  });
};