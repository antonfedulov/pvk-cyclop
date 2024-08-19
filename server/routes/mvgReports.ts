import { Hono } from 'hono';
import { addReport, type ReportData } from '../controls/reportsMvgControls';

export const mvgReports = new Hono()
  .post('/create', async (c) => {
    try {
      const formData: any = await c.req.formData();
      const { Name, OperationType, AmmoType, AmmoCount, ResponsiblePerson } = formData;

      if (!Name || !OperationType || !AmmoType || !AmmoCount || !ResponsiblePerson) {
        return c.json({ message: 'All fields are required' }, 400);
      }

      const newReport = await addReport({
        Name,
        OperationType,
        AmmoType,
        AmmoCount,
        ResponsiblePerson
      } as ReportData);
      if (newReport) {
        return c.json({ message: 'Hero created successfully', isCreated: true, hero: newReport }, 201);
      } else {
        return c.json({ isCreated: false }, 200);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })