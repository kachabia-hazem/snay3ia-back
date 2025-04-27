// services/requestService.js

const Request = require("../model/request");

const createRequest = async (requestData) => {
  const request = new Request(requestData);
  return await request.save();
};

const getAllRequests = async () => {
  return await Request.find()
    .populate('client', 'firstName lastName email phone')
    .populate('serviceProvider', 'firstName lastName email phone');
};

const getRequestById = async (id) => {
  return await Request.findById(id)
    .populate('client', 'firstName lastName email phone')
    .populate('serviceProvider', 'firstName lastName email phone');
};

const getRequestsByServiceProvider = async (serviceProviderId) => {
  return await Request.find({ serviceProvider: serviceProviderId })
    .populate('client', 'firstName lastName email phone')
    .populate('serviceProvider', 'firstName lastName email phone');
};
const getRequestsByClientProvider = async (cleintProviderId) => {
  return await Request.find({ client: cleintProviderId })
    .populate('client', 'firstName lastName email phone')
    .populate('serviceProvider', 'firstName lastName email phone');
};
const acceptRequest = async (id) => {
  return await Request.findByIdAndUpdate(
    id,
    { status: 'accepted' },
    { new: true }
  )
  .populate('client', 'firstName lastName email phone')
  .populate('serviceProvider', 'firstName lastName email phone');
};

const rejectRequest = async (id) => {
  return await Request.findByIdAndUpdate(
    id,
    { status: 'rejected' },
    { new: true }
  )
  .populate('client', 'firstName lastName email phone')
  .populate('serviceProvider', 'firstName lastName email phone');
};
const updateRequest = async (id, updatedData) => {
  return await Request.findByIdAndUpdate(id, updatedData, { new: true })
    .populate('client', 'firstName lastName email phone')
    .populate('serviceProvider', 'firstName lastName email phone');
};

const deleteRequest = async (id) => {
  return await Request.findByIdAndDelete(id);
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  getRequestsByServiceProvider,
  getRequestsByClientProvider, // New method
  updateRequest,
  deleteRequest,
  acceptRequest, // <-- added
  rejectRequest
};