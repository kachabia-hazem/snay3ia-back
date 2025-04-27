// routes/requestRoutes.js

const express = require("express");
const router = express.Router();
const requestController = require("../controller/requestController");

// Create a request
router.post("/", requestController.createRequest);

// Get all requests
router.get("/", requestController.getAllRequests);

// Get request by ID
router.get("/:id", requestController.getRequestById);

router.get("/bySericeId/:id", requestController.getRequestsByServiceProvider);
router.get("/byclientId/:id", requestController.getRequestsByClientProvider);
// Update request
router.put("/:id", requestController.updateRequest);
router.patch("/:id/accept", requestController.acceptRequest);

// Reject a request
router.patch("/:id/reject", requestController.rejectRequest);
// Delete request
router.delete("/:id", requestController.deleteRequest);

module.exports = router;
