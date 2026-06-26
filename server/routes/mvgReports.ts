import { Hono } from 'hono';
import { addReport, getReports, type ReportData } from '../controls/reportsMvgControls';
import { parseFormData } from '.';

export const mvgReports = new Hono()
  .get('/list', async (c) => {
    try {

      const Name = c.req.query('Name')?.split(',') || [];
      const UnitCode = c.req.query('UnitCode')?.split(',') || [];
      const WeaponType = c.req.query('WeaponType')?.split(',') || [];
      const OperationType = c.req.query('OperationType')?.split(',') || [];

      const reports = await getReports({
        Name,
        UnitCode,
        WeaponType,
        OperationType
      });

      return c.json(reports);

    } catch (error) {
      console.error('Error fetching reports:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })
  .post('/create', async (c) => {
    try {
      const { fields } = await parseFormData(c.req);
      const {
        Name,
        TgrName,
        UnitCode,
        WeaponType,
        TargetNumber,
        MvgMovement,
        MvgLeader,
        EngagementAt
      } = fields;
      
      if (!Name || !TgrName || !UnitCode || !WeaponType || !TargetNumber || !MvgLeader) {
        return c.json({ message: 'All fields are required', report: {...fields} }, 400);
      }
      const newReport = await addReport({
        ...fields,
        EngagementAt: new Date(EngagementAt)
      } as ReportData);

      if (newReport) {
        return c.json({ message: 'Report created successfully', isCreated: true, report: newReport }, 201);
      } else {
        return c.json({ isCreated: false, report: fields }, 200);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })