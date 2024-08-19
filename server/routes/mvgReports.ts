import { Hono } from 'hono';
import { addReport, type ReportData } from '../controls/reportsMvgControls';

export const mvgReports = new Hono()
  .post('/create', async (c) => {
    try {
      const formData: any = await c.req.formData();
      // if (!Name || !OperationType || !AmmoType || !AmmoCount || !ResponsiblePerson || !RemainingAmmoCount) {
      //   return c.json({ message: 'All fields are required', formData }, 400);
      // }
      console.log(formData);
      const newReport = await addReport({
        Name: formData.Name,
        OperationType: formData.Name,
        AmmoType: formData.Name,
        AmmoCount: +formData.AmmoCount,
        ResponsiblePerson: formData.Name,
        RemainingAmmoCount: +formData.RemainingAmmoCount
      } as ReportData);
      if (newReport) {
        return c.json({ message: 'Hero created successfully', isCreated: true, report: newReport }, 201);
      } else {
        return c.json({ isCreated: false, report: formData }, 200);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })