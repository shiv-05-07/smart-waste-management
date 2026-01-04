/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: municipalworkers
 * Interface for MunicipalWorkers
 */
export interface MunicipalWorkers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  workerName?: string;
  /** @wixFieldType text */
  employeeId?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType text */
  contactPhone?: string;
  /** @wixFieldType text */
  department?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: wastecomplaints
 * Interface for WasteComplaints
 */
export interface WasteComplaints {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  complaintImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType datetime */
  submissionDateTime?: Date | string;
  /** @wixFieldType text */
  assignedWorkerName?: string;
}
