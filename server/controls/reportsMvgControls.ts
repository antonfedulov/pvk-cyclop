import MvgReport from '../models/MvgReport';
import { sequelize } from '../config/database';

export interface ReportData {
  Name: string,
  OperationType: string,
  AmmoType: string,
  AmmoCount: number,
  ResponsiblePerson: string,
  RemainingAmmoCount: number
}

export async function addReport(data: ReportData) {
  const transaction = await sequelize.transaction();
  try {
    console.log(data)
    const newReport = await MvgReport.create({
      ...data
    }, { transaction });

    await transaction.commit();
    return newReport;
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating hero:', error);
    return null;
  }
}

export async function getReports(filters: {
  Name?: string[];
  OperationType?: string[];
  ResponsiblePerson?: string[];
}): Promise<ReportData[]> {
  try {
    const { Name, OperationType, ResponsiblePerson } = filters;
    const whereClause: any = {};

    if (Name?.length) {
      whereClause.Name = Name;
    }
    if (OperationType?.length) {
      whereClause.OperationType = OperationType;
    }
    if (ResponsiblePerson?.length) {
      whereClause.ResponsiblePerson = ResponsiblePerson;
    }

    const reports = await MvgReport.findAll({
      where: whereClause,
    });
    
    if (!reports) {
      return [] as ReportData[];
    }
    return !!reports && reports !== null ? reports : [] as ReportData[];
  } catch (error) {
    console.error('Error not found hero:', error);
    return [] as ReportData[];
  }
}