import MvgReport from '../models/MvgReport';
import { sequelize } from '../config/database';

export interface ReportData {
  Name: string,
  OperationType: string,
  AmmoType: string,
  AmmoCount: number,
  ResponsiblePerson: string
}

export async function addReport(data: ReportData) {
  const transaction = await sequelize.transaction();
  try {
    const newHero = await MvgReport.create({
      ...data
    }, { transaction });

    await transaction.commit();
    return newHero;
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating hero:', error);
    return null;
  }
}