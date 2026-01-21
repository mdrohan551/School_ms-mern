import {
  updateFeesService,
  deleteFeesService,
  fetchFeesListService,
  createFeePaymentService,
} from "../services/feePaymentService.js";

// create Fees by admin
export const createFeesPayment = async (req, res) => {
  const result = await createFeePaymentService(req);
  return res.status(result.statusCode).json(result);
};

// update Fees by admin
export const updateFees = async (req, res) => {
  const result = await updateFeesService(req);
  return res.status(result.statusCode).json(result);
};

// delete Fees by admin
export const deleteFees = async (req, res) => {
  const result = await deleteFeesService(req);
  return res.status(result.statusCode).json(result);
};

// fetch  FeesList by admin
export const fetchFeesList = async (req, res) => {
  const result = await fetchFeesListService(req);
  return res.status(result.statusCode).json(result);
};
