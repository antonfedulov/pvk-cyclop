import MvgReport from '../models/MvgReport';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

export interface ReportData {
  Name: string;
  TgrName: string;
  UnitCode: string;
  WeaponType: string;
  TargetNumber: string;
  TargetDestroyed: boolean;
  EngagementAt: Date | string;
  OperationType: string;
  MvgMovement: string;
  MvgLeader: string;
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
  UnitCode?: string[];
  WeaponType?: string[];
  OperationType?: string[];
}): Promise<ReportData[]> {
  try {
    const {
      Name,
      UnitCode,
      WeaponType,
      OperationType
    } = filters;
    const whereClause: any = {};

    if (Name && Name.length > 0 && Name.some(name => name.trim() !== "")) {
      whereClause.Name = { [Op.in]: Name.filter(name => name.trim() !== "") };
    }
    if (OperationType && OperationType.length > 0 && OperationType.some(type => type.trim() !== "")) {
      whereClause.OperationType = { [Op.in]: OperationType.filter(type => type.trim() !== "") };
    }
    if (
      UnitCode &&
      UnitCode.length > 0 &&
      UnitCode.some(item => item.trim() !== '')
    ) {
      whereClause.UnitCode = {
        [Op.in]: UnitCode.filter(item => item.trim() !== '')
      };
    }

    if (
      WeaponType &&
      WeaponType.length > 0 &&
      WeaponType.some(item => item.trim() !== '')
    ) {
      whereClause.WeaponType = {
        [Op.in]: WeaponType.filter(item => item.trim() !== '')
      };
    }
    const reports = await MvgReport.findAll({
      where: whereClause,
      order: [['EngagementAt', 'DESC']]
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