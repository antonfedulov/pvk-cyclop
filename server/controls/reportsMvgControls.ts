import MvgReport from '../models/MvgReport';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

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
  AmmoType?: string[];
}): Promise<ReportData[]> {
  try {
    const { Name, OperationType, AmmoType } = filters;
    const whereClause: any = {};

    if (Name && Name.length > 0 && Name.some(name => name.trim() !== "")) {
      whereClause.Name = { [Op.in]: Name.filter(name => name.trim() !== "") };
    }
    if (OperationType && OperationType.length > 0 && OperationType.some(type => type.trim() !== "")) {
      whereClause.OperationType = { [Op.in]: OperationType.filter(type => type.trim() !== "") };
    }
    if (AmmoType && AmmoType.length > 0 && AmmoType.some(item => item.trim() !== "")) {
      whereClause.AmmoType = { [Op.in]: AmmoType.filter(item => item.trim() !== "") };
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