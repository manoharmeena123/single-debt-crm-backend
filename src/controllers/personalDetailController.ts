import { Request, Response } from 'express';
import Lead from '@/models/personalDetailModel'; // Assuming you have a model directory for this
import { validateLead } from '@/validation/personalDetailValidator'; // Assuming you have a Joi validation file

// Create a new lead
export const createLead = async (req: Request, res: Response): Promise<void> => {
  // Validate input
  const { error } = validateLead(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return; // Explicitly return to avoid returning a response object implicitly
  }

  try {
    const { lead_id, pancard, aadharCard, dateOfBirth, ageOfClient, fatherName, motherName, wifeName, reasonForFinancialDifficulty, numberOfChildren } = req.body;
    
    const newLead = new Lead({
      lead_id,
      pancard,
      aadharCard,
      dateOfBirth,
      ageOfClient,
      fatherName,
      motherName,
      wifeName,
      reasonForFinancialDifficulty,
      numberOfChildren
    });

    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
    return; // Return to ensure the function returns `void`
  } catch (error) {
    res.status(500).json({ message: 'Failed to create lead', error });
    return; // Return to ensure the function returns `void`
  }
};

// Fetch all leads
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
    return; // Return to ensure the function returns `void`
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leads', error });
    return; // Return to ensure the function returns `void`
  }
};

// Fetch a single lead by ID
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return; // Return to ensure the function returns `void`
    }
    res.status(200).json(lead);
    return; // Return to ensure the function returns `void`
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lead', error });
    return; // Return to ensure the function returns `void`
  }
};

// Update a lead by ID
export const updateLead = async (req: Request, res: Response): Promise<void> => {
  // Validate input
  const { error } = validateLead(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return; // Return to ensure the function returns `void`
  }

  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLead) {
      res.status(404).json({ message: 'Lead not found' });
      return; // Return to ensure the function returns `void`
    }
    res.status(200).json({ message: 'Lead updated successfully', lead: updatedLead });
    return; // Return to ensure the function returns `void`
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lead', error });
    return; // Return to ensure the function returns `void`
  }
};

// Delete a lead by ID
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return; // Return to ensure the function returns `void`
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
    return; // Return to ensure the function returns `void`
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead', error });
    return; // Return to ensure the function returns `void`
  }
};
