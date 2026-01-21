import Swal from 'sweetalert2';

export async  function DeleteAlert() {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#cc1414",
        cancelButtonColor: "#414141",
        confirmButtonText: " delete it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function SuccessAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "OK",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function FailAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "warning",
        confirmButtonColor: "#fcac3f",
        confirmButtonText: "Try Again",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function InfoAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "info",
        confirmButtonColor: "#198754",
        confirmButtonText: "Go Ahead",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}
export async function ResetWarningAlert() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "All the form data will be cleared!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#cc1414",
    cancelButtonColor: "#414141",
    confirmButtonText: "Yes, reset it!",
    cancelButtonText: "Cancel",
    allowOutsideClick: false,
  });

  return result.isConfirmed;
}
