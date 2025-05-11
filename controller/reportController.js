const Report = require("../model/report");
const User = require("../model/user");

// Create a new report
const createReport = async (req, res) => {
  try {
    const { workerId, message } = req.body;
    const clientId = req.user._id; // Assuming the client ID is obtained from the authenticated user
    if (!workerId || !message) {
      return res
        .status(400)
        .json({ error: "Worker ID and message are required" });
    }

    const workerExists = await User.findById(workerId);
    if (!workerExists) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    if (workerExists.role !== "service_provider") {
      return res.status(400).json({
        success: false,
        message: "User is not a worker",
      });
    }

    const report = await Report.create({
      workerId,
      clientId,
      message,
      // status defaults to "pending" as per schema
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getClientReports = async (req, res) => {
  try {
    const clientId = req.user._id; // Use _id from the user object
    const data = await Report.find({ clientId }).populate(
      "workerId",
      "name email"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching client reclamations:", error); // Log the error for debugging
    res.status(500).json({ message: "Erreur de récupération." });
  }
};

const getWorkerReports = async (req, res) => {
  try {
    const workerId = req.user._id; // Use _id from the user object
    const data = await Report.find({ workerId }).populate(
      "clientId",
      "name email"
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching client reclamations:", error); // Log the error for debugging
    res.status(500).json({ message: "Erreur de récupération." });
  }
};

const cancelReport = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.user._id;

    const report = await Report.findOne({ _id: id, clientId });

    if (!report) {
      return res.status(404).json({ message: "Rapport introuvable." });
    }

    if (report.status === "cancelled" || report.status === "resolved") {
      return res
        .status(400)
        .json({ message: "Ce rapport ne peut pas être annulé." });
    }

    report.status = "cancelled";
    await report.save();

    res.json({ message: "Rapport annulé." });
  } catch (error) {
    console.error("Error cancelling report:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l’annulation.", error: error.message });
  }
};

const consultReport = async (req, res) => {
  try {
    const { id } = req.params;
    const workerId = req.user._id;

    const report = await Report.findOne({ _id: id, workerId });

    if (!report) {
      return res.status(404).json({ message: "Rapport introuvable." });
    }

    if (report.status === "consulted") {
      return res
        .status(400)
        .json({ message: "Ce rapport a déjà été consulté." });
    }
    if (report.status === "cancelled" || report.status === "resolved") {
      return res
        .status(400)
        .json({ message: "Ce rapport ne peut pas être consulté." });
    }

    report.status = "consulted";
    await report.save();

    res.json({ message: "Rapport consulté avec succès." });
  } catch (error) {
    console.error("Error consulting report:", error);
    res.status(500).json({
      message: "Erreur lors de la consultation.",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getClientReports,
  getWorkerReports,
  cancelReport,
  consultReport,
};
