import {
  createFeeStructureService,
  deleteFeeStructureService,
  fetchFeeStructureService,
  updateFeeStructureService,
} from "../services/feeStructureService.js";

// create Fee Structure  by admin
export const createFeeStructure = async (req, res) => {
  const result = await createFeeStructureService(req);
  return res.status(result.statusCode).json(result);
};


// update Fee Structure  by admin
export const updateFeeStructure = async (req, res) => {
  const result = await updateFeeStructureService(req);
  return res.status(result.statusCode).json(result);
};

// delete Fee Structure  by admin
export const deleteFeeStructure = async (req, res) => {
  const result = await deleteFeeStructureService(req);
  return res.status(result.statusCode).json(result);
};

// fetch  Fee Structure by admin
export const fetchFeeStructureList = async (req, res) => {
  const result = await fetchFeeStructureService(req);
  return res.status(result.statusCode).json(result);
};
