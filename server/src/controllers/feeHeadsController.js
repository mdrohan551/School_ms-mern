import {
  createFeeHeadService,
  deleteFeeHeadService,
  fetchFeeHeadListService,
  updateFeeHeadService,
} from "../services/feeHeadsService.js";

// create FeeHead by admin
export const createFeeHead = async (req, res) => {
  const result = await createFeeHeadService(req);
  return res.status(result.statusCode).json(result);
};

// update FeeHead by admin
export const updateFeeHead = async (req, res) => {
  const result = await updateFeeHeadService(req);
  return res.status(result.statusCode).json(result);
};

// delete FeeHead by admin
export const deleteFeeHead = async (req, res) => {
  const result = await deleteFeeHeadService(req);
  return res.status(result.statusCode).json(result);
};

// fetch  FeeHeadList by admin
export const fetchFeeHeadList = async (req, res) => {
  const result = await fetchFeeHeadListService(req);
  return res.status(result.statusCode).json(result);
};
