// controllers/requestController.js

const requestService = require("../services/requestService");

const createRequest = async (req, res) => {
  try {
    const newRequest = await requestService.createRequest(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestsByServiceProvider = async (req, res) => {
  try {
    console.log("Service Provider ID:", req.params.id); // Debugging line
    const requests = await requestService.getRequestsByServiceProvider(req.params.id);
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found for this service provider" });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRequestsByClientProvider = async (req, res) => {
  try {
    console.log("Service Provider ID:", req.params.id); // Debugging line
    const requests = await requestService.getRequestsByClientProvider(req.params.id);
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found for this client" });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const acceptRequest = async (req, res) => {
  try {
    const acceptedRequest = await requestService.acceptRequest(req.params.id);
    if (!acceptedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(acceptedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const rejectedRequest = await requestService.rejectRequest(req.params.id);
    if (!rejectedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(rejectedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateRequest = async (req, res) => {
  try {
    const updatedRequest = await requestService.updateRequest(req.params.id, req.body);
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const deletedRequest = await requestService.deleteRequest(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  getRequestsByServiceProvider, 
  getRequestsByClientProvider,// New controller method
  updateRequest,
  deleteRequest,
  acceptRequest, // <-- added
  rejectRequest 
};