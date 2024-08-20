import { Hono } from 'hono';
import { addReport, getReports, type ReportData } from '../controls/reportsMvgControls';
import { parseFormData } from '.';

export const mvgReports = new Hono()
  .get('/list', async (c) => {
    try {
      const Name = c.req.query('Name')?.split(',') || [];
      const OperationType = c.req.query('OperationType')?.split(',') || [];
      const ResponsiblePerson = c.req.query('ResponsiblePerson')?.split(',') || [];

      const reports: ReportData[] = await getReports({ Name, OperationType, ResponsiblePerson });
      return c.json(reports);

    } catch (error) {
      console.error('Error fetching reports:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })
  .post('/create', async (c) => {
    try {
      const { fields } = await parseFormData(c.req);
      const { Name, OperationType, AmmoType, AmmoCount, ResponsiblePerson, RemainingAmmoCount } = fields;
      if (!Name || !OperationType || !AmmoType || !AmmoCount || !ResponsiblePerson || !RemainingAmmoCount) {
        return c.json({ message: 'All fields are required', report: {...fields} }, 400);
      }
      const newReport = await addReport({
        Name,
        OperationType,
        AmmoType,
        AmmoCount: +AmmoCount,
        ResponsiblePerson,
        RemainingAmmoCount: +RemainingAmmoCount
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